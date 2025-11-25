import { View } from "react-native"
import StyleKeys from "../../styles/styleKeys";

function ComponentContainer({ children }) {
    let style = StyleKeys.styleComponentContainer;
    
    return (
        <View style={style.container}>
            { children }
        </View>    
    );
}

export default ComponentContainer;