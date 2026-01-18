import { View, ScrollView, Alert } from "react-native";
import Components from "../components/components.js";
import { TranslationKeys } from "../translations/translationKeys.ts";
import StyleKeys from "../styles/styleKeys.js";
import { AssetKeys } from "../assets/assetKeys.js";
import ServiceKeys from "../services/serviceKeys.js";
import { discoverESP32 } from "../services/udpDiscovery.js";
import { connectToESP } from '../services/wsClientConnection.js';
import { useState, useRef, useEffect } from "react";
import { sendJsonToESP } from '../services/wsClientConnection.js';
import { handleStartDiscovery } from "../services/handleDiscovery.js";
import { sendData } from "../services/sendData.js";

const languages = [
  { value: "sk", label: "Slovenčina", image: { uri: "https://flagsapi.com/SK/flat/64.png" } },
  { value: "en", label: "English", image: { uri: "https://flagsapi.com/GB/flat/64.png" } },
];

const designs = [
    { value: "design1", label: "Background cars", source: AssetKeys.IMAGE_ESP_CARS},
    { value: "design2", label: "Background dots", source: AssetKeys.IMAGE_ESP_DOTS},
    { value: "design3", label: "Background flowers", source: AssetKeys.IMAGE_ESP_FLOWERS},
    { value: "design4", label: "Background stars", source: AssetKeys.IMAGE_ESP_STARS},
];

const sounds = [
    { value: "sound1", label: "Scibidy toilet", sound: "placeholder"}, 
    { value: "sound2", label: "Bruh sound", sound: "placeholder"},
    { value: "sound3", label: "Bing chilling", sound: "placeholder"},
]

function Settings() {
    let style = StyleKeys.styleSettingsPage;
    let storage = ServiceKeys.serviceStorage;

    //premenne pre discovery
    const [searchEspName, setSearchEspName] = useState("");
    const [foundDevices, setFoundDevices] = useState([]);
    const intervalRef = useRef(null);
    const discoveryDoneRef = useRef(false);
    const callCountRef = useRef(0);
    const [storedName, setStoredName] = useState(null);
    const [connectedDevice, setConnectedDevice] = useState(null);

    //discovery pre neuspesne hladanie
    const [discoveryError, setDiscoveryError] = useState(false);

      const onStartDiscovery = () => {
        handleStartDiscovery({
          searchEspName,
          storage,
          intervalRef,
          discoveryDoneRef,
          callCountRef,
          setFoundDevices,
          setConnectedDevice,
          setStoredName,
          setDiscoveryError,
        });
      };

      //send data -> pre odosielanie inych dat zmen konstantu data
      const onSendData = async () => {
        const data = await storage.getItem("espSettings");
      
        if (!data) {
          Alert.alert("Chyba", "Žiadne nastavenia na odoslanie");
          return;
        }
      
        /*await sendData({
          connectedDevice,
          storage,
          setSearchEspName,
          data: data,
        });*/
        await sendData({
            data: data,
          });
      };
      
    //funkcie pre nacitanie a vymazanie mena pod search barom
    useEffect(() => {
        const loadName = async () => {
            try {
                const espName = await storage.getItem("ESP_Name");
                if(espName){
                    setStoredName(espName);
                }
            }catch(err){
                console.log("Error loading:", err)
            }
        };
        loadName();
    }, []);

    const deleteName = async () => {
        await storage.removeItem("ESP_Name");
        setStoredName(null);
        setConnectedDevice(null);
        console.log("VYMAZANE MENO");
        return;
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={style.containerScroll}>
            <View style={style.container}>
                <Components.ComponentContainer>
                    <Components.LowLevelComponents.Text 
                        tKey={TranslationKeys.SETTING_APP_TITLE} 
                        cStyle={style.textTitle}/>
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
                    <Components.LowLevelComponents.Text tKey={TranslationKeys.SETTING_FIND_ESP_NAME_TITLE} cStyle={style.textTitle}/>
                    
                    <Components.SearchBar value={searchEspName} onChangeText={setSearchEspName} />

                    {storedName && (
                    <>
                        <Components.Divider />
                        <Components.LowLevelComponents.Text
                            tKey={TranslationKeys.SETTING_STORED_ESP_NAME}
                            cStyle={style.textParagraph}
                        />
                        <Components.LowLevelComponents.Text
                            cStyle={style.textParagraph}
                        >
                            {`${storedName}`}
                        </Components.LowLevelComponents.Text>
                        <Components.Divider />
                        <Components.Button tKey={TranslationKeys.SETTING_DELETE_ESP_NAME} onPress={deleteName}/>
                        <Components.Divider />
                    </>
                    )}


                    {connectedDevice && (
                        <>
                        <Components.Divider />
                        <Components.LowLevelComponents.Text
                            tKey={TranslationKeys.SETTING_FIND_ESP_DEVICE_FOUND}
                            cStyle={style.textParagraph}
                        />
                        <Components.Divider />
                        </>
                    )}

                    {!connectedDevice && discoveryError && (
                        <>
                            <Components.Divider />
                            <Components.LowLevelComponents.Text
                                 tKey={TranslationKeys.SETTING_FIND_ESP_DEVICE_FOUND_ERR}
                                cStyle={style.textParagraph}
                            />
                            <Components.Divider />
                        </>
                    )}

                    <Components.Button tKey={TranslationKeys.SETTING_FIND_ESP_FIND_DEVICE} onPress={() => onStartDiscovery()}/>
                    </Components.ComponentContainer>
                
                <Components.ComponentContainer>
                    <Components.LowLevelComponents.Text 
                        tKey={TranslationKeys.SETTING_ESP_TITLE} 
                        cStyle={style.textTitle}/>
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
                    <Components.Button tKey={TranslationKeys.SETTING_ESP_SAVE_TITLE} onPress={onSendData}/>
                </Components.ComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Settings;