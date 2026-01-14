import { View, Text } from "react-native"
import StyleKeys from "../../styles/styleKeys";

function Header() {
    let style = StyleKeys.styleHeader;
    
    return (
        <View style={style.container}>
            <Text style={style.text} numberOfLines={1}>The Bedside Visual Guide</Text>
        </View>    
    );
}

export default Header;