import { useState } from "react";
import { View, Text } from "react-native";
import StyleKeys from "../../styles/styleKeys";
import ComponentContainer from "../ComponentContainer/componentContainer";
import LowLevelComponents from "../lowLevelComponents";

function DayComponent({ day }) {
  const style = StyleKeys.styleDayComponent;
  const [label, setLabel] = useState(day.label);

  return (
    <View style={style.container}>
        <ComponentContainer>
            <View style={style.containerItem}>
                <LowLevelComponents.Text tKey={label}/>    

            </View>
        </ComponentContainer>
    </View>
  );
}

export default DayComponent;
