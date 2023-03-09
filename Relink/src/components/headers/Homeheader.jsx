import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userDataContext } from "../auth/UserContext";

export default function Homeheader({ headerTitle }) {
  const userData = useContext(userDataContext);
  const navigate = useNavigate();

  const logOut = () => {
    fetch("http://localhost:8080/auth/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home-header">
      <span className="home-header__curr-page">{headerTitle}</span>
      <div className="home-header__profile">
        <div className="home-header__add-material-btn">
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className="home-header__profile-icon">
          <img src={userData?.image} alt="" referrerPolicy="no-referrer" />
        </div>
        <div onClick={() => logOut()} className="btn">
          Logout
        </div>
      </div>
    </div>
  );
}
