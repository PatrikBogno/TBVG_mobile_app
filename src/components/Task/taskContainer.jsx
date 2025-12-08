import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Pressable } from "react-native";
import { Portal } from 'react-native-portalize';

import StyleKeys from '../../styles/styleKeys';
import { AssetKeys } from '../../assets/assetKeys';
import LowLevelComponents from '../lowLevelComponents';
import TaskPortalContainer from './taskPortalContainer';

import { BackHandler } from "react-native";

const images = [
  { id: "1", label: "Dressing", image: AssetKeys.IMAGE_TASK_DRESSING },
  { id: "2", label: "Eating", image: AssetKeys.IMAGE_TASK_EATING },
  { id: "3", label: "Instrument", image: AssetKeys.IMAGE_TASK_INSTRUMENT },
  { id: "4", label: "Learning", image: AssetKeys.IMAGE_TASK_LEARNING },
  { id: "5", label: "Playing", image: AssetKeys.IMAGE_TASK_PLAYING },
  { id: "6", label: "Reading", image: AssetKeys.IMAGE_TASK_READING },
  { id: "7", label: "Putting on shoes", image: AssetKeys.IMAGE_TASK_SHOES },
  { id: "8", label: "Putting on shoes", image: AssetKeys.IMAGE_TASK_SHOES },
  { id: "9", label: "Putting on shoes", image: AssetKeys.IMAGE_TASK_SHOES },
  { id: "10", label: "Putting on shoes", image: AssetKeys.IMAGE_TASK_SHOES },
  { id: "11", label: "Putting on shoes", image: AssetKeys.IMAGE_TASK_SHOES },
];

function taskContainer({}){
    let style = StyleKeys.styleTaskContainer;
    const [visibility, setVisibility] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const onTaskPress = async (item) => {
        setVisibility(true);
        setSelectedItem(item);
    }

    useEffect(() => {
        const onBackPress = () => {
            if (visibility) {
                setVisibility(false);   
                return true;            
            }
            return false;               
        };

        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            onBackPress
        );

        return () => subscription.remove();
    }, [visibility]);

    return (
        <>
        <View style={style.container}>
            <FlatList
                data={ images }
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        style={style.itemContainer}
                        onPress={() => onTaskPress(item)}>
                        <View style={style.item}>
                            <Image source={ item.image } style={ style.image }/>
                            <View style={style.imageOverlay}>
                                <LowLevelComponents.Text tKey={item.label}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>

        <Portal>        
            {visibility && (
                <Pressable
                    style={style.overlay}
                    onPress={() => setVisibility(false)}>
                    <Pressable onPress={(e) => e.stopPropagation()} style={style.containerPortal}>
                        <TaskPortalContainer item={selectedItem} />
                    </Pressable>
                </Pressable>
            )}
        </Portal>
        </>
    )
}

export default taskContainer;