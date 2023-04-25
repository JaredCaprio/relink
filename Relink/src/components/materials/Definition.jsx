import React from "react";
import AddwordButton from "../ui/AddwordButton";

export default function Word({ simp, pinyin, def, fullDef }) {
  return (
    <div className="list__item">
      <div className="list__item-title-container">
        <div className="list__item-title">{simp}</div>
        <div className="list__item-pinyin ">{pinyin}</div>
      </div>
      <div className="list__item-def">{def}</div>
      <div className="list__item-hsk">
        <AddwordButton fullDef={fullDef} />
      </div>
    </div>
  );
}
