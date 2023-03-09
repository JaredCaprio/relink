import { NavLink, Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/">
        <img
          className="sidebar__logo logo"
          src="src\assets\relink-logo-light.svg"
          alt="relink logo"
        />
      </Link>
      <ul className="sidebar__nav-list">
        <NavLink className="sidebar__nav-list-item" to="/home">
          <i className="fa-solid fa-house"></i>
          Home
        </NavLink>
        <NavLink className="sidebar__nav-list-item" to="/wordlist">
          <i className="fa-regular fa-rectangle-list"></i>
          <p className="sidebar__nav-list-item-title">Word List</p>
        </NavLink>
        <li className="sidebar__nav-list-item">
          <i className="fa-solid fa-book"></i>
          <p className="sidebar__nav-list-item-title">Reading List</p>
        </li>
        <li className="sidebar__nav-list-item">
          <i className="fa-solid fa-signal"></i>
          <p className="sidebar__nav-list-item-title">Statistics</p>
        </li>
        <li className="sidebar__nav-list-item">
          <i className="fa-solid fa-user"></i>
          <p className="sidebar__nav-list-item-title">Account</p>
        </li>
      </ul>
    </aside>
  );
}
