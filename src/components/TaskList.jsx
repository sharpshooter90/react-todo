import React from "react";
import TaskItem from "./TaskItem";

export const TaskList = ({ tasks, toggleTask, deleteTask, enterEditMode }) => {
  return (
    <div className="flex flex-col-reverse">
      {tasks.map((task, key) => {
        return (
          <TaskItem
            key={key}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            enterEditMode={enterEditMode}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
