import React, { useEffect, useState } from 'react';
import { View, Image, Pressable, TextInput } from "react-native";
import ServiceKeys from '../../services/serviceKeys';
import { useActionSheet } from "@expo/react-native-action-sheet";

import StyleKeys from '../../styles/styleKeys';
import { AssetKeys } from '../../assets/assetKeys';
import LowLevelComponents from '../lowLevelComponents';

//odoslanie obrazka
import { handleSendImage } from '../../services/handleSendImage';

function TaskPortalContainer({ item }) {
    let style = StyleKeys.styleTaskPortalContainer;

    const resolveImage = (image) => {
        return AssetKeys[image] ?? { uri: image };
    };

    //ServiceKeys.serviceTaskHandler.reset();
    //ServiceKeys.serviceStorage.removeItem("tasks");

    const isNewItem = item === null;

    const [isEditing, setIsEditing] = useState(isNewItem);
    const [labelValue, setLabelValue] = useState(isNewItem ? "" : item.label);
    const [tempValue, setTempValue] = useState(isNewItem ? "" : item.label);
    const [imageSource, setImageSource] = useState(
        isNewItem ? null : item?.image ?? null
    );

    const { showActionSheetWithOptions } = useActionSheet();

    const startEditing = () => {
        setTempValue(labelValue);
        setIsEditing(true);
    };

    const finishEditing = async () => {
        setLabelValue(tempValue);
        setIsEditing(false);
        if (isNewItem) {
            const test = await ServiceKeys.serviceTaskHandler.addTask(tempValue, imageSource ?? "");
            console.log(test.id);
            const stringId = String(test.id);
            console.log(stringId);
            handleSendImage(tempValue, imageSource, stringId);
        }
        else {
            await ServiceKeys.serviceTaskHandler.updateTask(item.id, tempValue, imageSource ?? item.image);
            const stringId = String(item.id);
            handleSendImage(tempValue, imageSource, stringId);
        }
    };

    const cancelEditing = () => {
        if (!isNewItem) {
            setIsEditing(false);
        }
    };

    const chooseImage = () => {
        const options = ["Take Photo", "Choose From Gallery", "Cancel"];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                    const img = await ServiceKeys.serviceImagePicker.takePhoto();
                    if (img) setImageSource(img.uri);
                } else if (buttonIndex === 1) {
                    const img = await ServiceKeys.serviceImagePicker.pickFromGallery();
                    if (img) setImageSource(img.uri);
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
                        placeholder=" "
                        style={[
                            style.title,
                            { marginTop: 1 },
                            isEditing && style.titleEdit
                        ]}
                    />
                ) : (
                    <LowLevelComponents.Text
                        tKey={labelValue || ""}
                        cStyle={style.title}
                    />
                )}
            </View>
            <View style={style.containerImage}>
                <Image
                    source={imageSource ? resolveImage(imageSource) : null}
                    style={[
                        style.image,
                        !imageSource && { backgroundColor: "white" }
                    ]}
                    resizeMode="cover"
                />

                {isEditing && (
                    <Pressable onPress={chooseImage} style={style.imageOverlay}>
                        <AssetKeys.Icons.EditImage style={style.iconEditImage} />
                    </Pressable>
                )}
            </View>
            <View style={style.containerButtons}>
                {isEditing ? (
                    <>
                        <Pressable onPress={finishEditing} style={style.containerIcon}>
                            <AssetKeys.Icons.Checkmark style={style.icon} />
                        </Pressable>

                        <Pressable onPress={cancelEditing} style={style.containerIcon}>
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