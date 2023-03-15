import React from "react";

export default function Login() {
  return (
    <div className="hero">
      <div className="login">
        <div className="login__container">
          <img
            className="login__logo"
            src="src\assets\relink-logo-light.svg"
            alt="relink logo"
          />
          <span className="login__subtext">
            Master Mandarin, one word at a time
          </span>
          <p>Welcome Back!</p>
          <a
            href={`${import.meta.env.VITE_HOSTNAME}/auth/google`}
            className="btn__google"
          >
            <i className="fab fa-google"></i>Log in With Google
          </a>
        </div>
      </div>
    </div>
  );
}
