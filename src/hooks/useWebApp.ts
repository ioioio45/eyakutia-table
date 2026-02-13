// src/hooks/useWebApp.ts
import { useState, useEffect } from "react";
import type { WebApp } from "../types/webapp";

declare global {
  interface Window {
    WebApp?: WebApp;
  }
}

const WEBAPP_TIMEOUT = 5000;
const WEBAPP_INTERVAL = 50;

export function useWebApp() {
  const [webApp, setWebApp] = useState<WebApp | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      setError("Window is not defined");
      setIsLoading(false);
      return;
    }

    if (window.WebApp) {
      setWebApp(window.WebApp);
      setIsLoading(false);
      window.WebApp.ready();
      return;
    }

    const timeoutId = setTimeout(() => {
      setError("WebApp не загрузился");
      setIsLoading(false);
    }, WEBAPP_TIMEOUT);

    const intervalId = setInterval(() => {
      if (window.WebApp) {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        setWebApp(window.WebApp);
        setIsLoading(false);
        window.WebApp.ready();
      }
    }, WEBAPP_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return { webApp, isLoading, error };
}
