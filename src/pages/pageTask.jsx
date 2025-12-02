import { View, ScrollView } from "react-native";
import Components from "../components/components.js";
import StyleKeys from "../styles/styleKeys.js";
import { TranslationKeys } from "../translations/translationKeys";

function Task() {
    let style = StyleKeys.styleTaskPage;

    return (
       <ScrollView showsVerticalScrollIndicator={false} style={style.containerScroll}>
            <View style={style.container}>
                <Components.ComponentContainer> 
                    <Components.LowLevelComponents.Text tKey={TranslationKeys.TASK_TITLE} cStyle={style.pageTitle}/>
                </Components.ComponentContainer>
                <Components.ComponentContainer>
                    <Components.TaskContainer/>
                </Components.ComponentContainer>
            </View>  
        </ScrollView>   
    );
}

export default Task;