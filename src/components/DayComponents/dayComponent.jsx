import { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import StyleKeys from "../../styles/styleKeys";
import { Portal } from 'react-native-portalize';
import ComponentContainer from "../ComponentContainer/componentContainer";
import Button from "../Button/button";
import AddTaskComponent from "./addTaskComponent";
import LowLevelComponents from "../lowLevelComponents";
import { TranslationKeys } from "../../translations/translationKeys";
import DayTaskComponent from "./dayTaskComponent";

function DayComponent({ day, handleTask }) {
    const style = StyleKeys.styleDayComponent;
    const [tasks, setTasks] = useState([]); 
    const [isEditorVisible, setEditorVisible] = useState(false);

    const addTask = () => {
        setEditorVisible(true);
    };

    const closeTask = () => {
        setEditorVisible(false);
    };

    const loadTask = () => {
        setTasks(day.tasks);
    }

    useEffect(() => {
        loadTask();
    },);

    /**
     * @param task - The task object from AddTaskComponent
     * @param time - The string in "HH:mm" format from AddTaskComponent
     */
    const selectedTask = (task, time) => {
        const formattedTime = time || "00:00";

        const newTask = {
            id: task.id ?? Date.now(),
            label: task.label,
            time: formattedTime,
        };

        setTasks(tasks => {
            const updatedTasks = [...tasks, newTask];
            handleTask(day, updatedTasks);
            return updatedTasks;
        });

        closeTask();
    };


    return (
        <View style={style.container}>
            <ComponentContainer>
                <View style={style.containerItem}>
                    <View style={style.containerTitle}>
                        <LowLevelComponents.Text tKey={day.label}/>
                    </View>

                    {Array.isArray(tasks) && tasks.map((task, index) => (
                        <DayTaskComponent 
                            key={`${task.id}-${index}`} 
                            task={task.label} 
                            time={task.time} 
                        />
                    ))}

                    <Button tKey={TranslationKeys.DAY_ITEM_BUTTON} onPress={addTask}/>
                </View>
            </ComponentContainer>

            <Portal>
                {isEditorVisible && (
                    <Pressable
                        style={style.overlay}
                        onPress={closeTask}
                    >
                        <Pressable
                            style={style.containerPortal}
                            onPress={(e) => e.stopPropagation()}
                        >
                            <AddTaskComponent onTaskSelect={selectedTask}/>
                        </Pressable>
                    </Pressable>
                )}
            </Portal>
        </View>
    );
}

export default DayComponent;