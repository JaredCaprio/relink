import { Link } from "react-router-dom";

export default function Label({ name, haveLink, link }) {
  return (
    <div className="label__container">
      {haveLink ? (
        <Link to={link}>
          <span className="label">{name}</span>
        </Link>
      ) : (
        <span className="label">{name}</span>
      )}
    </div>
  );
}
