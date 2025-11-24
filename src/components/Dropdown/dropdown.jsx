import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import StorageService from "../../helpers/storage_service.js";
import LowLevelComponents from "../lowLevelComponents.js";
import { DropdownHelpers } from "../../helpers/dropdown_helper.js";
import Language from "./language.tsx";
import Design from "./design.tsx";
import Sound from "./sound.tsx";

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
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);

  let DropdownComponent = null;

  if (helperKey === "language") DropdownComponent = Language;
  else if (helperKey === "design") DropdownComponent = Design;
  else if (helperKey === "sound") DropdownComponent = Sound;
  else return null;

  useEffect(() => {
    const loadSetting = async () => {
      const stored = await StorageService.getItem(sKey);

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
      await StorageService.updateItem(sKey, { [field]: value });
    } else {
      await StorageService.setItem(sKey, value);
    }

    if (DropdownHelpers[helperKey]) {
      await DropdownHelpers[helperKey](item);
    }
  };

  if (!loaded) return null;

  return (
    <View style={styles.container}>
      {tKey && <LowLevelComponents.Text tKey={tKey} custom_style={styles.label} />}
      <DropdownComponent
        value={selected}
        data={data}
        onChange={handleChange}
      />
    </View>
  );
}

export default SettingDropdown;

const styles = StyleSheet.create({
  label: {
    marginTop: "4%",
    marginLeft: "5%",
    fontSize: 16,
  },
});
