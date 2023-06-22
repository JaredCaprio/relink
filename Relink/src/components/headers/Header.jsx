import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { userDataContext } from "../auth/UserContext";
import { useContext } from "react";
import relinkLogoLrg from "../../assets/relink-logo-light.svg";

export default function Header() {
  const user = useContext(userDataContext);
  const [showNav, setShowNav] = useState(false);
  const ref = useRef();
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowNav(false);
    }
  };
  useEffect(() => {
    console.log(import.meta.env.VITE_SERVER_DOMAIN);
    console.log(import.meta.env.VITE_LOCAL_DOMAIN);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <img className="header__logo" src={relinkLogoLrg} alt="relink logo" />

      <ul className="header__nav-list">
        <li className="header__nav-list-item">
          <a href="#home">Home</a>
        </li>
        <li className="header__nav-list-item">
          <a href="#features">Features</a>
        </li>
        <Link
          to={user ? "/home" : "/login"}
          className="header__nav-list-item header__nav-list-item btn--hallow"
        >
          {user ? "Dashboard" : "Login"}
        </Link>
      </ul>
      <div
        ref={ref}
        onClick={() => toggleNav()}
        className="header__burger-menu"
      >
        <div className="header__burger-menu-line header__burger-menu-line1"></div>
        <div className="header__burger-menu-line header__burger-menu-line2"></div>
        <div className="header__burger-menu-line header__burger-menu-line3"></div>
      </div>
      <div ref={ref} className={`mobile-nav ${showNav ? "" : "hidden"}`}>
        <ul className="mobile-nav__list">
          <li className="mobile-nav__list-item">
            <a href="#home">Home</a>
          </li>
          <li className="mobile-nav__list-item">
            <a href="#features">Features</a>
          </li>
          <li className="mobile-nav__list-item">
            {user ? (
              <Link to="/home">Dashboard</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
