import { View, ScrollView } from "react-native";
import Components from "../components/components.js";
import StyleKeys from "../styles/styleKeys.js";

function EditTask() {
    let style = StyleKeys.styleTaskPage;

    return (
       <ScrollView showsVerticalScrollIndicator={false} style={style.containerScroll}>
            <View style={style.container}>
                <Components.ComponentContainer> 
                    
                </Components.ComponentContainer>
            </View>  
        </ScrollView>   
    );
}

export default EditTask;