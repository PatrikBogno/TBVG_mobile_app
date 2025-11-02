import { View, Text } from "react-native";
import style from "../styles/pages/main_page_style.js";
import Components from "../components/components.js";

function Main() {

    return (
        <View style={style.page_container}>
            <Components.PageComponentContainer> 
                <Text>Text</Text>
            </Components.PageComponentContainer>
        </View>  
    );
}

export default Main;