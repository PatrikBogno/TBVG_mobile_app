import { View, Text, ScrollView } from "react-native";
import style from "../styles/pages/edit_task_page_style.js";
import Components from "../components/components.js";

function EditTask() {

    return (
       <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.ComponentContainer> 
                    
                </Components.ComponentContainer>
            </View>  
        </ScrollView>   
    );
}

export default EditTask;