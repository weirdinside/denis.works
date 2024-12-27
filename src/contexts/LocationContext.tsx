import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type PathContextType = {
  paths: string[];
};

type PathProviderProps = {
  children: React.ReactNode;
};

const defaultContext: PathContextType = {
  paths: [],
};

export const PathContext = createContext<PathContextType>(defaultContext);

export function PathProvider({ children }: PathProviderProps) {
  const location = useLocation();
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    setPaths(
      location.pathname.substring(1, location.pathname.length).split("/"),
    );
  }, [location]);

  return (
    <PathContext.Provider value={{ paths }}>{children}</PathContext.Provider>
  );
}
