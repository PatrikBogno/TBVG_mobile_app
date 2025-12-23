import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import Components from "../components/components";
import { useNavigation } from "@react-navigation/native";
import StyleKeys from "../styles/styleKeys";

const GlobalLayout = ({ children, route }) => {
    let style = StyleKeys.styleGlobalLayout;

    const navigation = useNavigation();

    return (
        <View style={style.container}>
            <SafeAreaProvider>
                <SafeAreaView style={style.containerSafeArea}>
                    <View style={style.header}>
                        <Components.Header/>
                    </View>
                    <View style={style.containerPage}>
                        { children }
                    </View>
                    <View style={style.footer}>
                        <Components.Footer navigation={ navigation } current_route={ route }/>
                    </View>
                </SafeAreaView>    
            </SafeAreaProvider>
        </View>
    );
};

export default GlobalLayout;