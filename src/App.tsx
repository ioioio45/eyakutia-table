import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WebAppProvider } from "./components/WebAppProvider";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WebAppProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="bg-gray-100 min-h-screen pb-32">
          <div className="container mx-auto max-w-7xl">
            <Routes>
              <Route path="/" element={<ListPage isMobile={isMobile} />} />
              <Route path="/view/:id" element={<DetailPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </WebAppProvider>
  );
}

export default App;
