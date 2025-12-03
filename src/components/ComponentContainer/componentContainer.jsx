import { View } from "react-native"
import StyleKeys from "../../styles/styleKeys";

function ComponentContainer({ children, cStyle }) {
    let style = StyleKeys.styleComponentContainer;
    
    return (
        <View style={[style.container, cStyle]}>
            { children }
        </View>    
    );
}

export default ComponentContainer;