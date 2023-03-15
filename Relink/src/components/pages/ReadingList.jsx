import React from "react";
import { useLoaderData } from "react-router-dom";
import Homeheader from "../headers/Homeheader";
import List from "../materials/List";
import Material from "../materials/Material";
export default function Readinglist() {
  const materials = useLoaderData();

  return (
    <main className="main-content">
      <Homeheader headerTitle="Reading List" />
      <List title1="Title" title2="Added" title3="Type">
        {materials.map((material, i) => (
          <Material
            key={i}
            id={material._id}
            title={material.title}
            added={material.createdAt}
            type={material.type}
          />
        ))}
      </List>
    </main>
  );
}

export const materialsLoader = async () => {
  const res = await fetch(`${import.meta.env.VITE_HOSTNAME}/materials`, {
    credentials: "include",
  });
  return res.json();
};
