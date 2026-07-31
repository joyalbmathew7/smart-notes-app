import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">📝 Smart Notes</h2>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          🏠 Dashboard
        </NavLink>
        <NavLink to="/profile" className="sidebar-link">
          👤 Profile
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
