import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next'; 
import StyleKeys from '../../styles/styleKeys.js';

const customText = ({ tKey, tOptions, custom_style, children }) => {
  const style = StyleKeys.styleText;
  const { t } = useTranslation(); 

  const content = tKey ? t(tKey, tOptions) : children;

  return (
    <Text style={[style.text, custom_style]}>
      {content}
    </Text>
  );
};

export default customText;