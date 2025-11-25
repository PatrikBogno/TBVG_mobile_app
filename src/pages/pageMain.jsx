import { View, ScrollView, Image } from "react-native";
import Components from "../components/components.js";
import { TranslationKeys } from "../translations/translationKeys.ts";
import { AssetKeys } from "../assets/assetKeys.js";
import StyleKeys from "../styles/styleKeys.js";

function Main() {
    let style = StyleKeys.styleMainPage;

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.containerScroll}>
            <View style={style.container}>
                <Components.ComponentContainer> 
                    <View style={style.containerText}>
                        <View style={style.containerTitle}>
                            <Components.LowLevelComponents.Text 
                                tKey={TranslationKeys.MAIN_TITLE} 
                                cStyle={style.textTitle}/>
                        </View>
                        <Components.Divider/>
                        <Components.LowLevelComponents.Text 
                            tKey={TranslationKeys.MAIN_PARAGRAPH_1} 
                            cStyle={style.textParagraph}/>
                        <Components.LowLevelComponents.Text 
                            tKey={TranslationKeys.MAIN_PARAGRAPH_2} 
                            cStyle={style.textParagraph}/>
                    </View>
                    
                    <View style={style.containerImage}>
                        <Image source={AssetKeys.IMAGE_MAIN_PAGE} style={style.image}/>
                    </View>

                </Components.ComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Main;