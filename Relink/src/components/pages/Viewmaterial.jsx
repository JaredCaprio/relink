import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Homeheader from "../headers/Homeheader";
import Ellipsismenu from "../ui/Ellipsismenu";
import Tippytooltip from "../utils/Tippytooltip";
/* import { redirect } from "react-router-dom"; */

export default function Viewmaterial() {
  const { id } = useParams();
  const material = useLoaderData();
  console.log(material);
  //create makeup for materialbody
  function createMarkup() {
    return { __html: material.body };
  }

  return (
    <main className="main-content">
      <Homeheader headerTitle={null} />

      <div className="label_container ">
        <div className="label label--large flex-between">
          {material.title}

          <span className="label__type">{material.type}</span>
          <Ellipsismenu
            type="materials"
            id={material._id}
            redirect="readinglist"
          />
        </div>
      </div>
      <div id="material-body" className="material-body">
        <p>
          {material.body.map((word, i) => (
            <Tippytooltip key={i} isknown={word.known} word={word.word} />
          ))}
        </p>
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
