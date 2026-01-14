import { TouchableOpacity} from "react-native";

import LowLevelComponents from "../lowLevelComponents.js";
import StyleKeys from "../../styles/styleKeys.js";

function customButton({ tKey, onPress }) {
    let style = StyleKeys.styleButton;
    
    return (
        <TouchableOpacity style={style.container} onPress={onPress}>
            <LowLevelComponents.Text 
                tKey={tKey}/>
        </TouchableOpacity>
    );
}

export default customButton;