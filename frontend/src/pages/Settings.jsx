import { User, Shield } from "lucide-react";

export default function Settings() {
  return (
    <div className="content-center">
      <header className="mb-2">
        <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>Settings</h1>
        <p style={{ margin: 0 }}>Manage your account preferences and security.</p>
      </header>
      
      <div className="modern-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <User size={20} color="var(--text-muted)" /> Profile Information
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Update your account profile setup.</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
           <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Full Name</label>
              <input className="input-base" type="text" placeholder="Your Name" value="Navjot" disabled />
           </div>
           <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Email Address</label>
              <input className="input-base" type="email" placeholder="example@finpay.com" disabled />
           </div>
        </div>
        <button className="btn-primary" disabled>Update Profile</button>
      </div>

      <div className="modern-card">
        <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <Shield size={20} color="var(--text-muted)" /> Security Setup
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Manage your passwords and two-factor authentication.</p>
        <button className="btn-secondary" disabled>Change Password</button>
      </div>
    </div>
  );
}
