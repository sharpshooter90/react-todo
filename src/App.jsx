import { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { Tab } from "@headlessui/react";

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white dark:bg-slate-900 shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Up coming Tasks ({incompleteTasks.length})
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white  dark:bg-slate-900 shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Completed ({completedTasks.length})
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel className="rounded-xlp-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                  <motion.div layout>
                    <TaskList
                      tasks={incompleteTasks}
                      toggleTask={toggleTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      enterEditMode={enterEditMode}
                    />
                  </motion.div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                  <motion.div layout>
                    <TaskList
                      tasks={completedTasks}
                      toggleTask={toggleTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      enterEditMode={enterEditMode}
                    />
                  </motion.div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
