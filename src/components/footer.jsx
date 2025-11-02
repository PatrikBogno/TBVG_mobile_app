import React from "react";
import { View, Pressable } from "react-native"
import { Icons } from "../assets/icons/icons.tsx"
import style from "../styles/footer_style.js";

function Footer({ navigation, current_route }) {
    const isActive = (screen) => current_route === screen;
    

    return (
        <View style={style.container}>
            <View style={style.icon_menu_container}>

                <Pressable style={style.icon_button_container} onPress={() => navigation.navigate("Main")}>
                    <View style={[style.icon_container, isActive("Main") && style.active_page_icon]}>
                        <Icons.House style={style.icon} />
                    </View>
                </Pressable>
                <Pressable style={style.icon_button_container} onPress={() => navigation.navigate("Settings")}>
                    <View style={[style.icon_container, isActive("Settings") && style.active_page_icon]}>
                        <Icons.Settings style={style.icon} />
                    </View>
                </Pressable>
                <Pressable style={style.icon_button_container} onPress={() => navigation.navigate("WeekView")}>
                    <View style={[style.icon_container, isActive("WeekView") && style.active_page_icon]}>
                        <Icons.Calendar style={style.icon} />
                    </View>
                </Pressable>
                <Pressable style={style.icon_button_container} onPress={() => navigation.navigate("EditDay")}>
                    <View style={[style.icon_container, isActive("EditDay") && style.active_page_icon]}>
                        <Icons.EditCalendar style={style.icon} />
                    </View>
                </Pressable>
                <Pressable style={style.icon_button_container} onPress={() => navigation.navigate("EditTask")}>
                    <View style={[style.icon_container, isActive("EditTask") && style.active_page_icon]}>
                        <Icons.Edit style={style.icon} />
                    </View>
                </Pressable>
            </View>
        </View>    
    );
}

export default Footer;