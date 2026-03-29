import Sidebar from "./Sidebar";
import { Navigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      {/* 
        The children render inside this layout.
        The layout dictates the sidebar, and children define their own grid structure (like centering or right panels) 
      */}
      {children}
    </div>
  );
}
