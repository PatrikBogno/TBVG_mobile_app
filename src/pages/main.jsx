import { View, Text, ScrollView, Image } from "react-native";
import style from "../styles/pages/main_page_style.js";
import Components from "../components/components.js";

function Main() {

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.PageComponentContainer> 
                    <View>
                        <Text style={style.text_nadpis}>Vítame Vás!</Text>
                        <Text style={style.text}>Pomocou našej aplikácie dokážete naplánovať deň pre svoje dieťa a to jednoducho za pomoci obrázkov, ktoré dieťaťu ukážu, aké aktivity sa počas daného dňa budú vykonávať.</Text>
                        <Text style={style.text}>Pri výbere obrázkov máte na výber z dvoch možností a to predpripravený obrázok alebo možnosť nahrať vlastný obrázok.</Text>
                    </View>
                    
                    <View style={style.image_container}>
                        <Image source={require('./pages_images/menu_image.png')} style={style.image}/>
                    </View>

                </Components.PageComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Main;