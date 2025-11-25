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
import { AssetKeys } from '../../assets/assetKeys';
import LowLevelComponents from '../lowLevelComponents';
import StyleKeys from '../../styles/styleKeys';

const global_style = StyleKeys.styleGlobal;
const ic_down = AssetKeys.IMAGE_DOWN;
const ic_play = AssetKeys.IMAGE_PLAY; 

interface SelectDropdownProps {
  data: any[];
  value: any;
  onChange: (item: any) => void;

  placeholder?: string;

  valueField?: string;
  labelField?: string;
  soundField?: string; // Added specific field for sound

  style?: any;
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
  // soundField = 'sound', // Use this if you need to access the specific sound property key

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
    <View style={styles.itemContainer}>
      {/* 1. Selection Area (Text) */}
      <TouchableOpacity
        style={styles.itemTextContainer}
        onPress={() => {
          onChange(item);
          setVisible(false);
        }}
      >
        <LowLevelComponents.Text 
          tKey={null}
          tOptions={null}
          cStyle={[styles.text, selectedTextStyle]}>
          {item[labelField]}
        </LowLevelComponents.Text>
      </TouchableOpacity>

      {/* 2. Play Button Area (Does not select, just plays) */}
      <TouchableOpacity 
        style={styles.playButton}
        onPress={() => {
            console.log(`Playing preview for: ${item[labelField]}`);
        }}
      >
        <Image 
            source={ic_play} 
            style={[styles.playIcon, { tintColor: iconColor }]} 
            resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {/* DROPDOWN BUTTON */}
      <View style={[styles.dropdown, style]}>
        <LowLevelComponents.Text
          tKey={null}
          tOptions={null}
          cStyle={[
            styles.text,
            selectedItem ? selectedTextStyle : placeholderStyle,
            !selectedItem && styles.placeholderText,
          ]}
        >
          {selectedItem ? selectedItem[labelField] : placeholder}
        </LowLevelComponents.Text>

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
    flex: 1, 
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
    backgroundColor: 'rgba(0,0,0,0.2)', // Optional dimming
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
    borderColor: global_style.colors.borders,
  },

  // --- NEW STYLES FOR SOUND ROW ---
  itemContainer: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: global_style.colors.borders,
  },

  itemTextContainer: {
    flex: 1, // Takes up all remaining space
    justifyContent: 'center',
    paddingRight: 10, // Spacing between text and play button
  },

  playButton: {
    padding: 5, // Hit slop for easier clicking
  },

  playIcon: {
    width: 24,
    height: 24,
    opacity: 0.8,
  }
});

export default Sound;