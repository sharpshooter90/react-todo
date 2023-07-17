import { useState } from "react";

// custom components
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import UpdateTaskForm from "./components/UpdateTaskForm";
import ThemeSwitcher from "./components/ThemeSwitcher";
// custom hooks
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("react-todo.tasks", []);
  const [theme, setTheme] = useLocalStorage("react-todo.theme", "light");

  // TODO: query the system preferences and check the local time to set the theme
  // https://tailwindcss.com/docs/dark-mode
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const toggleTheme = (activeTheme) => {
    setTheme(activeTheme);
  };

  const [editMode, setEditMode] = useState(false);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  // create a updateTask to update the task name
  const updateTask = (task) => {
    // console.log(task);
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );

    // close the edit Mode
    closeEditMode();
  };

  const closeEditMode = () => {
    setEditMode(false);
    previousFocusEl.focus();
  };

  // manage edit state
  const enterEditMode = (task) => {
    setEditMode(true);
    setEditedTask(task);
    setPreviousFocusEl(document.activeElement);
  };

  return (
    <div className="bg-gray-100 dark:bg-slate-800 h-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        <div className="mx-auto max-w-3xl pt-20 h-full flex flex-col">
          {editMode && (
            <UpdateTaskForm
              editedTask={editedTask}
              updateTask={updateTask}
              closeEditMode={closeEditMode}
            />
          )}
          <NewTaskForm addTask={addTask} />
          <div className="mt-4">
            {tasks && (
              <TaskList
                tasks={tasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                enterEditMode={enterEditMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
