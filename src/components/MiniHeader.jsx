import React from "react";
// import sun icon from hero icons
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";

export const MiniHeader = ({ theme, toggleTheme }) => {
  const handleThemeToggle = () => {
    theme === "light" ? toggleTheme("dark") : toggleTheme("light");
  };

  return (
    <div className="mx-auto max-w-3xl mt-8 py-2 px-4 backdrop-blur-md bg-white/30 dark:bg-slate-700/30 rounded-full justify-between items-center flex shadow-sm">
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        Todo App
      </div>
      <button
        type="button"
        className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleThemeToggle}
      >
        {theme === "light" ? (
          <MoonIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <SunIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default MiniHeader;
