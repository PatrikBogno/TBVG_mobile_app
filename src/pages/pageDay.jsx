import React, { useCallback, useEffect, useRef, useState } from "react";
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
    const TASK_KEY = "tasks";

    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isEditorVisible, setEditorVisible] = useState(false);
    const daysRef = useRef(days);

    /* -------------------- STORAGE -------------------- */

    const loadDays = async () => {
        let storedDays = await storage.getItem(DAYS_KEY);

        if (typeof storedDays === 'string') {
            try {
            storedDays = JSON.parse(storedDays);
            } catch (e) {
            console.error("Failed to parse storedDays", e);
            setDays([]);
            return;
            }
        }

        if (storedDays && typeof storedDays === 'object') {
            setDays(Object.values(storedDays));
        } else {
            setDays([]);
        }
    };


    const saveDays = async () => {
        const storedDays = await storage.getItem(DAYS_KEY);
        
        if (storedDays) {
            storage.updateItem(DAYS_KEY, days);
        }
        else {
            storage.setItem(DAYS_KEY, days);
        }
    }

    useEffect(() => {
        loadDays();
    }, []);

    useEffect(() => {
        daysRef.current = days;
    }, [days]);

    /* -------------------- DAY ACTIONS -------------------- */

    const createNewDay = () => {
        const newDay = {
            id: `day-${Date.now()}`,
            label: null,
            tasks: null
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

    const handleDayUpdated = async (updatedDay) => {
        setDays(days => {
            const dayExists = days.some(day => day.id === updatedDay.id);
            
            if (dayExists) {
                // Update existing day (only label, keep tasks)
                return days.map(day =>
                    day.id === updatedDay.id
                        ? { ...day, label: updatedDay.label }
                        : day
                );
            }

            return [...days, updatedDay];
        });
    
        closeDayEditor();
    };

    const logDaysDeep = async () => {
        console.log('UPDATED DAYS (STRING):');
        console.log(JSON.stringify(daysRef.current, null, 2));
        saveDays();
    };

    


    const handleDayTaskUpdate = async (updatedDay, udpatedTasks) => {
        setDays(days => {
            
            const updated = days.map(day =>
                day.id === updatedDay.id
                ? { ...day, tasks: udpatedTasks }
                : day
            );

            return updated;
        });

        
    
        closeDayEditor();
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
                    <Components.DayComponent day={day} handleTask={handleDayTaskUpdate}/>
                </Pressable>
            ))}

            <Components.ComponentContainer>
            <Components.Button
                tKey={TranslationKeys.DAY_BUTTON}
                onPress={createNewDay}
            />
            </Components.ComponentContainer>

            <Components.ComponentContainer>
            <Components.Button
                tKey={TranslationKeys.DAY_BUTTON}
                onPress={logDaysDeep}
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