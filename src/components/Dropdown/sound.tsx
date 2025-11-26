import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Portal } from 'react-native-portalize';
import { AssetKeys } from '../../assets/assetKeys';
import LowLevelComponents from '../lowLevelComponents';
import StyleKeys from '../../styles/styleKeys';

const style = StyleKeys.styleDropdownSound;
const ic_down = AssetKeys.IMAGE_DOWN;
const ic_play = AssetKeys.IMAGE_PLAY; 

interface SelectDropdownProps {
  data: any[];
  value: any;
  onChange: (item: any) => void;

  placeholder?: string;

  valueField?: string;
  labelField?: string;
  // soundField?: string; 

  selectedTextStyle?: any;
  placeholderStyle?: any;
  iconStyle?: any;
  iconColor?: string;
}

const Sound = ({
  data = [],
  value,
  onChange,

  placeholder = 'Select Sound',

  valueField = 'value',
  labelField = 'label',
  // soundField = 'sound', 

  selectedTextStyle,
  placeholderStyle,

  iconStyle,
  iconColor,
}: SelectDropdownProps) => {
  const [visible, setVisible] = useState(false);

  const selectedItem = useMemo(() => {
    return data.find((item) => item[valueField] === value);
  }, [data, value]);

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const isLast = index === data.length - 1;
    console.log(isLast);
    return (
    <View style={[style.itemContainer, isLast && {borderBottomWidth: 0}]}>
      {/* 1. Selection Area (Text) */}
      <TouchableOpacity
        style={style.itemTextContainer}
        onPress={() => {
          onChange(item);
          setVisible(false);
        }}
      >
        <LowLevelComponents.Text 
          tKey={null}
          tOptions={null}
          cStyle={style.text}>
          {item[labelField]}
        </LowLevelComponents.Text>
      </TouchableOpacity>

      {/* 2. Play Button Area (Does not select, just plays) */}
      <TouchableOpacity 
        style={style.playButton}
        onPress={() => {
            console.log(`Playing preview for: ${item[labelField]}`);
        }}
      >
        <Image 
            source={ic_play} 
            style={style.playIcon} 
            resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )};

  return (
    <>
      {/* DROPDOWN BUTTON */}
      <View style={[style.dropdown, style]}>
        <LowLevelComponents.Text
          tKey={null}
          tOptions={null}
          cStyle={[
            style.text,
            !selectedItem && style.placeholderText,
          ]}
        >
          {selectedItem ? selectedItem[labelField] : placeholder}
        </LowLevelComponents.Text>

        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={ic_down}
            style={[
              style.icon,
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

export default Sound;