import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import Components from "../components/components";
import style from "../styles/global_layout_style.js";
import { useNavigation } from "@react-navigation/native";

const GlobalLayout = ({ children, current_route }) => {
    const navigation = useNavigation();

    return (
        <View style={style.application_container}>
            <SafeAreaProvider>
                <SafeAreaView style={style.safe_view_container}>
                    <View style={style.header}>
                        <Components.Header/>
                    </View>
                    <View style={style.page_container}>
                        { children }
                    </View>
                    <View style={style.footer}>
                        <Components.Footer navigation={ navigation } current_route={ current_route }/>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    );
};

export default GlobalLayout;