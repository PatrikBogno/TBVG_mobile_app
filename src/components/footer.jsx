import { View, Text } from "react-native"
import { Icons } from "../assets/icons/icons.tsx"
import style from "../styles/footer_style.js";

function Footer() {
    return (
        <View style={style.container}>
            <View style={style.icon_menu_container}>
                <View style={style.icon_container}>
                    <Icons.House style={style.icon} />
                </View>
                <View style={style.icon_container}>
                    <Icons.Settings style={style.icon} />
                </View>
                <View style={style.icon_container}>
                    <Icons.Edit style={style.icon} />
                </View>
                <View style={style.icon_container}>
                    <Icons.Book style={style.icon} />
                </View>
            </View>
        </View>    
    );
}

export default Footer;