import { View, Text, ScrollView, Image } from "react-native";
import style from "../styles/pages/main_page_style.js";
import Components from "../components/components.js";
import { TranslationKeys } from "../../src/translations/translation_keys";

function Main() {

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.PageComponentContainer> 
                    <View style={style.text_container}>
                        <View style={style.text_title_container}>
                            <Components.AppText tKey={TranslationKeys.MAIN_TITLE} custom_style={style.text_title}/>
                        </View>
                        <Components.SettingDivider/>
                        <Components.AppText tKey={TranslationKeys.MAIN_PARAGRAPH_1} custom_style={style.text_paragraph}/>
                        <Components.AppText tKey={TranslationKeys.MAIN_PARAGRAPH_2} custom_style={style.text_paragraph}/>
                    </View>
                    
                    <View style={style.image_container}>
                        <Image source={require('../assets/images/menu_image.png')} style={style.image}/>
                    </View>

                </Components.PageComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Main;