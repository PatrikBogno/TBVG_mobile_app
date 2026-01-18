import { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import StyleKeys from "../../styles/styleKeys";
import ServiceKeys from "../../services/serviceKeys";
import LowLevelComponents from "../lowLevelComponents";

function DayTaskComponent({task, time}) {
    const style = StyleKeys.styleAddTaskComponent;
    const storage = ServiceKeys.serviceStorage;

    

    return (

        <View style={style.container}>
            <LowLevelComponents.Text tKey={task}/>
            <Text >{time}</Text>
        </View>
    );
}

export default DayTaskComponent;
