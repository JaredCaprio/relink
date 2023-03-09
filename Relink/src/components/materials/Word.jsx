import React from "react";

export default function Word({ value1, value2, value3, value4 }) {
  return (
    <div className="list__item">
      <div className="list__item-word">
        <p className="list__item-zh">{value1}</p>
        <p>{value2}</p>
      </div>
      <div className="list__item-def">{value3}</div>
      <div className="list__item-hsk">{value4}</div>
    </div>
  );
}
