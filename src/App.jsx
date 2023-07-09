import { useState } from "react";

// custom components
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
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

  return (
    <div className="bg-gray-100 h-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl pt-20 h-full flex flex-col">
          <NewTaskForm addTask={addTask} />
          <div className="mt-4">
            {tasks && (
              <TaskList
                tasks={tasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
