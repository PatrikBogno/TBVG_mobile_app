import React, {useState} from 'react';
import { View, Switch, Text } from "react-native";
import global_style from '../styles/global_style.js';
import style from "../styles/setting_switch.js";

function SettingSwitch({ setting_name_text }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={style.container}>
            <View style={style.setting_name}>
                <Text style={style.setting_name_text}>{setting_name_text}</Text>
            </View>
            <View style={style.switch_container}>
                <Switch
                    trackColor={{false: global_style.colors.details_light, true: global_style.colors.details_dark}}
                    thumbColor={isEnabled ? global_style.colors.details_light : global_style.colors.details_dark}
                    onValueChange={toggleSwitch}
                    value={isEnabled}/>
            </View>
        </View>    
    );
}

export default SettingSwitch;