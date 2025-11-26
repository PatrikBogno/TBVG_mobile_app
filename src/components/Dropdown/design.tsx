import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Portal } from 'react-native-portalize';
import { AssetKeys } from '../../assets/assetKeys';
import StyleKeys from '../../styles/styleKeys';
import LowLevelComponents from '../lowLevelComponents';

const style = StyleKeys.styleDropdownDesign;
const ic_down = AssetKeys.IMAGE_DOWN;

interface SelectDropdownProps {
  data: any[];
  value: any;
  onChange: (item: any) => void;

  placeholder?: string;

  valueField?: string;
  labelField?: string;

  
  selectedTextStyle?: any;
  placeholderStyle?: any;
  iconStyle?: any;
  iconColor?: string;
}

const Design = ({
  data = [],
  value,
  onChange,

  placeholder = 'Select',

  valueField = 'value',
  labelField = 'label',
}: SelectDropdownProps) => {
  const [visible, setVisible] = useState(false);

  const selectedItem = useMemo(() => {
    return data.find((item) => item[valueField] === value);
  }, [data, value]);

  const renderItem = ({ item }: { item: any }) => (
  <TouchableOpacity
    style={style.item}
    onPress={() => {
      onChange(item);
      setVisible(false);
    }}
  >
    <LowLevelComponents.Text 
      tKey={null}
      tOptions={null}
      cStyle={[style.text, style.selectedTextStyle]}>
      {item[labelField]}
    </LowLevelComponents.Text>

    {item.design && (
      <View
        style={[
          style.colorPreview,
          { backgroundColor: item.design }
        ]}
      />
    )}
  </TouchableOpacity>
);

  return (
    <>
      {/* DROPDOWN BUTTON */}
      <View style={[style.dropdown]}>
        <LowLevelComponents.Text
          tKey={null}
          tOptions={null}
          cStyle={[
            style.text,
            selectedItem ? style.selectedTextStyle : style.placeholderStyle,
            !selectedItem && style.placeholderText,
          ]}>
          {selectedItem ? selectedItem[labelField] : placeholder}
        </LowLevelComponents.Text>

        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={ic_down}
            style={ style.icon }
          />
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Portal>
        {visible && (
          <TouchableOpacity
            style={style.overlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          >
            <View style={style.modalBox} onStartShouldSetResponder={() => true}>
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

export default Design;