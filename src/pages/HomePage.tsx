import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/logout");
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <nav>
        <button onClick={() => navigate("/setup")}>Setup</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default HomePage;
