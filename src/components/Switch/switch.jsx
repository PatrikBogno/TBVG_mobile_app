import React, { useState, useEffect } from 'react';
import { View, Switch } from "react-native";
import global_style from '../../styles/global_style.js';
import style from "../../styles/setting_switch.js";
import LowLevelComponents from "../lowLevelComponents.js";
import StorageService from "../../helpers/storage_service.js";

function customSwitch({ tKey, sKey, field }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadSetting = async () => {
            const stored = await StorageService.getItem(sKey);

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
            // Update only the specific field inside object
            await StorageService.updateItem(sKey, { [field]: newValue });
        } else {
            // Save raw boolean
            await StorageService.setItem(sKey, newValue);
        }
    };

    if (!loaded) return null;

    return (
        <View style={style.container}>
            <View style={style.setting_name}>
                <LowLevelComponents.Text tKey={tKey} style={style.setting_name_style} />
            </View>

            <View style={style.switch_container}>
                <Switch
                    trackColor={{
                        false: global_style.colors.details_light,
                        true: global_style.colors.details_dark
                    }}
                    thumbColor={
                        isEnabled
                            ? global_style.colors.details_light
                            : global_style.colors.details_dark
                    }
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    );
}

export default customSwitch;
