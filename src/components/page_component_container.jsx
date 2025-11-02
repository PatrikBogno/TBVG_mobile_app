import { View } from "react-native"
import style from "../styles/page_component.js";

function PageComponentContainer({ children }) {
    return (
        <View style={style.container}>
            { children }
        </View>    
    );
}

export default PageComponentContainer;