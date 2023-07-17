import { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

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

  // create complete and incomplete tasks
  const completedTasks = tasks.filter((task) => task.checked);
  const incompleteTasks = tasks.filter((task) => !task.checked);

  // messages for CRUD operations
  const messages = {
    add: "Task added successfully!",
    update: "Task updated successfully!",
    delete: "Task deleted successfully!",
  };

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

  // to paramenterize the toast message types
  function showToast(message, type, options = {}) {
    const defaultOptions = {
      position: "top-right",
      autoClose: 3000,
      transition: Slide,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };

    const toastOptions = { ...defaultOptions, ...options };

    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "info":
        toast.info(message, toastOptions);
        break;
      case "warning":
        toast.warn(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  }

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
    showToast(messages.delete, "info");
  };

  // create a updateTask to update the task name
  const updateTask = (task) => {
    // console.log(task);
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    showToast(messages.update, "success");

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
            {incompleteTasks && (
              <div className="mt-4">
                <motion.div
                  layout
                  className="mb-4 text-gray-800 dark:text-white text-2xl font-bold"
                >
                  Up coming Tasks
                  {incompleteTasks.length === 0 && (
                    <div className="text-gray-500 dark:text-gray-400 text-lg">
                      No up coming tasks
                    </div>
                  )}
                </motion.div>

                <motion.div layout>
                  <TaskList
                    tasks={incompleteTasks}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    enterEditMode={enterEditMode}
                  />
                </motion.div>
              </div>
            )}
            {completedTasks && (
              <div className="mt-4">
                <motion.div
                  layout
                  className="mb-4 text-gray-800 dark:text-white text-2xl font-bold"
                >
                  Completed
                  {completedTasks.length === 0 && (
                    <div className="text-gray-500 dark:text-gray-400 text-lg">
                      No completed tasks
                    </div>
                  )}
                </motion.div>

                <motion.div layout>
                  <TaskList
                    tasks={completedTasks}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    enterEditMode={enterEditMode}
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
