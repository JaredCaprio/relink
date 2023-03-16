import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Homeheader from "../headers/Homeheader";

export default function Viewmaterial() {
  const { id } = useParams();
  const material = useLoaderData();

  return (
    <main className="main-content">
      <Homeheader headerTitle={null} />
      <div className="label_container">
        <div className="label label--large">{material.title}</div>
      </div>
      <div className="material-body">
        <p>{material.body}</p>
      </div>
    </main>
  );
}
//loader function
export const viewMaterialsLoader = async ({ params }) => {
  const { id } = params;

  const material = await fetch(
    `${import.meta.env.VITE_SERVER_DOMAIN}/materials/${id}`,
    { credentials: "include" }
  );

  return material.json();
};
