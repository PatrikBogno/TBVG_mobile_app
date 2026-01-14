import React from "react";
import { View, ScrollView, Alert } from "react-native";
import Components from "../components/components.js";
import StyleKeys from "../styles/styleKeys.js";
import { sendImageToESP } from "../services/wsClientConnection.js";
import { TranslationKeys } from "../translations/translationKeys.ts";

import { launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import { PNG } from "pngjs/browser";
import { Buffer } from "buffer";

global.Buffer = global.Buffer || Buffer;

// Konštanty
const WIDTH = 700;
const HEIGHT = 350;

function Day() {

  const handleSendImage = async () => {
    try {
      // Vyber obrázok z galérie
      const result = await launchImageLibrary({ mediaType: "photo" });
      if (result.didCancel || !result.assets?.length) return;

      const image = result.assets[0];

      // Zmenši obrázok na požadovanú veľkosť
      const resized = await ImageResizer.createResizedImage(
        image.uri,
        WIDTH,
        HEIGHT,
        "PNG",
        100,
        0,
        null,
        false,
        { mode: "stretch", onlyScaleDown: false }
      );

      // Načítaj PNG do RGBA
      const pngBase64 = await RNFS.readFile(resized.uri, "base64");
      const png = PNG.sync.read(Buffer.from(pngBase64, "base64"));
      const { data } = png;

      // Konvertuj na RGB565 (16-bit, little-endian)
      const pixelData = Buffer.alloc(WIDTH * HEIGHT * 2);
      let o = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];       // 0-255
        const g = data[i + 1];
        const b = data[i + 2];

        // Presný bitový zápis ako v Python skripte
        const rgb565 = ((r & 0xF8) << 8) | ((g & 0xFC) << 3) | (b >> 3);

        pixelData[o++] = rgb565 & 0xFF;        // LSB
        pixelData[o++] = (rgb565 >> 8) & 0xFF; // MSB
      }

      // LVGL v8 Header (dynamicky podľa šírky a výšky)
      const cf = 4; // CF_TRUE_COLOR
      const headerVal = (cf & 0x1F) | ((WIDTH & 0xFFF) << 8) | ((HEIGHT & 0xFFF) << 20);
      const header = Buffer.alloc(4);
      header.writeUInt32LE(headerVal, 0);

      // Spoj hlavičku s pixelmi
      const bin = Buffer.concat([header, pixelData]);

      // Odoslanie priamo na ESP32
      //TODO zmenit nazov na odoslanie
      await sendImageToESP(new Uint8Array(bin), "image_700x350.bin");

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

  const style = StyleKeys.styleDayPage;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={style.containerScroll}>
      <View style={style.container}>
        <Components.ComponentContainer>
          <Components.Button
            tKey={TranslationKeys.TEST_SEND_IMAGE}
            onPress={handleSendImage}
          />
        </Components.ComponentContainer>
      </View>
    </ScrollView>
  );
}

export default Day;
