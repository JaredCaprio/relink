import React, { useEffect, useState, useRef } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import Homeheader from "../headers/Homeheader";
import Tooltip from "../ui/Tooltip";
import Ellipsismenu from "../ui/Ellipsismenu";

export default function Viewmaterial() {
  const { id } = useParams();
  const material = useLoaderData();
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState(null);
  const [def, setDef] = useState([]);
  // Fetching defintion of selected word from API
  const fetchDefinition = (word) => {
    if (!word) return;
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/words/define/${word}`)
      .then((res) => res.json())
      .then((data) => {
        setDef(data);
      });
  };

  //create makeup for materialbody
  function createMarkup() {
    return { __html: material.body };
  }

  //Handling change of selected on mouse up inside body div
  const handleSelectionChange = () => {
    const selection = window.getSelection();
    const parentEl = selection.focusNode.parentNode.offsetParent;

    if (!selection.isCollapsed && !parentEl.classList.contains("tooltip")) {
      const range = selection.getRangeAt(0);
      fetchDefinition(selection.toString().trim());
      setSelectedRange(range);
    } else {
      setSelectedRange(null);
    }
  };

  return (
    <main onMouseUp={handleSelectionChange} className="main-content">
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
        <p dangerouslySetInnerHTML={createMarkup()}></p>
        {def.length === 0 ? (
          <Tooltip definition="No Word Found" range={selectedRange} />
        ) : (
          <Tooltip
            simplified={def[0].simplified}
            definition={def.map((word, i) => (
              <li key={i}>{word.definitions.split(";").join("; ")}</li>
            ))}
            pronunciation={def[0].pronunciation}
            range={selectedRange}
            buttonText={"Add to Word List"}
          />
        )}
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
