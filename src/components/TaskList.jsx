import React from "react";
import TaskItem from "./TaskItem";

export const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <div className="">
      {tasks.map((task, key) => {
        return (
          <TaskItem
            key={key}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
