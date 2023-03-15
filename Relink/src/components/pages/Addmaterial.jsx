import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Homeheader from "../headers/Homeheader";

export default function Addmaterial() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_HOSTNAME}/materials/add`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/readinglist");
        } else {
        }
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <main className="main-content">
      <Homeheader headerTitle={"Add Material"} />
      <div className="add-materials">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__input">
            <div className="form__input-group">
              <label htmlFor="title">Title</label>
              <input
                onChange={handleChange}
                type="text"
                name="title"
                placeholder="Enter Title Here"
              />
            </div>
            <div className="form__input-group">
              <label htmlFor="type">Type</label>
              <input
                onChange={handleChange}
                type="text"
                name="type"
                list="type"
                placeholder="Enter Type Here"
              />
              <datalist id="type">
                <option value="Book" />
                <option value="Article" />
                <option value="Document" />
                <option value="Journal Entry" />
              </datalist>
            </div>
          </div>
          <div className="form__body">
            {/*  <label htmlFor="body">Enter Text</label> */}
            <textarea
              onChange={handleChange}
              name="body"
              id="body"
              placeholder="Enter Text Here"
            ></textarea>
          </div>
          <input type="submit" className="btn submit-btn" value="Submit" />
        </form>
      </div>
    </main>
  );
}
