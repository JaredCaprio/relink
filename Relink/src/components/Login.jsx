import React from "react";
import relinkLogoLrg from "../assets/relink-logo-light.svg";

export default function Login() {
  return (
    <div className="hero">
      <div className="login">
        <div className="login__container">
          <img className="login__logo" src={relinkLogoLrg} alt="relink logo" />
          <span className="login__subtext">
            Master Mandarin, one word at a time
          </span>
          <p>Welcome!</p>
          <a
            href={`${import.meta.env.VITE_SERVER_DOMAIN}/auth/google`}
            className="btn__google"
          >
            <i className="fab fa-google"></i>Log in With Google
          </a>
        </div>
      </div>
    </div>
  );
}
