import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import AddwordButton from "../ui/AddwordButton";

export default function Tippytooltip({ word, isknown }) {
  const [def, setDef] = useState({});

  const fetchDef = () => {
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/words/define/${word}`)
      .then((res) => res.json())
      .then((data) => {
        setDef(data[0]);
      })
      .catch((error) => {
        setDef("No word found");
        console.log(error);
      });
  };

  return (
    <Tippy
      appendTo={document.body}
      interactive={true}
      onShown={fetchDef}
      placement={"top"}
      content={
        <div>
          {def ? (
            <>
              <h2>{word}</h2>
              <h3>{def.pronunciation}</h3>
              <p>{def && def.definitions?.split(";").join("; ")}</p>
              {isknown ? null : <AddwordButton fullDef={def} />}
            </>
          ) : (
            <p>No Word Found</p>
          )}
        </div>
      }
    >
      <span>
        <span className={!isknown ? "unknown-word" : "known-word"}>{word}</span>{" "}
      </span>
    </Tippy>
  );
}
