import { View, ScrollView } from "react-native";
import Components from "../components/components.js";
import StyleKeys from "../styles/styleKeys.js";

function EditDay() {
    let style = StyleKeys.styleDayPage;

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.containerScroll}>
            <View style={style.container}>
                <Components.ComponentContainer> 
                    
                </Components.ComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default EditDay;