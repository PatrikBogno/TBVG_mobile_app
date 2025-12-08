import React, { useState } from 'react';
import { View, Image, Pressable, TextInput } from "react-native";
import ServiceKeys from '../../services/serviceKeys';
import { useActionSheet } from "@expo/react-native-action-sheet";

import StyleKeys from '../../styles/styleKeys';
import { AssetKeys } from '../../assets/assetKeys';
import LowLevelComponents from '../lowLevelComponents';

function TaskPortalContainer({ item }){
    let style = StyleKeys.styleTaskPortalContainer;
    
    const [isEditing, setIsEditing] = useState(false);
    const [labelValue, setLabelValue] = useState(item.label);
    const [tempValue, setTempValue] = useState(item.label);
    const [imageSource, setImageSource] = useState(item.image);


    const { showActionSheetWithOptions } = useActionSheet();

    const startEditing = () => {
        setTempValue(labelValue);    
        setIsEditing(true);
    };

    const finishEditing = () => {
        setLabelValue(tempValue);    
        setIsEditing(false);
    };

    const cancelEditing = () => {    
        setIsEditing(false);
    };

    const chooseImage = () => {
        const options = ["Take Photo", "Choose From Gallery", "Cancel"];
        const cancelButtonIndex = 2;
        console.log('test');
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                console.log('test_2');
                if (buttonIndex === 0) {
                    const img = await ServiceKeys.serviceImagePicker.takePhoto();
                    if (img) setImageSource({ uri: img.uri });
                } else if (buttonIndex === 1) {
                    const img = await ServiceKeys.serviceImagePicker.pickFromGallery();
                    if (img) setImageSource({ uri: img.uri });
                }
            }
        );
    };


    return (
        <View style={style.container}>
            <View style={style.containerTitle}>
                {isEditing ? (
                    <TextInput
                        value={tempValue}
                        onChangeText={setTempValue}
                        maxLength={20}
                        autoFocus
                        style={[style.title, {marginTop: 1}, isEditing && style.titleEdit]}
                    />
                ) : (
                    <LowLevelComponents.Text
                        tKey={labelValue}
                        cStyle={style.title}
                    />
                )}
            </View>
            <View style={style.containerImage}>
                <Image source={imageSource} style={style.image}/>
                {isEditing ? (
                    <Pressable onPress={chooseImage} style={style.imageOverlay}>
                        <AssetKeys.Icons.EditImage style={style.iconEditImage}/>
                    </Pressable>
                ) : (
                    <></>
                )}
            </View>
            <View style={style.containerButtons}>
                {isEditing ? (
                    <>
                        <Pressable onPress={finishEditing} style={style.containerIcon}>
                            <AssetKeys.Icons.Checkmark style={style.icon} />
                        </Pressable>

                        <Pressable onPress={cancelEditing} style={ style.containerIcon}>
                            <AssetKeys.Icons.Cancel style={style.icon} />
                        </Pressable>
                    </>
                ) : (
                    <Pressable onPress={startEditing} style={style.containerIcon}>
                        <AssetKeys.Icons.Edit style={style.icon} />
                    </Pressable>
                )}
            </View>
        </View>
    );
}

export default TaskPortalContainer;