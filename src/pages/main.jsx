import { View, Text, ScrollView, Image } from "react-native";
import style from "../styles/pages/main_page_style.js";
import Components from "../components/components.js";
import { TranslationKeys } from "../../src/translations/translation_keys";
import { AssetKeys } from "../assets/assetKeys.js";

function Main() {

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.ComponentContainer> 
                    <View style={style.text_container}>
                        <View style={style.text_title_container}>
                            <Components.LowLevelComponents.Text tKey={TranslationKeys.MAIN_TITLE} custom_style={style.text_title}/>
                        </View>
                        <Components.Divider/>
                        <Components.LowLevelComponents.Text tKey={TranslationKeys.MAIN_PARAGRAPH_1} custom_style={style.text_paragraph}/>
                        <Components.LowLevelComponents.Text tKey={TranslationKeys.MAIN_PARAGRAPH_2} custom_style={style.text_paragraph}/>
                    </View>
                    
                    <View style={style.image_container}>
                        <Image source={AssetKeys.IMAGE_MAIN_PAGE} style={style.image}/>
                    </View>

                </Components.ComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Main;