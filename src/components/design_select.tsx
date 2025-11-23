import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { Portal } from 'react-native-portalize';
import global_style from '../styles/global_style';

const ic_down = require('../assets/images/down.png');

interface SelectDropdownProps {
  data: any[];
  value: any;
  onChange: (item: any) => void;

  placeholder?: string;

  valueField?: string;
  labelField?: string;

  style?: any;
  selectedTextStyle?: any;
  placeholderStyle?: any;
  iconStyle?: any;
  iconColor?: string;
}

const DropdownDesign = ({
  data = [],
  value,
  onChange,

  placeholder = 'Select',

  valueField = 'value',
  labelField = 'label',

  style,
  selectedTextStyle,
  placeholderStyle,

  iconStyle,
  iconColor = global_style.colors.text,
}: SelectDropdownProps) => {
  const [visible, setVisible] = useState(false);

  const selectedItem = useMemo(() => {
    return data.find((item) => item[valueField] === value);
  }, [data, value]);

  const renderItem = ({ item }: { item: any }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      onChange(item);
      setVisible(false);
    }}
  >
    <Text style={[styles.text, selectedTextStyle]}>
      {item[labelField]}
    </Text>

    {item.design && (
      <View
        style={[
          styles.colorPreview,
          { backgroundColor: item.design }
        ]}
      />
    )}
  </TouchableOpacity>
);

  return (
    <>
      {/* DROPDOWN BUTTON */}
      <View style={[styles.dropdown, style]}>
        <Text
          style={[
            styles.text,
            selectedItem ? selectedTextStyle : placeholderStyle,
            !selectedItem && styles.placeholderText,
          ]}
          numberOfLines={1}
        >
          {selectedItem ? selectedItem[labelField] : placeholder}
        </Text>

        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={ic_down}
            style={[
              styles.icon,
              { tintColor: iconColor },
              iconStyle,
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Portal>
        {visible && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          >
            <View style={styles.modalBox} onStartShouldSetResponder={() => true}>
              <FlatList
                data={data}
                keyExtractor={(item, index) =>
                  item[valueField]?.toString() || index.toString()
                }
                renderItem={renderItem}
              />
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

  text: {
    fontSize: 14,
    color: global_style.colors.text,
  },

  placeholderText: {
    opacity: 0.5,
  },

  icon: {
    width: 25,
    height: 25,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  modalBox: {
    width: '85%',
    maxHeight: '60%',
    backgroundColor: global_style.colors.secondary_light,
    padding: 10,
    borderRadius: 12,
    shadowColor: global_style.colors.details_dark,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: global_style.colors.borders,
  },

  item: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: global_style.colors.borders,
  },

  colorPreview: {
    width: '98%',
    height: 200,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: global_style.colors.borders,
  },

});

export default DropdownDesign;
