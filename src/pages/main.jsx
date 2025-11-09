import { View, Text, ScrollView, Image } from "react-native";
import style from "../styles/pages/main_page_style.js";
import Components from "../components/components.js";

function Main() {

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.PageComponentContainer> 
                    <View style={style.text_container}>
                        <View style={style.text_title_container}>
                            <Text style={style.text_title}>Vítame Vás!</Text>
                        </View>
                        <Components.SettingDivider/>
                        <Text style={style.text_paragraph}>{`Pomocou tejto aplikácie a ESP škatuľky dokážete naplánovať deň pre svoje dieťa a to jednoducho za pomoci obrázkov, ktoré dieťaťu ukážu, aké aktivity sa počas daného dňa budú vykonávať.\n\nPri výbere obrázkov máte na výber z dvoch možností a to predpripravený obrázok alebo možnosť nahrať vlastný obrázok.`}</Text>
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