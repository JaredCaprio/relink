import React from "react";
import { useLoaderData } from "react-router-dom";
import Homeheader from "../headers/Homeheader";
import List from "../materials/List";
import Material from "../materials/Material";
import Ellipsismenu from "../ui/Ellipsismenu";
import Emptylist from "../ui/Emptylist";
export default function Readinglist() {
  const materials = useLoaderData();

  return (
    <main className="main-content">
      <Homeheader headerTitle="Reading List" />
      {materials.length > 0 ? (
        <List title1="Title" title2="Added" title3="Type">
          {materials.map((material, i) => (
            <Material
              key={i}
              id={material._id}
              title={material.title}
              added={material.createdAt}
              type={material.type}
              redirect={"readinglist"}
            />
          ))}
        </List>
      ) : (
        <List>
          <Emptylist type="materials" listType="reading list" />
        </List>
      )}
    </main>
  );
}

export const materialsLoader = async () => {
  const materials = await fetch(
    `${import.meta.env.VITE_SERVER_DOMAIN}/materials`,
    {
      credentials: "include",
    }
  ).catch((err) => {
    console.log(err);
  });
  return materials.json();
};
