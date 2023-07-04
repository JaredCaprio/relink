import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Ellipsismenu({ type, id, redirect, updateList }) {
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
    } else if (event === false) {
      setShowPopup(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    /*   fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/${type}/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate(`/${redirect}`);
          handleClickOutside(false);
          updateList();
        } else {
          navigate("/500");
        }
      })
      .catch((err) => console.log(err)); */

    const res = await fetch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/${type}/${id}`,
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data) {
      navigate(`/${redirect}`);
      handleClickOutside(false);
      if (redirect !== "home" && type === "words") {
        updateList();
      } else {
        return;
      }
    } else {
      navigate("/500");
    }
  };

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

          <li
            onClick={(event) => handleDelete(event)}
            className="ellipsis-menu__popup-li"
          >
            <i className="fa-solid fa-trash-can"></i>
          </li>
        </ul>
      </div>
    </>
  );
}
