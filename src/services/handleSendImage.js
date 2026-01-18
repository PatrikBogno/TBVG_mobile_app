import {Alert } from "react-native";
import { sendImageToESP } from "./wsClientConnection";

import { launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import { PNG } from "pngjs/browser";
import { Buffer } from "buffer";

global.Buffer = global.Buffer || Buffer;

const WIDTH = 700;
const HEIGHT = 350;

export const handleSendImage = async (tempValue, imageSource, itemId) => {
    try {

      // zmena rozlisenia na pozadovanu velkost
      const resized = await ImageResizer.createResizedImage(
        imageSource,
        WIDTH,
        HEIGHT,
        "PNG",
        100,
        0,
        null,
        false,
        { mode: "stretch", onlyScaleDown: false }
      );

      // nacitanie png do rgba
      const pngBase64 = await RNFS.readFile(resized.uri, "base64");
      const png = PNG.sync.read(Buffer.from(pngBase64, "base64"));
      const { data } = png;

      // konverzia na rgb565
      const pixelData = Buffer.alloc(WIDTH * HEIGHT * 2);
      let o = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const rgb565 = ((r & 0xF8) << 8) | ((g & 0xFC) << 3) | (b >> 3);

        //LSB a MSB
        pixelData[o++] = rgb565 & 0xFF;
        pixelData[o++] = (rgb565 >> 8) & 0xFF;
      }

      //vytvorenie lvgl hlavicky
      const cf = 4;
      const headerVal = (cf & 0x1F) | ((WIDTH & 0xFFF) << 8) | ((HEIGHT & 0xFFF) << 20);
      const header = Buffer.alloc(4);
      header.writeUInt32LE(headerVal, 0);

      //pripojenie hlavicky k datam
      const bin = Buffer.concat([header, pixelData]);

      // odoslanie na esp
      await sendImageToESP(new Uint8Array(bin), `${itemId}.bin`);

      Alert.alert("OK", "LVGL image úspešne odoslaný");

      console.log("Úspešne odoslané:", {
        width: WIDTH,
        height: HEIGHT,
        header: header.toString("hex").toUpperCase(),
        size: bin.length
      });

    } catch (err) {
      console.error(err);
      Alert.alert("Chyba", err.message);
    }
  };