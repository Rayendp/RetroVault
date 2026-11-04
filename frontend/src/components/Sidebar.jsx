
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Gamepad2,
  Heart,
  Joystick,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Joystick size={30} />
        <h2>RetroVault</h2>
      </div>

      <p className="sidebar-label">MENU</p>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Gamepad2 size={20} />
          <span>Game Library</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Heart size={20} />
          <span>Favorites</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p>RETRO GAMING COLLECTION</p>
        <span>RetroVault © 2026</span>
      </div>
    </aside>
  );
}

export default Sidebar;
