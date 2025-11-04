import React, {useState} from 'react';
import { View, Switch, Text } from "react-native";
import style from "../styles/setting_submenu_opener.js";
import { Icons } from '../assets/icons/icons.tsx';

function SettingSubmenuOpener({ setting_name_text }) {
    return (
        <View style={style.container}>
            <View style={style.setting_name}>
                <Text style={style.setting_name_text}>{setting_name_text}</Text>
            </View>
            <View style={style.submenu_opener}>
                <Icons.ArrowRight style={style.icon}/>
            </View>
        </View>    
    );
}

export default SettingSubmenuOpener;