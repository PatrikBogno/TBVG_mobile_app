import { View, Text } from "react-native"
import style from "../styles/header_style.js";

function Header() {
    return (
        <View style={style.container}>
            <Text style={style.text}>Test</Text>
        </View>    
    );
}

export default Header;