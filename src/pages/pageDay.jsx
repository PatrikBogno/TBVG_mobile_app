import React from "react";
import { View, ScrollView } from "react-native";
import Components from "../components/components.js";
import StyleKeys from "../styles/styleKeys.js";
import { TranslationKeys } from "../translations/translationKeys.ts";

function Day() {

  const style = StyleKeys.styleDayPage;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={style.containerScroll}>
      <View style={style.container}>
        <Components.ComponentContainer>
        </Components.ComponentContainer>
      </View>
    </ScrollView>
  );
}

export default Day;
