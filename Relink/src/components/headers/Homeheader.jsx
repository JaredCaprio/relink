import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UserContext";
import { useEffect, useRef, useState } from "react";

export default function Homeheader({ headerTitle }) {
  const userData = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();

  const toggleMenu = () => {
    if (window.innerWidth < 768) {
      setShowMenu(!showMenu);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    fetch("http://localhost:8080/auth/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="home-header">
        <span className="home-header__curr-page">{headerTitle}</span>
        <div className="home-header__profile">
          <Link to="/addmaterial" className="home-header__add-material-btn">
            <i className="fa-solid fa-plus" title="Add Material"></i>
          </Link>
          <div
            ref={ref}
            onClick={() => toggleMenu()}
            className="home-header__profile-icon"
            title={userData?.displayName}
          >
            <img src={userData?.image} alt="" referrerPolicy="no-referrer" />
          </div>
          <div onClick={() => logout()} className="btn home-header__logout-btn">
            Logout
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className={`mobile-home-header ${showMenu ? "" : "hidden"}`}
      >
        <ul className="mobile-home-header__ul">
          <h2 className="mobile-home-header__li--inactive">
            {userData?.displayName}
          </h2>
          <hr />
          <Link to="/addmaterial" className="mobile-home-header__li">
            <i className="fa-solid fa-plus" title="Add Material"></i>
            <span>Add Material</span>
          </Link>

          <li className="mobile-home-header__li">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span
              onClick={() => logout()}
              className="mobile-home-header__logout-btn"
            >
              Logout
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
