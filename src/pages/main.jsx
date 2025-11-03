import { View, Text, ScrollView } from "react-native";
import style from "../styles/pages/main_page_style.js";
import Components from "../components/components.js";

function Main() {

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.PageComponentContainer> 
                    <Text style={style.text}>Test</Text>
                </Components.PageComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Main;