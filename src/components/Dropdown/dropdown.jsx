import React, { useState, useEffect } from "react";
import { View } from "react-native";
import LowLevelComponents from "../lowLevelComponents.js";

import StyleKeys from "../../styles/styleKeys.js";
import ServiceKeys from "../../services/serviceKeys.js";
import i18next from "../../translations/i18n.js";

import Language from "./language.tsx";
import Design from "./design.tsx";
import Sound from "./sound.tsx";

const DropdownHelper = {
  language: async (item) => {
    console.log("Language changed to: " + item.label);
    await i18next.changeLanguage(item.value);
  },

  design: async (item) => {
    console.log("Style changed to:", item.label);
    // TODO: apply theme, call context, etc.
  },

  sound: async (item) => {
    console.log("Sound mode:", item.label);
    // TODO: change sound settings, play preview, etc.
  },
};


/**
 * @typedef {"language" | "design" | "sound"} HelperKey
 */

/**
 * @param {{
 *   tKey?: string,
 *   sKey?: string,
 *   field?: string,
 *   data?: Array<{ label: string, value: string }>,
 *   helperKey: HelperKey
 * }} props
 */
function SettingDropdown({
  tKey,
  sKey,
  field,
  data = [],
  helperKey,
}) {
  let style = StyleKeys.styleDropdown;
  let storage = ServiceKeys.serviceStorage;

  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);

  let DropdownComponent = null;

  if (helperKey === "language") DropdownComponent = Language;
  else if (helperKey === "design") DropdownComponent = Design;
  else if (helperKey === "sound") DropdownComponent = Sound;
  else return null;

  useEffect(() => {
    const loadSetting = async () => {
      const stored = await storage.getItem(sKey);

      let storedValue = null;

      if (stored && typeof stored === "object" && field) {
        storedValue = stored[field];
      } else {
        storedValue = stored;
      }

      if (storedValue !== null) setSelected(storedValue);
      else if (data.length > 0) setSelected(data[0].value);

      setLoaded(true);
    };

    loadSetting();
  }, [sKey, data, field]);

  const handleChange = async (item) => {
    const value = item.value;
    setSelected(value);

    if (field) {
      await storage.updateItem(sKey, { [field]: value });
    } else {
      await storage.setItem(sKey, value);
    }

    if (DropdownHelper[helperKey]) {
      await DropdownHelper[helperKey](item);
    }
  };

  if (!loaded) return null;

  return (
    <View style={style.container}>
      {tKey && 
      <LowLevelComponents.Text 
        tKey={tKey} 
        cStyle={style.label}/>
      }
      <DropdownComponent
        value={selected}
        data={data}
        onChange={handleChange}/>
    </View>
  );
}

export default SettingDropdown;