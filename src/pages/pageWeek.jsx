import { View, ScrollView, Pressable, Text } from "react-native";
import Components from "../components/components.js";
import StyleKeys from "../styles/styleKeys.js";
import { TranslationKeys } from "../translations/translationKeys.ts";
import ServiceKeys from "../services/serviceKeys.js";
import { Portal } from "react-native-portalize";
import { useState, useEffect } from "react";

function Week() {
  const style = StyleKeys.styleWeekViewPage;
  const storage = ServiceKeys.serviceStorage;

  const [visibility, setVisibility] = useState(false);
  const [weekDay, setWeekDay] = useState(null);

  const [wDay, setwDay] = useState([
    { id: 1, label: TranslationKeys.WEEK_MONDAY, tasksForDay: null },
    { id: 2, label: TranslationKeys.WEEK_TUESDAY, tasksForDay: null },
    { id: 3, label: TranslationKeys.WEEK_WEDNESDAY, tasksForDay: null },
    { id: 4, label: TranslationKeys.WEEK_THURSDAY, tasksForDay: null },
    { id: 5, label: TranslationKeys.WEEK_FRIDAY, tasksForDay: null },
    { id: 6, label: TranslationKeys.WEEK_SATURDAY, tasksForDay: null },
    { id: 7, label: TranslationKeys.WEEK_SUNDAY, tasksForDay: null },
  ]);

  const [days, setDays] = useState([]);

  const loadDays = async () => {
    let storedDays = await storage.getItem("days");

    if (typeof storedDays === 'string') {
        try {
        storedDays = JSON.parse(storedDays);
        } catch (e) {
        console.error("Failed to parse storedDays", e);
        setDays([]);
        return;
        }
    }

    if (storedDays && typeof storedDays === 'object') {
        setDays(Object.values(storedDays));
    } else {
        setDays([]);
    }
};


useEffect(() => {

  loadDays();

},);

  /*const [tasks] = useState([
    { id: "day-1768580118410", label: "Pracovný deň", tasks: [] },
    { id: "day-1768580120570", label: "Víkend", tasks: [] },
    { id: "day-1768580305727", label: "Voľný deň", tasks: [] },
    { id: "day-1768580306653", label: "Hudobný deň", tasks: [] },
    { id: "day-1768580307307", label: "Športový deň", tasks: [] },
  ]);*/

  //const tasks = storage.getItem("days");

  /* =========================
     LOAD TASKS FROM STORAGE
     ========================= */
  useEffect(() => {
    const loadWeekTasks = async () => {
      try {
        const updatedDays = await Promise.all(
          wDay.map(async (day) => {
            const data = await storage.getItem(String(day.id));
            return {
              ...day,
              tasksForDay: data ? JSON.parse(data) : null,
            };
          })
        );
        setwDay(updatedDays);
      } catch (error) {
        console.log("Error loading week tasks:", error);
      }
    };

    loadWeekTasks();
  }, []);

  /* =========================
     DELETE TASK FOR DAY
     ========================= */
  const deleteTasksForDay = async (dayId) => {
    await storage.removeItem(String(dayId));

    setwDay((prev) =>
      prev.map((day) =>
        day.id === dayId ? { ...day, tasksForDay: null } : day
      )
    );
  };

  /* =========================
     ADD TASK TO DAY
     ========================= */
  const addTaskToDay = (dayId, task) => {
    setwDay((prev) =>
      prev.map((day) =>
        day.id === dayId ? { ...day, tasksForDay: task } : day
      )
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={style.containerScroll}>
      <View style={style.container}>
        <Components.ComponentContainer>
          <Components.LowLevelComponents.Text
            tKey={TranslationKeys.WEEK_TITLE}
            cStyle={style.pageTitle}
          />
        </Components.ComponentContainer>

        {wDay.map((day) => (
          <Components.ComponentContainer key={day.id}>
            <Components.LowLevelComponents.Text
              tKey={day.label}
              cStyle={style.pageTitle}
            />

            <Components.Divider />

            {/* TASK */}
            {day.tasksForDay && (
              <Text>{day.tasksForDay.label}</Text>
            )}

            {/* BUTTONS */}
            {!day.tasksForDay ? (
              <Components.Button
                tKey={TranslationKeys.WEEK_ASSIGN_TASK}
                onPress={() => {
                  setWeekDay(day.id);
                  setVisibility(true);
                }}
              />
            ) : (
              <>
                <Components.Divider />
                <Components.Button
                  tKey={TranslationKeys.WEEK_DELETE_DAY}
                  onPress={() => deleteTasksForDay(day.id)}
                />
              </>
            )}


          </Components.ComponentContainer>
        ))}

        {/* MODAL */}
        <Portal>
          {visibility && (
            <Pressable
              style={style.overlay}
              onPress={() => setVisibility(false)}
            >
              <Pressable
                style={style.containerPortal}
                onPress={(e) => e.stopPropagation()}
              >
                <Components.WeekComponent
                  items={days}
                  dayOfWeek={weekDay}
                  onAddTask={addTaskToDay}
                  onClose={() => setVisibility(false)}
                />
              </Pressable>
            </Pressable>
          )}
        </Portal>
      </View>
    </ScrollView>
  );
}

export default Week;
