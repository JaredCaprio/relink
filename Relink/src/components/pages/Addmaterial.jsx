import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Homeheader from "../headers/Homeheader";

export default function Addmaterial() {
  const [formData, setFormData] = useState(
    JSON.parse(sessionStorage.getItem("newMaterial")),
  );
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("newMaterial", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/materials/add`, {
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
    sessionStorage.removeItem("newMaterial");
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
                value={formData?.title}
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
                value={formData?.type}
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
            <textarea
              onChange={handleChange}
              name="body"
              id="body"
              value={formData?.body}
              placeholder="Enter Text Here"
            ></textarea>
          </div>
          <input type="submit" className="btn large-btn" value="Submit" />
        </form>
      </div>
    </main>
  );
}
