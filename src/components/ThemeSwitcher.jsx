import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// custom components
import MiniHeader from "./MiniHeader";

export const ThemeSwitcher = ({ theme, toggleTheme }) => {
  return (
    <div>
      <MiniHeader theme={theme} toggleTheme={toggleTheme} />{" "}
    </div>
  );
};

export default ThemeSwitcher;
