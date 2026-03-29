import { useEffect, useState } from "react";
import { Plus, Send, RefreshCw, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [addAmount, setAddAmount] = useState("");
  const [sendData, setSendData] = useState({ receiverId: "", amount: "" });

  const fetchData = async (showToast = false) => {
    try {
      if (!wallet) setLoading(true);
      const [walletRes, txRes] = await Promise.all([
        API.get("/wallet/"),
        API.get("/wallet/transactions")
      ]);
      setWallet(walletRes.data.wallet);
      setTransactions(txRes.data.transactions);
      if (showToast) toast.success("Dashboard refreshed");
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Session expired, please log in.");
      } else {
        toast.error("Failed to fetch wallet data.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!addAmount) return;
    try {
      await API.post("/wallet/add", { amount: Number(addAmount) });
      toast.success(`Successfully added $${addAmount}`);
      setAddAmount("");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add money");
    }
  };

  const handleSendMoney = async (e) => {
    e.preventDefault();
    if (!sendData.receiverId || !sendData.amount) return;
    try {
      await API.post("/wallet/send", { 
        receiverId: parseInt(sendData.receiverId), 
        amount: Number(sendData.amount) 
      });
      toast.success(`Successfully sent $${sendData.amount}`);
      setSendData({ receiverId: "", amount: "" });
      fetchData();
    } catch (err) {
       toast.error(err.response?.data?.message || "Failed to send money");
    }
  };

  if (loading && !wallet) {
    return (
      <div className="content-center" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <RefreshCw size={32} color="var(--accent-sage)" style={{ animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <>
      <div className="content-center">
        <header className="flex-between mb-2">
           <div>
             <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>Wallet Overview</h1>
             <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>Welcome back, ID: {wallet?.user_id}</p>
           </div>
           <button onClick={() => fetchData(true)} className="btn-secondary" style={{ padding: "0.5rem", borderRadius: "8px", color: "var(--text-main)" }}>
              <RefreshCw size={18} />
           </button>
        </header>

        <div className="modern-card" style={{ background: "linear-gradient(135deg, var(--accent-sage), var(--accent-dark))", color: "white", marginBottom: "2.5rem", border: "none" }}>
           <p style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500, fontSize: "0.9rem" }}>Total Balance</p>
           <h2 style={{ color: "white", fontSize: "3.5rem", margin: "0.5rem 0", letterSpacing: "-1px" }}>${parseFloat(wallet?.balance || 0).toFixed(2)}</h2>
           <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: 0 }}>Available Funds</p>
        </div>

        <h3 className="mb-1" style={{ fontSize: "1.5rem" }}>Quick Actions</h3>
        <div className="dashboard-grid">
           
           <div className="modern-card">
              <h4 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", fontSize: "1.2rem", fontFamily: "'Inter', sans-serif" }}>
                <div style={{ background: "var(--accent-light)", padding: "0.5rem", borderRadius: "8px", color: "var(--accent-sage)" }}>
                  <Plus size={20} />
                </div>
                Add Funds
              </h4>
               <form onSubmit={handleAddMoney}>
                  <input type="number" placeholder="Amount ($)" className="input-base" min="1" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} required />
                  <button type="submit" className="btn-primary" style={{ width: "100%" }}>Deposit</button>
               </form>
           </div>

           <div className="modern-card">
              <h4 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", fontSize: "1.2rem", fontFamily: "'Inter', sans-serif" }}>
                <div style={{ background: "var(--accent-light)", padding: "0.5rem", borderRadius: "8px", color: "var(--accent-sage)" }}>
                  <Send size={20} />
                </div>
                Transfer Money
              </h4>
               <form onSubmit={handleSendMoney}>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <input type="number" placeholder="Receiver ID" className="input-base" value={sendData.receiverId} onChange={(e) => setSendData({...sendData, receiverId: e.target.value})} required />
                    <input type="number" placeholder="Amount ($)" className="input-base" min="1" value={sendData.amount} onChange={(e) => setSendData({...sendData, amount: e.target.value})} required />
                  </div>
                  <button type="submit" className="btn-secondary" style={{ width: "100%" }}>Send Payment</button>
               </form>
           </div>

        </div>
      </div>

      <aside className="sidebar-right">
         <h3 className="mb-2" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>Recent Activity</h3>
         
         {transactions.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "3rem" }}>No transactions yet.</p>
         ) : (
            <div style={{ paddingTop: "1rem" }}>
               {transactions.map(tx => (
                  <div key={tx.transaction_id} className="tx-timeline-item">
                     <p style={{ fontWeight: 600, fontSize: "0.9rem", textTransform: "capitalize", marginBottom: "0.25rem" }}>
                        {tx.type === "credit" ? "Money Received" : "Money Sent"}
                     </p>
                     
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {new Date(tx.created_at).toLocaleDateString()}
                        </span>
                        <span style={{ fontWeight: 600, fontSize: "0.9rem", color: tx.type === "credit" ? "var(--success)" : "var(--text-main)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                           {tx.type === "credit" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                           {tx.type === "credit" ? "+" : "-"}${parseFloat(tx.amount).toFixed(2)}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </aside>
    </>
  );
}
