import React, { useState, useEffect } from 'react';
import { View, Switch } from "react-native";
import LowLevelComponents from "../lowLevelComponents.js";


import StyleKeys from '../../styles/styleKeys.js';
import ServiceKeys from '../../services/serviceKeys.js';

function customSwitch({ tKey, sKey, field }) {
    let style = StyleKeys.styleSwitch;
    let storage = ServiceKeys.serviceStorage;

    const [isEnabled, setIsEnabled] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadSetting = async () => {
            const stored = await storage.getItem(sKey);

            let storedValue = null;

            if (stored && typeof stored === "object" && field) {
                storedValue = stored[field];
            } else {
                storedValue = stored;
            }

            if (storedValue !== null) {
                setIsEnabled(storedValue);
            }

            setLoaded(true);
        };

        loadSetting();
    }, [sKey, field]);

    const toggleSwitch = async () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);

        if (field) {
            await storage.updateItem(sKey, { [field]: newValue });
        } else {
            await storage.setItem(sKey, newValue);
        }
    };

    if (!loaded) return null;

    return (
        <View style={style.container}>
            <View style={style.containerTitle}>
                <LowLevelComponents.Text 
                    tKey={tKey}/>
            </View>

            <View style={style.containerSwitch}>
                <Switch
                    trackColor={{
                        false: style.switch.trackColorFalse,
                        true: style.switch.trackColorTrue
                    }}
                    thumbColor={
                        isEnabled
                            ? style.switch.thumbColorTrue
                            : style.switch.thumbColorFalse
                    }
                    onValueChange={toggleSwitch}
                    value={isEnabled}/>
            </View>
        </View>
    );
}

export default customSwitch;