import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import StorageService from "../helpers/storage_service.js";
import AppText from "./custom_text.jsx";
import { DropdownHelpers } from "../helpers/dropdown_helper.js";
import SelectLanguage from "./language_select.tsx";
import DropdownDesign from "./design_select.tsx";
import DropdownSound from "./sound_select.tsx";

function SettingDropdown({
  tKey,
  storageKey,
  field,
  data = [],
  helperKey,           
}) {
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded] = useState(false);
  var DropdownComponent = null;

  if (helperKey == "language") {
    DropdownComponent = SelectLanguage;
  }
  else if (helperKey == "design"){
    DropdownComponent = DropdownDesign;
  }
  else if (helperKey == "sound"){
    DropdownComponent = DropdownSound;
  }
  else {
    return null;
  }

  useEffect(() => {
    const loadSetting = async () => {
      const stored = await StorageService.getItem(storageKey);

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
  }, [storageKey, data, field]);

  const handleChange = async (item) => {
    const value = item.value;
    setSelected(value);

    if (field) {
      await StorageService.updateItem(storageKey, { [field]: value });
    } else {
      await StorageService.setItem(storageKey, value);
    }

    if (helperKey && DropdownHelpers[helperKey]) {
      await DropdownHelpers[helperKey](item);
    }
  };

  if (!loaded) return null;

  return (
    <View style={styles.container}>
      {tKey && <AppText tKey={tKey} custom_style={styles.label} />}
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
    marginTop: '4%',
    marginLeft: '5%',
    fontSize: 16 
  },
});
