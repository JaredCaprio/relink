import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Ellipsismenu({ type, id }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  const handleTogglePopup = (e) => {
    e.stopPropagation();
    setShowPopup(!showPopup);
  };

  const navMenu = (event, action) => {
    event.stopPropagation();
    navigate(`/${type}/${action}/${id}`);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowPopup(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        onClick={(e) => handleTogglePopup(e)}
        ref={ref}
        className="ellipsis-menu"
      >
        <div className="ellipsis-menu__dot"></div>
        <div className="ellipsis-menu__dot"></div>
        <div className="ellipsis-menu__dot"></div>
      </div>
      <div
        ref={ref}
        className={`ellipsis-menu__popup ${showPopup ? "" : "hidden"}`}
      >
        <ul className="ellipsis-menu__popup-ul">
          {type === "materials" && (
            <li
              onClick={(event) => navMenu(event, "edit")}
              className="ellipsis-menu__popup-li"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </li>
          )}

          <li className="ellipsis-menu__popup-li">
            <i className="fa-solid fa-trash-can"></i>
          </li>
        </ul>
      </div>
    </>
  );
}
