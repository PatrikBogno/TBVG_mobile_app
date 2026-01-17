import React, { useState, useEffect, useCallback, memo} from 'react';
import { View, Pressable, FlatList, BackHandler, Image } from "react-native";
import { Portal } from 'react-native-portalize';
import Components from "../components/components.js";
import LowLevelComponents from '../components/lowLevelComponents.js';
import StyleKeys from "../styles/styleKeys.js";
import { TranslationKeys } from "../translations/translationKeys";
import { AssetKeys } from '../assets/assetKeys.js';
import ServiceKeys from '../services/serviceKeys.js';

const TaskItem = memo(({ item, onTaskPress, style }) => {
    
    // 2. Deterministic Image Resolution [10, 8]
    const resolveImage = (image) => {
        const asset = AssetKeys[image];
        // If it's a module ID (number), return it directly. 
        // expo-image handles numeric IDs better than raw URI strings for local assets.
        if (typeof asset === 'number') return asset;
        return { uri: image };
    };

    return (
        <Pressable 
            style={style.itemContainer}
            onPress={() => onTaskPress(item)}>
            <View style={style.item}>
                <Image 
                    source={resolveImage(item.image)}
                    // 3. Geometric Stabilization: Force a height/ratio [1, 2]
                    style={style.image} 
                    contentFit="cover"
                    transition={200}
                    // Helps prevent flickering during list updates [11]
                    recyclingKey={item.id} 
                />
                <View style={style.imageOverlay}>
                    <LowLevelComponents.Text tKey={item.label}/>
                </View>
            </View>
        </Pressable>
    );
});

function Task() {
    let style = StyleKeys.styleTaskPage;
    const [visibility, setVisibility] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isDayEditorVisible, setDayEditorVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);


    const handleTaskPress = useCallback((item) => {
        setSelectedItem(item);
        setVisibility(true);
    },);

    const refreshTasks = useCallback(() => {
        const updatedTasks = ServiceKeys.serviceTaskHandler.getTasks();
        setTasks(updatedTasks); 
    },);


    useEffect(() => {
        setTasks(ServiceKeys.serviceTaskHandler.getTasks());

        const onBackPress = () => {
            if (visibility) {
                setVisibility(false);   
                refreshTasks();
                return true;            
            }
            return false;               
        };

        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            onBackPress
        );

        return () => subscription.remove();
    }, [visibility]);

    const renderTaskItem = useCallback(({ item }) => (
        <TaskItem 
            item={item} 
            onTaskPress={handleTaskPress} 
            style={style} 
        />
    ),);

    return (
        <View style={style.container}>
            <Components.ComponentContainer> 
                <Components.LowLevelComponents.Text tKey={TranslationKeys.TASK_TITLE} cStyle={style.pageTitle}/>
            </Components.ComponentContainer>
            <Components.ComponentContainer cStyle={style.containerTask}>
                <FlatList
                    data={tasks}
                    extraData={tasks} 
                    keyExtractor={(item) => item.id}
                    renderItem={renderTaskItem}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                />
                <Portal>        
                    {visibility && (
                        <Pressable style={style.overlay} onPress={() => { setVisibility(false); refreshTasks(); }}>
                            <Pressable onPress={(e) => e.stopPropagation()} style={style.containerPortal}>
                                <Components.Task item={selectedItem} />
                            </Pressable>
                        </Pressable>
                    )}
                </Portal>
            </Components.ComponentContainer>
            <Components.ComponentContainer cStyle={style.buttonContainer}> 
                <Components.Button 
                    tKey={TranslationKeys.TASK_BUTTON} 
                    onPress={() => { setVisibility(true); setSelectedItem(null); }}
                />
            </Components.ComponentContainer>
        </View>  
    );
}

export default Task;