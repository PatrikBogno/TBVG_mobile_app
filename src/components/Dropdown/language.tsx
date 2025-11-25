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

const global_style = StyleKeys.styleGlobal;
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
  style?: StyleProp<ViewStyle>;
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
  style,
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
        style={styles.item}
        onPress={() => {
          onChange(item);
          setVisible(false);
          setSearch('');
        }}
      >
        {item[imageField] ? (
          <Image
            source={item[imageField]}
            style={StyleSheet.flatten([styles.image, imageStyle])}
            resizeMode="contain"
          />
        ) : null}
        <LowLevelComponents.Text 
          tKey={null}
          tOptions={null}
          cStyle={StyleSheet.flatten([styles.text, selectedTextStyle])}>
          {item[labelField]}
        </LowLevelComponents.Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[styles.dropdown, style]}>
        <View style={styles.leftContent}>
          {selectedItem && selectedItem[imageField] && (
            <Image
              source={selectedItem[imageField]}
              style={[styles.image, imageStyle]}
              resizeMode="contain"
            />
          )}
          <LowLevelComponents.Text
            tKey={null}
            tOptions={null}
            cStyle={[
              styles.text,
              !selectedItem && styles.placeholderText,
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
              styles.icon, 
              { tintColor: iconColor }, 
              iconStyle
            ])}
          />
        </TouchableOpacity>
      </View>

      <Portal>
        {visible && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          >
            <View style={styles.modalBox} onStartShouldSetResponder={() => true}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={searchPlaceholder}
                placeholderTextColor="#999"
                style={[styles.search, inputSearchStyle]}
              />

              <FlatList
                data={filteredData}
                keyExtractor={(item, index) =>
                  item[valueField]?.toString() || index.toString()
                }
                renderItem={renderItem}
                style={styles.listContainer}
                initialNumToRender={15}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                  <LowLevelComponents.Text 
                    tKey={null}
                    tOptions={null}  
                    cStyle={styles.emptyText}>
                      No country found
                  </LowLevelComponents.Text>
                }
              />

              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.closeButton}
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

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between', 
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
  },
  image: {
    width: 28,
    height: 24,
    marginRight: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 16,
  },
  placeholderText: {
    opacity: 0.5
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalBox: {
    width: '85%',
    maxHeight: '60%',
    backgroundColor: global_style.colors.secondaryLight,
    padding: 10,
    borderRadius: 12,
    shadowColor: global_style.colors.detailsDark,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: global_style.colors.borders
  },
  search: {
    borderWidth: 2,
    borderColor: global_style.colors.borders,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 45,
    fontSize: 16,
  },
  listContainer: {
    maxHeight: 250,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: global_style.colors.borders,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#777',
  },
  closeButton: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Language;