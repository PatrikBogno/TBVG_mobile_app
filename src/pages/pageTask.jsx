import { View, ScrollView } from "react-native";
import Components from "../components/components.js";
import StyleKeys from "../styles/styleKeys.js";
import { TranslationKeys } from "../translations/translationKeys";

function Task() {
    let style = StyleKeys.styleTaskPage;

    return (
        <View style={style.container}>
            <Components.ComponentContainer> 
                <Components.LowLevelComponents.Text tKey={TranslationKeys.TASK_TITLE} cStyle={style.pageTitle}/>
            </Components.ComponentContainer>
            <Components.ComponentContainer cStyle={style.containerTask}>
                <Components.TaskContainer/>
            </Components.ComponentContainer>
            <View style={style.containerButtons}>
                <Components.ComponentContainer cStyle={style.buttonContainerLeft}> 
                    <Components.Button tKey={TranslationKeys.TASK_SAVE}/>
                </Components.ComponentContainer>
                <Components.ComponentContainer cStyle={style.buttonContainerRight}> 
                    
                </Components.ComponentContainer>
            </View>
        </View>  
    );
}

export default Task;