import Header from "./headers/Header";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/UserContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function Landing() {
  const user = useAuth();

  return (
    <div>
      <Header />
      <section className="hero" id="home">
        <div className="hero__call-to-action">
          <h1 className="hero__call-to-action-heading">
            Master Mandarin, <br /> one word at a time
          </h1>
          <p className="hero__call-to-action-subtext">
            Track and improve your Chinese <br />
            vocabulary with ease.
          </p>
          <div className="btn">
            {user ? (
              <Link to="/home">Get Started</Link>
            ) : (
              <Link to="/login">Get Started</Link>
            )}
          </div>
        </div>
      </section>
      <section id="features" className="features">
        <h2 className="features__heading">Features</h2>
        <div className="features__container">
          <div className="info-block">
            <i className="fa-regular fa-rectangle-list"></i>
            <h3 className="info-block__heading">Custom Word list</h3>
            <p className="info-block__text">
              Add words from imported materials to a custom list of known words
            </p>
          </div>
          <div className="info-block">
            <i className="fa-solid fa-book"></i>
            <h3 className="info-block__heading">Import Materials</h3>
            <p className="info-block__text">
              Import Chinese text from various sources, such as websites,
              e-books, or PDF documents.
            </p>
          </div>
          <div className="info-block">
            <i className="fa-solid fa-signal"></i>
            <h3 className="info-block__heading">Track Progress</h3>
            <p className="info-block__text">
              Keep track of the words and reading materials added to your
              profile.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
