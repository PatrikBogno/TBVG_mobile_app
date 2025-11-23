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
    { value: "sound1", label: "Scibidy toilet", sound: "placeholder"}, //sound will be link to sound file, dont care about this
    { value: "sound2", label: "Bruh sound", sound: "placeholder"},
    { value: "sound3", label: "Bing chilling", sound: "placeholder"},
]

function Settings() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.scroll_container}>
            <View style={style.page_container}>
                <Components.PageComponentContainer>
                    <Components.AppText tKey={TranslationKeys.SETTING_APP_TITLE} custom_style={style.settings_title}/>
                </Components.PageComponentContainer>
                <Components.PageComponentContainer> 
                    <Components.SettingDropdown
                        tKey={TranslationKeys.SETTING_APP_LANGUAGE}
                        storageKey="appSettings"
                        field="language"
                        helperKey="language"       
                        data={languages}
                    />
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_APP_DARK_MODE} storageKey="appSettings" field="app_dark_mode"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_APP_COLORBLIND} storageKey="appSettings" field="app_colorblind_mode"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_APP_NOTIFICATIONS} storageKey="appSettings" field="app_notifictions"/>
                </Components.PageComponentContainer>
                <Components.PageComponentContainer>
                    <Components.AppText tKey={TranslationKeys.SETTING_ESP_TITLE} custom_style={style.settings_title}/>
                </Components.PageComponentContainer>
                <Components.PageComponentContainer> 
                    <Components.SettingDropdown 
                        tKey={TranslationKeys.SETTING_ESP_DISPLAY_DESIGN} 
                        storageKey="espSettings" 
                        field="esp_design"
                        helperKey="design"
                        data={designs}/>
                    <Components.SettingDivider/>
                    <Components.SettingSlider tKey={TranslationKeys.SETTING_ESP_DISPLAY_BRIGHTNESS} storageKey="espSettings" field="esp_brightness"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_ESP_DISPLAY_DYNAMIC_BRIGHTNESS} storageKey="espSettings" field="esp_dynamic_brightness"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_ESP_SOUND_NOTIFICATIONS} storageKey="espSettings" field="esp_notificaiton"/>
                    <Components.SettingDivider/>
                    <Components.SettingSlider tKey={TranslationKeys.SETTING_ESP_SOUND_VOLUME} storageKey="espSettings" field="esp_volume"/>
                    <Components.SettingDivider/>
                    <Components.SettingSwitch tKey={TranslationKeys.SETTING_ESP_SOUND_SOUND_OPTION} storageKey="espSettings" field="esp_sound_option"/>
                    <Components.SettingDivider/>
                    <Components.SettingDropdown
                        tKey={TranslationKeys.SETTING_ESP_SOUND_SOUND_OPTION}
                        storageKey="espSettings"
                        field="esp_sound_option"
                        helperKey="sound"
                        data={sounds}
                    />
                    <Components.SettingDivider/>
                    <Components.SettingSaveButton tKey={TranslationKeys.SETTING_ESP_SAVE_TITLE}/>
                </Components.PageComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Settings;