import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, Text, Pressable } from "react-native";
import { Portal } from 'react-native-portalize';
import Components from "../components/components.js";
import StyleKeys from "../styles/styleKeys.js";
import { TranslationKeys } from "../translations/translationKeys.ts";
import ServiceKeys from "../services/serviceKeys.js";

function Day() {
    const style = StyleKeys.styleDayPage;
    const storage = ServiceKeys.serviceStorage;

    const DAYS_KEY = "days";

    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isEditorVisible, setEditorVisible] = useState(false);

    /* -------------------- STORAGE -------------------- */

    const loadDays = async () => {
        const storedDays = await storage.getItem(DAYS_KEY);
        setDays(Array.isArray(storedDays) ? storedDays : []);
    };

    useEffect(() => {
        loadDays();
    }, []);

    /* -------------------- DAY ACTIONS -------------------- */

    const createNewDay = () => {
        const newDay = {
            id: `day-${Date.now()}`,
            label: null,
            tasks: []
        };

        setSelectedDay(newDay);
        setEditorVisible(true);
    };

    const openDayEditor = (day) => {
        setSelectedDay(day);
        setEditorVisible(true);
    };

    const closeDayEditor = () => {
        setSelectedDay(null);
        setEditorVisible(false);
    };


    // !!! NEEDS CHANGES - update happens in dayEditor finishEditing()
    const handleDayUpdated = async (updatedDay) => {
        
        setDays([...days, updatedDay]);
        closeDayEditor();

        console.log(days);
    };

    

    /*const removeAllDays = async () => {
        storage.removeItem("days");
        console.log("removed all days");
    }

    removeAllDays();*/

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.containerScroll}
        >
        <View style={style.container}>

            <Components.ComponentContainer>
                <Components.LowLevelComponents.Text
                    tKey={TranslationKeys.DAY_TITLE}
                    cStyle={style.title}
                />
            </Components.ComponentContainer>

            {days.map(day => (
                <Pressable
                    key={day.id}
                    style={style.dayBlock}
                    onPress={() => openDayEditor(day)}
                >
                    <Components.DayComponent day={day}/>
                </Pressable>
            ))}

            <Components.ComponentContainer>
            <Components.Button
                tKey={TranslationKeys.DAY_BUTTON}
                onPress={createNewDay}
            />
            </Components.ComponentContainer>

            <Portal>
            {isEditorVisible && (
                <Pressable
                style={style.overlay}
                onPress={closeDayEditor}
                >
                <Pressable
                    style={style.containerPortal}
                    onPress={(e) => e.stopPropagation()}
                >
                    <Components.DayEditor
                        item={selectedDay}
                        onDayUpdated={handleDayUpdated}
                    />
                </Pressable>
                </Pressable>
            )}
            </Portal>

        </View>
        </ScrollView>
    );
}

export default Day;