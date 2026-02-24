// src/pages/Login.js

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://landofpeace.wp.urdemo.website/wp-json/jwt-auth/v1/token",
        {
          username,
          password,
        }
      );

      // ✅ Token Save
      localStorage.setItem("token", res.data.token);

      // ✅ User Name Save
      localStorage.setItem("user", res.data.user_display_name);

      // ✅ Redirect
      navigate("/dashboard");

      // ✅ Header Update (simple fix)
      window.location.reload();
    } catch (err) {
      setError("Invalid Username or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={cardStyle}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
};

const cardStyle = {
  width: "350px",
  padding: "30px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  backgroundColor: "#fff",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#0073aa",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};