import React from "react";
import { Link } from "react-router-dom";
export default function Emptylist({ type, listType }) {
  return (
    <div style={{ fontSize: "calc(.85rem + .55vw)", padding: "1em" }}>
      No {type} in {listType}. Add
      <Link to="/addmaterial" className="home-header__add-material-btn">
        <i
          style={{
            backgroundColor: "#376996",
            borderRadius: "50%",
            padding: "7.5px",
            margin: "10px",
            color: "#d9d9d9",
            fontSize: "1.5rem",
          }}
          className="fa-solid fa-plus"
          title="Add Material"
        ></i>
      </Link>
      some {type === "words" ? "materials" : ""} to get started
    </div>
  );
}
