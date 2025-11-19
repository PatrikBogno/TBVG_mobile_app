import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import SelectLanguage from './language_select.tsx';
import { i18n } from '../translations/i18n.js'; 
import global_style from '../styles/global_style.js';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const local_data = [
  {
    value: 'sk',
    label: 'Slovenčina',
    image: { uri: 'https://flagsapi.com/SK/flat/64.png' },
  },
  {
    value: 'en',
    label: 'English',
    image: { uri: 'https://flagsapi.com/GB/flat/64.png' },
  },
];

const LanguageSelect = () => {
  const [selectedLang, setSelectedLang] = useState('sk');

    useEffect(() => {
    (async () => {
      const settings = await StorageService.getItem("app_settings");
      const lang = settings?.language || "en";
      setSelectedLang(lang);
    })();
  }, []);

  // Handle language change
  const handleLanguageChange = async (item) => {
    var selected = item.value;
    setSelectedLang(selected);

    // Save to storage
    await StorageService.updateItem("app_settings", {
      language: selected,
    });

    // Update i18n runtime language
    console.log("selected: " + selected);
    await i18n.changeLanguage(selected);
  };

  return (
    <SelectLanguage
      value={selectedLang}
      data={local_data}
      onChange={handleLanguageChange}
    />
  );
};

export default LanguageSelect;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '80%',
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  containerStyle: {
    //backgroundColor: global_style.colors.secondary_neutral,
  }
});
