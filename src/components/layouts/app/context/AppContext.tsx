import React from "react";

export type AppContextProviderProps = {
  children: React.ReactNode;
};
export type AppContextType = {};

export const AppContext = React.createContext({} as AppContextType);
export default function AppContextProvider({ children }: AppContextProviderProps) {
  const value = {};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
