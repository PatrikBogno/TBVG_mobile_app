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

    const [searchEspName, setSearchEspName] = useState("");
    const [foundDevices, setFoundDevices] = useState([]);
    const intervalRef = useRef(null);
    const discoveryDoneRef = useRef(false);
    const callCountRef = useRef(0);
    const [storedName, setStoredName] = useState(null);
 
    const [connectedDevice, setConnectedDevice] = useState(null);

    //discovery pre neuspesne hladanie
    const [discoveryError, setDiscoveryError] = useState(false);


    const stopDiscovery = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    
      const runDiscovery = async (espName = "") => {

        //const storageEspName = await storage.setItem("ESP_Name", espName);

        if (discoveryDoneRef.current) return;
    
        try {
            const device = await discoverESP32(espName);
    
            console.log(espName);
    
            discoveryDoneRef.current = true;
            stopDiscovery();
    
            setFoundDevices(prev => {
                const exists = prev.some(d => d.ip === device.ip);
                return exists ? prev : [...prev, device];
            });
    
            await storage.setItem("ESP_Name", espName);
            connectToESP(device);
    
            setStoredName(espName);
            // Po úspešnom pripojení nastavíme connectedDevice
            setConnectedDevice(device);
    
        } catch (err) {
            console.log("Discovery error:", err.message);
        }
    };
    
    
      const handleStartDiscovery = (parameterEspName = null) => {
        if (intervalRef.current) return;

        const usedName = parameterEspName ?? searchEspName;
    
        discoveryDoneRef.current = false;
        callCountRef.current = 0;
        setFoundDevices([]);

        setConnectedDevice(null);

        //reset neuspechu
        setDiscoveryError(false);
    
        // Spusti discovery s searchText
        runDiscovery(usedName);
    
        intervalRef.current = setInterval(() => {
            if (callCountRef.current >= 2 || discoveryDoneRef.current) {
                setDiscoveryError(true);
                stopDiscovery();
                return;
            }
    
            callCountRef.current++;
            runDiscovery(searchEspName);
        }, 20000);
    };

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

    const sendData = async () => {

        //generalErrorTitle = TranslationKeys.GENERAL_ERROR_TITLE;
        //espNotConnected = TranslationKeys.ESP_NOT_CONNECTED;

        if (!connectedDevice) {

            const savedName = await storage.getItem("ESP_Name");

            if(savedName){
                Alert.alert(
                    "UPOZORNENIE",
                    "Zariadenie bolo odpojene, znova pripajam..."
                    //TranslationKeys.GENERAL_ERROR_TITLE,
                    //TranslationKeys.ESP_NOT_CONNECTED
                    //generalErrorTitle,
                    //espNotConnected
                );
                console.log(savedName);
                setSearchEspName(savedName);
                await handleStartDiscovery(savedName);
                return;
            }

            Alert.alert(
                "Chyba",
                "Zariadenie nebolo pripojené"
                //TranslationKeys.GENERAL_ERROR_TITLE,
                //TranslationKeys.ESP_NOT_CONNECTED
                //generalErrorTitle,
                //espNotConnected
            );
            return;
        }

        const settings = await storage.getItem("espSettings");
        sendJsonToESP(settings)

        console.log(settings);
        //console.log(searchText)
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

                    <Components.Button tKey={TranslationKeys.SETTING_FIND_ESP_FIND_DEVICE} onPress={() => handleStartDiscovery()}/>
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
                    <Components.Button tKey={TranslationKeys.SETTING_ESP_SAVE_TITLE} onPress={sendData}/>
                </Components.ComponentContainer>
            </View>  
        </ScrollView>
    );
}

export default Settings;