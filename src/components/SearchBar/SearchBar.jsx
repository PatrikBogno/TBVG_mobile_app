import React from 'react';
import { TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import StyleKeys from '../../styles/styleKeys';

const CustomSearchBar = ({
  tKey,
  tOptions,
  value,
  onChangeText,
  cStyle,
  containerStyle,
  ...props
}) => {
  const { t } = useTranslation();
  let style = StyleKeys.styleSearchBar;

  const placeholder = tKey ? t(tKey, tOptions) : '';

  return (
    <View style={[style.searchContainer, containerStyle]}>
      <TextInput
        style={[style.searchInput, cStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default CustomSearchBar;
