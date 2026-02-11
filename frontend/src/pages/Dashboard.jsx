import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Protect route
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchBalance = async () => {
      try {
        const response = await api.get("/api/v1/account/balance");
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);

        // If token invalid or expired → logout
        if (error.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div>
      <Appbar />

      {/* Top Section */}
      <div className="m-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>

      {/* Content Section */}
      <div className="m-8">
        {loading ? (
          <p className="text-gray-500">Loading balance...</p>
        ) : (
          <Balance value={balance} />
        )}

        <Users />
      </div>
    </div>
  );
};
