import { TouchableOpacity} from "react-native";
import StorageService from "../helpers/storage_service.js";
import style from "../styles/setting_save_button.js";
import AppText from "./custom_text.jsx";

function SettingSaveButton({ tKey }) {

    const sendData = async () => {
        const settings = await StorageService.getItem("espSettings");

        console.log(settings);
    }

    return (
        <TouchableOpacity style={style.container} onPress={sendData}>
            <AppText tKey={tKey} custom_style={style.text}/>
        </TouchableOpacity>
    );
}

export default SettingSaveButton;