import React from "react";

export default function Footer() {
  const socialsLines = ["Hire me!", "Follow me!", "Socials"];
  const randomNum = Math.floor(Math.random() * socialsLines.length);
  console.log(randomNum, "rand");

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__img-container">
          <img src="src/assets/relink-logo.svg" alt="" />
        </p>

        <div className="footer__socials">
          <h4>{socialsLines[randomNum]}</h4>
          <ul className="footer__socials-list">
            <li>
              <a target="_blank" href="https://www.github.com/JaredCaprio">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.twitter.com/jaredcaprio">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/jared-caprio/"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <span className="footer__copyright">
        &#169; 2023 <a href="https://jared-caprio.netlify.app/">Jared Caprio</a>
      </span>
    </footer>
  );
}
