import { useContext } from "react";
import { AppContext } from "../context/app.context";

export const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("useApp() must be used inside AppProvider");

  return context;
};
