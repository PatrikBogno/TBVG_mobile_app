import { View } from "react-native";
import StyleKeys from "../../styles/styleKeys";

function Divider() {
    let style = StyleKeys.styleDivider;

    return (
        <View style={style.container}/>  
    );
}

export default Divider;