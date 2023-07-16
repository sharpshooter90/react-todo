import React from "react";
import { useState } from "react";

import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EditIcon from "@heroicons/react/24/outline/PencilIcon";
import { Tooltip } from "react-tooltip";

function TaskItem({ task, toggleTask, deleteTask, enterEditMode }) {
  const [checked, setChecked] = useState(task?.checked);

  const handleCheckboxChange = (event) => {
    setChecked(!checked);
    toggleTask(task?.id);
  };

  const handleDeleteTask = (event) => {
    deleteTask(task?.id);
  };
  const handleEditTask = (event) => {
    // const name = prompt("Enter new task name", task?.name);
    // if (name) {
    //   updateTask(task?.id, name);
    // }
    enterEditMode(task);
  };

  return (
    <div
      className={`p-6 border-b mb-2 border-gray-200 overflow-hidden bg-white shadow sm:rounded-md ${
        task.checked === true ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id={task?.id}
            name={task?.id}
            checked={checked}
            onChange={handleCheckboxChange}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="w-full ml-3 text-sm leading-6 flex justify-between">
          <label htmlFor={task?.id} className="font-medium text-gray-900">
            {task?.name}
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              data-tooltip-id="todo-app-tooltip"
              data-tooltip-content="Edit Task"
              onClick={handleEditTask}
            >
              <EditIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              data-tooltip-id="todo-app-tooltip"
              data-tooltip-content="Delete Task"
              onClick={handleDeleteTask}
            >
              <TrashIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <Tooltip id="todo-app-tooltip" />
    </div>
  );
}

export default TaskItem;
