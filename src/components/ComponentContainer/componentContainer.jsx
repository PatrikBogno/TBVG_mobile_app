import { View } from "react-native"
import style from "../../styles/page_component.js";

function ComponentContainer({ children }) {
    return (
        <View style={style.container}>
            { children }
        </View>    
    );
}

export default ComponentContainer;