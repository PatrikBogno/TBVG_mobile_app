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
                <Pressable style={style.containerIconButton} onPress={() => navigation.navigate("Week")}>
                    <View style={[style.conainerIcon, isActive("Week") && style.iconActive]}>
                        <Icons.Calendar style={style.icon} />
                    </View>
                </Pressable>
                <Pressable style={style.containerIconButton} onPress={() => navigation.navigate("Day")}>
                    <View style={[style.conainerIcon, isActive("Day") && style.iconActive]}>
                        <Icons.EditCalendar style={style.icon} />
                    </View>
                </Pressable>
                <Pressable style={style.containerIconButton} onPress={() => navigation.navigate("Task")}>
                    <View style={[style.conainerIcon, isActive("Task") && style.iconActive]}>
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