import React from "react";

export default function Searchbar({ onChangeFunc, initValue, placeholder }) {
  return (
    <div className="searchbar">
      <label htmlFor="searchbar__label">
        <i className="fa-solid fa-magnifying-glass"></i>
      </label>
      <input
        type="text"
        id="search-input"
        className="searchbar__input"
        placeholder={placeholder}
        value={initValue}
        onChange={onChangeFunc}
      />
    </div>
  );
}
