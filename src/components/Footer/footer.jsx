import React from "react";
import { View, Pressable } from "react-native"
import { Icons } from "../../assets/icons/icons.tsx"
import StyleKeys from "../../styles/styleKeys.js";

function Footer({ navigation, current_route }) {
    let style = StyleKeys.styleFooter;
    const isActive = (screen) => current_route === screen;

    return (
        <View style={style.container}>
            <View style={style.containerIconMenu}>

                <Pressable style={style.containerIconButton} onPress={() => navigation.navigate("Main")}>
                    <View style={[style.conainerIcon, isActive("Main") && style.iconActive]}>
                        <Icons.House style={style.icon} />
                    </View>
                </Pressable>  
                <Pressable style={style.containerIconButton} onPress={() => navigation.navigate("WeekView")}>
                    <View style={[style.conainerIcon, isActive("WeekView") && style.iconActive]}>
                        <Icons.Calendar style={style.icon} />
                    </View>
                </Pressable>
                <Pressable style={style.containerIconButton} onPress={() => navigation.navigate("EditDay")}>
                    <View style={[style.conainerIcon, isActive("EditDay") && style.iconActive]}>
                        <Icons.EditCalendar style={style.icon} />
                    </View>
                </Pressable>
                <Pressable style={style.containerIconButton} onPress={() => navigation.navigate("EditTask")}>
                    <View style={[style.conainerIcon, isActive("EditTask") && style.iconActive]}>
                        <Icons.Edit style={style.icon} />
                    </View>
                </Pressable>
                <Pressable style={style.containerIconButton} onPress={() => navigation.navigate("Settings")}>
                    <View style={[style.conainerIcon, isActive("Settings") && style.iconActive]}>
                        <Icons.Settings style={style.icon} />
                    </View>
                </Pressable>
            </View>
        </View>    
    );
}

export default Footer;