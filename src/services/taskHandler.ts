import storage from "./storage";

export interface Task {
  id: string;
  label: string;
  image: string;
}

const STORAGE_KEY = "tasks";

const createDefaultTasks = (): Task[] => [
  { id: "1", label: "Dressing", image: "IMAGE_TASK_DRESSING" },
  { id: "2", label: "Eating", image: "IMAGE_TASK_EATING" },
  { id: "3", label: "Instrument", image: "IMAGE_TASK_INSTRUMENT" },
  { id: "4", label: "Learning", image: "IMAGE_TASK_LEARNING" },
  { id: "5", label: "Playing", image: "IMAGE_TASK_PLAYING" },
  { id: "6", label: "Reading", image: "IMAGE_TASK_READING" },
  { id: "7", label: "Putting on shoes", image: "IMAGE_TASK_SHOES" }
];

let tasks: Task[] = [];
let initialized = false;

const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString();
};

const saveToStorage = async (): Promise<void> => {
  try {
    await storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
};

const loadFromStorage = async (): Promise<void> => {
  if (initialized) return;

  try {
    const stored = await storage.getItem(STORAGE_KEY);

    if (stored) {
      tasks = JSON.parse(stored);
      console.log("from storage");
    } else {
      tasks = createDefaultTasks();
      console.log("default");
      await saveToStorage();
    }

    initialized = true;
  } catch (error) {
    console.error("Failed to load tasks:", error);
    tasks = createDefaultTasks();
    initialized = true;
  }
};

const taskHandler = {
  async init(): Promise<void> {
    await loadFromStorage();
  },
  // Get all tasks
  getTasks(): Task[] {
    return [...tasks];
  },

  // Get one task
  getTaskById(id: string): Task | undefined {
    return tasks.find(task => task.id === id);
  },

  // Add task
  async addTask(label: string, image: string): Promise<Task> {
    const task: Task = {
      id: generateId(),
      label,
      image
    };

    tasks.push(task);
    await saveToStorage();
    return task;
  },


  async updateTask(id: string, label: string, image: string): Promise<boolean> {
    const task = tasks.find(t => t.id === id);
    if (!task) return false;

    task.label = label;
    task.image = image;

    await saveToStorage();
    return true;
  },

  async removeTask(id: string): Promise<boolean> {
    const prevLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);

    if (tasks.length !== prevLength) {
      await saveToStorage();
      return true;
    }

    return false;
  },

  async reset(): Promise<void> {
    tasks = createDefaultTasks();
    await saveToStorage();
  },

  // JSON export (network / persistence ready)
  toJSON(): string {
    let result = JSON.stringify({ tasks });
    console.log(result);
    return result;
  }
};

export default taskHandler;