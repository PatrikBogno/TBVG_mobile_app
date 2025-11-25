import { TouchableOpacity} from "react-native";

import LowLevelComponents from "../lowLevelComponents.js";
import StyleKeys from "../../styles/styleKeys.js";
import ServiceKeys from "../../services/serviceKeys.js";

function customButton({ tKey }) {
    let style = StyleKeys.styleButton;
    let storage = ServiceKeys.serviceStorage;

    const sendData = async () => {
        const settings = await storage.getItem("espSettings");
        //TODO: send data to esp here

        console.log(settings);
    }

    return (
        <TouchableOpacity style={style.container} onPress={sendData}>
            <LowLevelComponents.Text 
                tKey={tKey}/>
        </TouchableOpacity>
    );
}

export default customButton;