import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import Slider from '@react-native-community/slider';
import style from "../styles/setting_slider.js";
import AppText from "./custom_text.jsx";
import StorageService from "../helpers/storage_service.js";

function SettingSlider({ tKey, storageKey, field }) {
    const [sliderValue, setSliderValue] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadSetting = async () => {
            const stored = await StorageService.getItem(storageKey);

            let storedValue = null;

            if (stored && typeof stored === "object" && field) {
                storedValue = stored[field];
            } else {
                storedValue = stored;
            }

            if (storedValue !== null) {
                setSliderValue(storedValue);
            }

            setLoaded(true);
        };

        loadSetting();
    }, [storageKey, field]);

    const changeStorage = async (value) => {
        const newValue = value;

        if (field) {
            await StorageService.updateItem(storageKey, { [field]: newValue });
        } else {
            await StorageService.setItem(storageKey, newValue);
        }
    };

    if (!loaded) return null;

    return (
        <View style={style.container}>
            <View style={style.setting_name}>
                <AppText tKey={tKey} custom_style={style.setting_name_text}/>
            </View>
            <View style={style.slider_container}>
                <Slider
                style={style.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor={style.slider.minimumTrackTintColor}
                maximumTrackTintColor={style.slider.maximumTrackTintColor}
                thumbTintColor={style.slider.thumbTintColor}
                value={sliderValue}
                onSlidingComplete={value => {
                    changeStorage(value);
                }}
            />
            </View>
        </View>
    );
}

export default SettingSlider;