import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Wallet, Settings, LogOut, Activity } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <aside className="sidebar-main">
      <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-color)", marginBottom: "1.5rem" }}>
        <h2 style={{ color: "var(--text-main)", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "-0.04em", fontSize: "1.75rem" }}>
          <Wallet color="var(--accent-sage)" strokeWidth={2} size={28} />
          Finpay.
        </h2>
      </div>

      <nav style={{ padding: "0 1rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, padding: "0.5rem 1rem", letterSpacing: "1px" }}>Main Menu</p>
        <Link to="/dashboard" className={`nav-link ${path === '/dashboard' ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link to="/dashboard" className={`nav-link`}>
          <Activity size={20} />
          Activity
        </Link>
        
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600, padding: "1.5rem 1rem 0.5rem", letterSpacing: "1px" }}>Preferences</p>
        <Link to="/settings" className={`nav-link ${path === '/settings' ? 'active' : ''}`}>
          <Settings size={20} />
          Settings
        </Link>
      </nav>

      <div style={{ padding: "1.5rem", borderTop: "1px solid var(--border-color)" }}>
        <button onClick={handleLogout} className="nav-link" style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", color: "var(--text-main)" }}>
          <LogOut size={20} color="var(--text-muted)" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
