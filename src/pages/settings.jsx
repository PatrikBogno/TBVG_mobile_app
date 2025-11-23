import { View, ScrollView } from "react-native";
import style from "../styles/pages/settings_page_style.js";
import Components from "../components/components.js";
import { TranslationKeys } from "../translations/translation_keys.ts";
import SelectCountryScreen from "../components/setting_dropdown.jsx";

function Settings() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.PageComponentContainer> 
                    <SelectCountryScreen/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_APP_DARK_MODE} storageKey="app_dark_mode"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_APP_COLORBLIND} storageKey="app_colorblind_mode"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_APP_NOTIFICATIONS} storageKey="app_notifictions"/>
                </Components.PageComponentContainer>
                <Components.PageComponentContainer> 
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_APP_DARK_MODE} storageKey="app_dark_mode"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_APP_COLORBLIND} storageKey="app_colorblind_mode"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_APP_NOTIFICATIONS} storageKey="app_notifictions"/>
                </Components.PageComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Settings;