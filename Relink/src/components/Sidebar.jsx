import { NavLink, Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/">
        <picture>
          <source media="(max-width: 1024px)" srcSet="../src/assets/re.svg" />
          <img
            className="sidebar__logo logo"
            src="../src/assets/relink-logo-light.svg"
            alt="relink logo"
          />
        </picture>
      </Link>
      <ul className="sidebar__nav-list">
        <NavLink className="sidebar__nav-list-item" to="/home">
          <i className="fa-solid fa-house" title="Home"></i>
          <p className="sidebar__nav-list-item-title">Home</p>
        </NavLink>
        <NavLink className="sidebar__nav-list-item" to="/wordlist">
          <i className="fa-regular fa-rectangle-list" title="Word List"></i>
          <p className="sidebar__nav-list-item-title">Word List</p>
        </NavLink>
        <NavLink className="sidebar__nav-list-item" to="/readinglist">
          <i className="fa-solid fa-book" title="Reading List"></i>
          <p className="sidebar__nav-list-item-title">Reading List</p>
        </NavLink>
        <NavLink className="sidebar__nav-list-item" to="/statistics">
          <i className="fa-solid fa-signal" title="Statistics"></i>
          <p className="sidebar__nav-list-item-title">Statistics</p>
        </NavLink>
      </ul>
    </aside>
  );
}
