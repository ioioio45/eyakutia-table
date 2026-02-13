import { createContext, useContext, type ReactNode } from "react";
import { useWebApp } from "../hooks/useWebApp";
import type { WebApp } from "../types/webapp";

interface WebAppContextType {
  webApp: WebApp | null;
  isLoading: boolean;
  error: string | null;
}

const WebAppContext = createContext<WebAppContextType>({
  webApp: null,
  isLoading: true,
  error: null,
});

export const useWebAppContext = () => useContext(WebAppContext);

export function WebAppProvider({ children }: { children: ReactNode }) {
  const { webApp, isLoading, error } = useWebApp();

  return (
    <WebAppContext.Provider value={{ webApp, isLoading, error }}>
      {children}
    </WebAppContext.Provider>
  );
}
