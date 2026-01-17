import { useState } from "react";
import { View, Pressable, TextInput } from "react-native";
import LowLevelComponents from "../lowLevelComponents";
import StyleKeys from "../../styles/styleKeys";
import { AssetKeys } from "../../assets/assetKeys";

function DayEditor({ item, onDayUpdated }) {
    const style = StyleKeys.styleDayEditor;
    const isNewItem = item.label === null;
    const [isNewController, setNewController] = useState(isNewItem);
    const [isEditing, setIsEditing] = useState(isNewItem);
    const [label, setLabel] = useState(isNewItem ? "" : item.label);
    const [tempValue, setTempValue] = useState(isNewItem ? "" : item.label);

    const startEditing = () => {
        setTempValue(label);
        setIsEditing(true);
    };

    const finishEditing = () => {
        if (tempValue == null || tempValue == "" ) {
            return;
        }
        setLabel(tempValue);
        setIsEditing(false);
        setNewController(false);

        item.label = tempValue;
        onDayUpdated(item);
    };

     const cancelEditing = () => {
        if (!isNewItem) {
            setIsEditing(false);
        }
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
                    tKey={label || ""}
                    cStyle={style.title}
                />
            )}
        </View>
        <View style={style.containerButtons}>
            {isEditing ? (
                <>
                    <Pressable onPress={finishEditing} style={style.containerIcon}>
                        <AssetKeys.Icons.Checkmark style={style.icon} />
                    </Pressable>
                    {!isNewController ? (
                        <Pressable onPress={cancelEditing} style={style.containerIcon}>
                            <AssetKeys.Icons.Cancel style={style.icon} />
                        </Pressable>
                    ) : (
                        <>
                        </>
                    )}
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

export default DayEditor;
