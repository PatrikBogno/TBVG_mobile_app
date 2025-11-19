import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import SelectLanguage from './language_select.tsx';
import i18n from '../translations/i18n.js'; 
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
  const [language, setLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('appLanguage');
      if (savedLang && savedLang !== language) {
        setLanguage(savedLang);
        i18n.changeLanguage(savedLang);
      }
    };
    loadLanguage();
  }, []);

  const handleChange = async (item) => {
    const selectedLang = item.value;
    setLanguage(selectedLang);
    await i18n.changeLanguage(selectedLang);
    //await AsyncStorage.setItem('appLanguage', selectedLang);
  };

  return (
    <SelectLanguage
      value={language}
      data={local_data}
      onChange={handleChange}
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
