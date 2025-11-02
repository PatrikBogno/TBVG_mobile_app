import { View, Text } from "react-native";
import style from "../styles/pages/week_view_page_style.js";

function WeekView() {

    return (
        <View style={style.page_container}>
            <Text style={style.text}>Week</Text>
        </View>    
    );
}

export default WeekView;