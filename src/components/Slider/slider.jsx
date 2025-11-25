import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import Slider from '@react-native-community/slider';
import LowLevelComponents from '../lowLevelComponents.js';

import StyleKeys from '../../styles/styleKeys.js';
import ServiceKeys from '../../services/serviceKeys.js';

function customSlider({ tKey, sKey, field }) {
    let style = StyleKeys.styleSlider;
    let storage = ServiceKeys.serviceStorage;

    const [sliderValue, setSliderValue] = useState(false);
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
                setSliderValue(storedValue);
            }

            setLoaded(true);
        };

        loadSetting();
    }, [sKey, field]);

    const changeStorage = async (value) => {
        const newValue = value;

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
            <View style={style.containerSlider}>
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
                }}/>
            </View>
        </View>
    );
}

export default customSlider;