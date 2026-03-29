import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await API.post("/auth/login", { email: form.email, password: form.password });
        localStorage.setItem("token", res.data.token);
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        await API.post("/auth/register", form);
        setIsLogin(true);
        setForm({ ...form, password: "" }); 
        toast.success("Account created successfully! Please log in.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Link to="/" style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem", color: "var(--text-main)", textDecoration: "none" }}>
          <Wallet size={40} strokeWidth={2} />
        </Link>
        <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          {isLogin ? "Sign in to Dashboard" : "Create your account"}
        </h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
          {isLogin ? "Welcome back! Please enter your details." : "Join us to instantly experience digital banking."}
        </p>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input name="name" className="input-base" placeholder="Full Name" value={form.name} onChange={handleChange} required />
              <input name="phone" className="input-base" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
            </>
          )}
          <input name="email" type="email" className="input-base" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" className="input-base" placeholder="Password" value={form.password} onChange={handleChange} required />
          
          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1rem", padding: "1rem" }} disabled={loading}>
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "var(--text-main)", fontWeight: 600, cursor: "pointer", fontSize: "inherit", borderBottom: "1px solid var(--text-main)" }}>
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
