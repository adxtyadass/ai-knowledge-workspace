import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {isAuthenticated} = useAuth()

  return (
    <div className="flex h-screen flex-col">
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 overflow-hidden">
        {isAuthenticated && <Sidebar isSidebarOpen={isSidebarOpen} />}

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
