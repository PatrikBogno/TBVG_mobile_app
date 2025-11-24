import { View, ScrollView } from "react-native";
import style from "../styles/pages/settings_page_style.js";
import Components from "../components/components.js";
import { TranslationKeys } from "../translations/translation_keys.ts";

const languages = [
  { value: "sk", label: "Slovenčina", image: { uri: "https://flagsapi.com/SK/flat/64.png" } },
  { value: "en", label: "English", image: { uri: "https://flagsapi.com/GB/flat/64.png" } },
];

const designs = [
    { value: "blue", label: "Placeholder blue", design: "blue"},
    { value: "red", label: "Placeholder red", design: "red"},
    { value: "green", label: "Placeholder green", design: "green"},
    { value: "yellow", label: "Placeholder yellow", design: "yellow"},
    { value: "purple", label: "Placeholder purple", design: "purple"},
];

const sounds = [
    { value: "sound1", label: "Scibidy toilet", sound: "placeholder"}, 
    { value: "sound2", label: "Bruh sound", sound: "placeholder"},
    { value: "sound3", label: "Bing chilling", sound: "placeholder"},
]

function Settings() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.ComponentContainer>
                    <Components.LowLevelComponents.Text tKey={TranslationKeys.SETTING_APP_TITLE} custom_style={style.settings_title}/>
                </Components.ComponentContainer>
                <Components.ComponentContainer> 
                    <Components.DropdownMenu
                        tKey={TranslationKeys.SETTING_APP_LANGUAGE}
                        sKey="appSettings"
                        field="language"
                        helperKey="language"       
                        data={languages}/>
                    <Components.Divider/>
                    <Components.Switch tKey={TranslationKeys.SETTING_APP_DARK_MODE} sKey="appSettings" field="app_dark_mode"/>
                    <Components.Divider/>
                    <Components.Switch tKey={TranslationKeys.SETTING_APP_COLORBLIND} sKey="appSettings" field="app_colorblind_mode"/>
                    <Components.Divider/>
                    <Components.Switch tKey={TranslationKeys.SETTING_APP_NOTIFICATIONS} sKey="appSettings" field="app_notifictions"/>
                </Components.ComponentContainer>
                <Components.ComponentContainer>
                    <Components.LowLevelComponents.Text tKey={TranslationKeys.SETTING_ESP_TITLE} custom_style={style.settings_title}/>
                </Components.ComponentContainer>
                <Components.ComponentContainer> 
                    <Components.DropdownMenu 
                        tKey={TranslationKeys.SETTING_ESP_DISPLAY_DESIGN} 
                        sKey="espSettings" 
                        field="esp_design"
                        helperKey="design"
                        data={designs}/>
                    <Components.Divider/>
                    <Components.Slider tKey={TranslationKeys.SETTING_ESP_DISPLAY_BRIGHTNESS} sKey="espSettings" field="esp_brightness"/>
                    <Components.Divider/>
                    <Components.Switch tKey={TranslationKeys.SETTING_ESP_DISPLAY_DYNAMIC_BRIGHTNESS} sKey="espSettings" field="esp_dynamic_brightness"/>
                    <Components.Divider/>
                    <Components.Switch tKey={TranslationKeys.SETTING_ESP_SOUND_NOTIFICATIONS} sKey="espSettings" field="esp_notificaiton"/>
                    <Components.Divider/>
                    <Components.Slider tKey={TranslationKeys.SETTING_ESP_SOUND_VOLUME} sKey="espSettings" field="esp_volume"/>
                    <Components.Divider/>
                    <Components.DropdownMenu
                        tKey={TranslationKeys.SETTING_ESP_SOUND_SOUND_OPTION}
                        sKey="espSettings"
                        field="esp_sound_option"
                        helperKey="sound"
                        data={sounds}/>
                    <Components.Divider/>
                    <Components.Button tKey={TranslationKeys.SETTING_ESP_SAVE_TITLE}/>
                </Components.ComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Settings;