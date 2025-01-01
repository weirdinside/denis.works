import React, { createContext, useState, useEffect } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleColorMode: () => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const defaultContext: ThemeContextType = {
  isDarkMode: false,
  toggleColorMode: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setDarkMode] = useState<boolean>(getInitialTheme());

  function toggleColorMode() {
    return setDarkMode((prev) => !prev);
  }

  useEffect(
    function setThemeToStorage() {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    },
    [isDarkMode],
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
