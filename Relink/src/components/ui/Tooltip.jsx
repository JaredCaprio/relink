import { useState, useEffect, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function Tooltip({
  definition,
  simplified,
  pronunciation,
  range,
  buttonText,
}) {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [moddedButtonText, setModdedButtonText] = useState("Add to Word List");
  const ref = useRef();
  useEffect(() => {
    if (range) {
      const tooltipRect = ref.current.getBoundingClientRect();
      const rect = range.getBoundingClientRect();
      if (rect.right >= document.documentElement.clientWidth / 2) {
        setTooltipPosition({
          top: rect.top,
          left: rect.left - tooltipRect.width,
        });
      } else {
        setTooltipPosition({
          top: rect.top,
          left: rect.left + rect.width,
        });
      }
    }
  }, [range]);

  const handleAddtoWordList = () => {
    const toolTipWordData = {
      chineseCharacters: simplified,
      pinYin: pronunciation,
      definition: definition[0].props.children,
    };
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/words/add`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toolTipWordData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setModdedButtonText("Word Added");
          setTimeout(() => {
            setModdedButtonText(buttonText);
          }, 1500);
        } else {
          setModdedButtonText("Word Already Added");
          setTimeout(() => {
            setModdedButtonText(buttonText);
          }, 1500);
        }
      });
  };

  return (
    range && (
      <div
        ref={ref}
        className="tooltip"
        style={{
          top: tooltipPosition.top + "px",
          left: tooltipPosition.left + "px",
        }}
      >
        <h5 style={{ fontSize: "1.5rem" }}>{simplified}</h5>
        <p>{pronunciation}</p>
        <p>{definition}</p>

        {buttonText && (
          <button
            onClick={handleAddtoWordList}
            className={
              moddedButtonText === "Word Already Added"
                ? "btn error"
                : moddedButtonText === "Word Added"
                ? "btn success"
                : "btn"
            }
          >
            {moddedButtonText}
            <i className="fa-solid fa-plus" title="Add Material"></i>
          </button>
        )}
      </div>
    )
  );
}
