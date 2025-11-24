import { TouchableOpacity} from "react-native";
import StorageService from "../../helpers/storage_service.js";
import style from "../../styles/setting_save_button.js";
import LowLevelComponents from "../lowLevelComponents.js";

function customButton({ tKey }) {

    const sendData = async () => {
        const settings = await StorageService.getItem("espSettings");
        //TODO: send data to esp here

        console.log(settings);
    }

    return (
        <TouchableOpacity style={style.container} onPress={sendData}>
            <LowLevelComponents.Text tKey={tKey} custom_style={style.text}/>
        </TouchableOpacity>
    );
}

export default customButton;