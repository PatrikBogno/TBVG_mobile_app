import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  ImageStyle,
  TextStyle,
  ViewStyle,
  StyleProp,
  ListRenderItem,
} from 'react-native';
import { Portal } from 'react-native-portalize';
import LowLevelComponents from '../lowLevelComponents';
import { TranslationKeys } from '../../translations/translationKeys';
import { AssetKeys } from '../../assets/assetKeys';
import StyleKeys from '../../styles/styleKeys';

const style = StyleKeys.styleDropdownLanguage;
const ic_down = AssetKeys.IMAGE_DOWN;

interface SelectCountryProps {
  data: any[];
  value: any;
  onChange: (item: any) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  
  // Field mappers
  valueField?: string;
  labelField?: string;
  imageField?: string;

  // Styling overrides
  containerStyle?: StyleProp<ViewStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  iconStyle?: StyleProp<ImageStyle>; // Added for the down arrow
  inputSearchStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  iconColor?: string; // To tint the down arrow
}

const Language = ({
  data = [],
  value,
  onChange,
  placeholder = 'Select country',
  searchPlaceholder = 'Search...',
  valueField = 'value',
  labelField = 'label',
  imageField = 'image',
  selectedTextStyle,
  imageStyle,
  iconStyle,
  inputSearchStyle,
  placeholderStyle,
  iconColor = 'gray',
}: SelectCountryProps) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const selectedItem = useMemo(() => {
    return data.find((item) => item[valueField] === value);
  }, [data, value, valueField]);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) => {
      const label = item[labelField]?.toString().toLowerCase() || '';
      return label.includes(search.toLowerCase());
    });
  }, [data, search, labelField]);

  // Strictly typed renderItem to prevent "Value used as Type" errors
  const renderItem: ListRenderItem<any> = ({ item }) => {
    return (
      <TouchableOpacity
        style={style.item}
        onPress={() => {
          onChange(item);
          setVisible(false);
          setSearch('');
        }}
      >
        {item[imageField] ? (
          <Image
            source={item[imageField]}
            style={StyleSheet.flatten([style.image, imageStyle])}
            resizeMode="contain"
          />
        ) : null}
        <LowLevelComponents.Text 
          tKey={null}
          tOptions={null}
          cStyle={StyleSheet.flatten([style.text, selectedTextStyle])}>
          {item[labelField]}
        </LowLevelComponents.Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[style.dropdown]}>
        <View style={style.leftContent}>
          {selectedItem && selectedItem[imageField] && (
            <Image
              source={selectedItem[imageField]}
              style={[style.image, imageStyle]}
              resizeMode="contain"
            />
          )}
          <LowLevelComponents.Text
            tKey={null}
            tOptions={null}
            cStyle={[
              style.text,
              !selectedItem && style.placeholderText,
              !selectedItem && placeholderStyle,
              selectedItem && selectedTextStyle,
            ]}>
            {selectedItem ? selectedItem[labelField] : placeholder}
          </LowLevelComponents.Text>
        </View>

        <TouchableOpacity 
          onPress={() => setVisible(true)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={ic_down}
            style={StyleSheet.flatten([
              style.icon, 
              { tintColor: iconColor }, 
              iconStyle
            ])}
          />
        </TouchableOpacity>
      </View>

      <Portal>
        {visible && (
          <TouchableOpacity
            style={style.overlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          >
            <View style={style.modalBox} onStartShouldSetResponder={() => true}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={searchPlaceholder}
                placeholderTextColor="#999"
                style={[style.search, inputSearchStyle]}
              />

              <FlatList
                data={filteredData}
                keyExtractor={(item, index) =>
                  item[valueField]?.toString() || index.toString()
                }
                renderItem={renderItem}
                style={style.listContainer}
                initialNumToRender={15}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                  <LowLevelComponents.Text 
                    tKey={null}
                    tOptions={null}  
                    cStyle={style.emptyText}>
                      No country found
                  </LowLevelComponents.Text>
                }
              />

              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={style.closeButton}
              >
                <LowLevelComponents.Text tKey={TranslationKeys.SETTING_APP_LANGUAGE_CLOSE} tOptions={undefined} cStyle={undefined} children={undefined}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </Portal>
    </>
  );
};

export default Language;