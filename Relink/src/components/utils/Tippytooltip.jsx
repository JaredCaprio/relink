import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function Tippytooltip({
  word,
  isknown,
  defaultText = "Add to Word List",
}) {
  const [def, setDef] = useState({});
  const [moddedButtonText, setModdedButtonText] = useState(defaultText);

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

  const addWord = () => {
    const toolTipWordData = {
      chineseCharacters: def.simplified,
      pinYin: def.pronunciation,
      definition: def.definitions.split(";").join("; "),
    };

    if (Object.values(toolTipWordData).every((value) => !value)) {
      return;
    }
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/words/add`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(toolTipWordData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setModdedButtonText("Word Added");
          setTimeout(() => {
            setModdedButtonText(defaultText);
          }, 1750);
        } else {
          setModdedButtonText("Word Already Added");
          setTimeout(() => {
            setModdedButtonText(defaultText);
          }, 1750);
        }
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
              <button
                onClick={addWord}
                className={
                  moddedButtonText === "Word Already Added"
                    ? "btn fixed-width error"
                    : moddedButtonText === "Word Added"
                    ? "btn fixed-width success"
                    : "btn fixed-width "
                }
              >
                <span>{moddedButtonText} </span>
                <i
                  className="fa-solid fa-plus"
                  title="Add Material"
                  style={{ fontSize: ".75rem" }}
                ></i>
              </button>
            </>
          ) : (
            <p>No Word Found</p>
          )}
        </div>
      }
    >
      <span className={!isknown ? "unknown-word" : "known-word"}>{word}</span>
    </Tippy>
  );
}
