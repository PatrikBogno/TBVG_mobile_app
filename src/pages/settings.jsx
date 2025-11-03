import { View, Text, ScrollView } from "react-native";
import style from "../styles/pages/settings_page_style.js";
import Components from "../components/components.js";

function Settigns() {

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.PageComponentContainer> 
                    
                </Components.PageComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Settigns;