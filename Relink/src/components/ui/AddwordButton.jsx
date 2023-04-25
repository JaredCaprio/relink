import React, { useState } from "react";

export default function AddwordButton({
  fullDef,
  defaultText = "Add to Word List",
}) {
  const [moddedButtonText, setModdedButtonText] = useState(defaultText);

  const addWord = () => {
    const toolTipWordData = {
      chineseCharacters: fullDef.simplified,
      pinYin: fullDef.pronunciation,
      definition: fullDef.definitions.split(";").join("; "),
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
  );
}
