import React, { useState, useEffect } from 'react';
import { View, Switch } from "react-native";
import global_style from '../styles/global_style.js';
import style from "../styles/setting_switch.js";
import AppText from './custom_text.jsx';
import StorageService from "../helpers/storage_service.js";

function SettingSwitch({ tKey, storageKey }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [loaded, setLoaded] = useState(false); 

    useEffect(() => {
        const loadSetting = async () => {
            const savedValue = await StorageService.getItem(storageKey);
            if (savedValue !== null) {
                setIsEnabled(savedValue);
            }
            setLoaded(true);
        };
        loadSetting();
    }, [storageKey]);

    const toggleSwitch = async () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        await StorageService.setItem(storageKey, newValue);
    };

    if(!loaded) return null;

    return (
        <View style={style.container}>
            <View style={style.setting_name}>
                <AppText tKey={tKey} style={style.setting_name_style} />
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

export default SettingSwitch;
