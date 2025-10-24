import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Components from "../components/components"

const GlobalLayout = ({ children }) => {
    return (
        <>
            <StatusBar/>
            <Components.Header/>
            <View>
                {children}
            </View>
            <Components.Footer/>
        </>
    );
};

export default GlobalLayout;