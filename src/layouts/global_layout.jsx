import React from "react";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StatusBar } from "react-native";
import Components from "../components/components";
import style from "../styles/global_layout_style.js";

const GlobalLayout = ({ children }) => {
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
                        <Components.Footer/>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    );
};

export default GlobalLayout;