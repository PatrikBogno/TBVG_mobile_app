import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import StyleKeys from "../../styles/styleKeys";
import ServiceKeys from "../../services/serviceKeys";

function AddTaskComponent({ onTaskSelect }) {
    const style = StyleKeys.styleAddTaskComponent;
    const storage = ServiceKeys.serviceStorage;
    const TASK_KEY = "tasks";

    const [tasks, setTasks] = useState([]);
    
    // Initial state as a string "HH:mm"
    const [timeString, setTimeString] = useState(() => {
        const now = new Date();
        const hh = now.getHours().toString().padStart(2, '0');
        return `${hh}:00`; 
    });

    const loadTasks = async () => {
        let storedTasks = await storage.getItem(TASK_KEY);
        if (typeof storedTasks === 'string') {
            try {
                storedTasks = JSON.parse(storedTasks);
            } catch (e) {
                console.error("Failed to parse storedTasks", e);
                storedTasks = [];
            }
        }
        setTasks(Array.isArray(storedTasks) ? storedTasks : []);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleTimeChange = (text) => {
        // Simple regex to allow digits and colon only
        const cleaned = text.replace(/[^0-9:]/g, "");
        setTimeString(cleaned);
    };

    const taskClicked = (item) => {
        // Basic validation check before sending
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(timeString)) {
            alert("Please enter a valid time (HH:mm)");
            return;
        }
        
        // Sends task object and time string (e.g., "14:30")
        onTaskSelect(item, timeString);
    };

    return (
        <View style={style.container}>
            <View style={localStyles.inputWrapper}>
                <Text style={localStyles.label}>Set Time (HH:mm):</Text>
                <TextInput
                    style={localStyles.input}
                    value={timeString}
                    onChangeText={handleTimeChange}
                    placeholder="12:00"
                    keyboardType="numbers-and-punctuation"
                    maxLength={5}
                />
            </View>
            
            {tasks.map((task, index) => (
                <Pressable 
                    key={index}
                    onPress={() => taskClicked(task)} 
                    style={style.containerLabel}
                >
                    <Text>{task.label}</Text>
                </Pressable>
            ))}

            

            <Text style={{ textAlign: 'center', marginTop: 10, color: 'gray' }}>
                Format: 24h (e.g., 09:00 or 21:30)
            </Text>
        </View>
    );
}

// Local styles for the text input layout
const localStyles = StyleSheet.create({
    inputWrapper: {
        marginTop: 20,
        alignItems: 'center',
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        width: 100,
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#fff'
    }
});

export default AddTaskComponent;