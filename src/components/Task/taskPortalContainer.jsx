import React, { useState } from 'react';
import { View, FlatList, Image, Pressable, TextInput } from "react-native";


import StyleKeys from '../../styles/styleKeys';
import { AssetKeys } from '../../assets/assetKeys';
import LowLevelComponents from '../lowLevelComponents';

function TaskPortalContainer({ item }){
    let style = StyleKeys.styleTaskPortalContainer;
    
    const [isEditing, setIsEditing] = useState(false);
    const [labelValue, setLabelValue] = useState(item.label);
    const [tempValue, setTempValue] = useState(item.label);

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

    return (
        <View style={style.container}>
            <View style={style.containerTitle}>
                {isEditing ? (
                    <>
                        <TextInput
                            value={tempValue}
                            onChangeText={setTempValue}
                            autoFocus
                            style={[style.title, {marginTop: 1}]}
                        />

                        {/* SAVE / CHECKMARK */}
                        <Pressable onPress={finishEditing} style={style.containerIcon}>
                            <AssetKeys.Icons.Checkmark style={style.icon} />
                        </Pressable>

                        {/* CANCEL */}
                        <Pressable onPress={cancelEditing} style={ style.containerIconCancel}>
                            <AssetKeys.Icons.Cancel style={style.icon} />
                        </Pressable>
                    </>
                ) : (
                    <>
                        <LowLevelComponents.Text
                            tKey={labelValue}
                            cStyle={style.title}
                        />

                        {/* EDIT ICON */}
                        <Pressable onPress={startEditing} style={style.containerIcon}>
                            <AssetKeys.Icons.Edit style={style.icon} />
                        </Pressable>
                    </>
                )}
            </View>
            <View style={style.containerImage}>

            </View>
            <View style={style.containerButtons}>

            </View>
        </View>
    );
}

export default TaskPortalContainer;