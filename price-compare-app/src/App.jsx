// src/App.jsx
import AdminDashboard from "./pages/AdminDashboard";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const localUser = JSON.parse(localStorage.getItem("user"));

  const isAdmin = localUser?.username === "admin" && localUser?.password === "admin123";

  const isAdminRoute = location.pathname === "/admin";

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route
        path="/admin"
        element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
        path="/profile"
        element={localUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
        path="*"
        element={<div style={{ padding: "2rem" }}>Page not found</div>}
        />
        </Routes>


      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
