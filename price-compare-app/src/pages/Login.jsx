// src/pages/Login.jsx
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const isAdmin = email === "admin" && password === "admin123";

    const user = {
      username: email,
      password: password,
      isAdmin: isAdmin
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAdmin", isAdmin.toString());

    if (isAdmin) {
      alert("Logged in as Admin");
      navigate("/admin");
    } else {
      alert("Logged in as User");
      navigate("/products");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
