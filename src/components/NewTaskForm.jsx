import React from "react";
import { useState } from "react";

export const NewTaskForm = ({ addTask }) => {
  const [task, setTask] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();
    addTask({
      name: task,
      checked: false,
      id: Date.now(),
    });
    setTask("");
  };

  return (
    <form className="w-full" onSubmit={handleFormSubmit}>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2 w-full">
              <input
                type="text"
                name="task"
                id="task"
                className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter new task"
                onInput={(e) => setTask(e.target.value)}
                required
                autoFocus
                maxLength={80}
                value={task}
              />
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <button
                type="submit"
                aria-label="Add Task"
                className="relative inline-flex items-center rounded-md bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default NewTaskForm;
