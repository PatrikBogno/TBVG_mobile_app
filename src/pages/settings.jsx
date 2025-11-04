import { View, ScrollView } from "react-native";
import style from "../styles/pages/settings_page_style.js";
import Components from "../components/components.js";

function Settings() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.PageComponentContainer> 
                    <Components.SettingSwitch setting_name_text="Dark mode"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch setting_name_text="Notifications"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch setting_name_text="Colorblind mode"/>
                </Components.PageComponentContainer>
                <Components.PageComponentContainer> 
                    <Components.SettingSubmenuOpener setting_name_text="Sound and brightness"/>
                    <Components.SettingDivider/>
                    <Components.SettingSubmenuOpener setting_name_text="Display design"/>
                    <Components.SettingDivider/>
                    <Components.SettingSubmenuOpener setting_name_text="Text settings"/>
                </Components.PageComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Settings;