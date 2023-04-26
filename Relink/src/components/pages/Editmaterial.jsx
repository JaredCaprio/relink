import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Homeheader from "../headers/Homeheader";

export default function Editmaterial() {
  const materialData = useLoaderData();
  let mappedBody = materialData.body.map((word) => word.word).join("");

  const { id } = useParams();
  const [formData, setFormData] = useState(materialData);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/materials/edit/${id}`, {
      credentials: "include",
      method: "PUT",
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
          navigate("500");
        }
      })
      .catch((error) => {
        navigate("/404");
        console.error(error);
      });
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
                value={formData.title}
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
                value={formData.type}
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
              placeholder="Enter Text Here"
              defaultValue={mappedBody}
            ></textarea>
          </div>
          <input type="submit" className="btn large-btn" value="Submit" />
          <button className="btn large-btn" value="Cancel">
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
}
