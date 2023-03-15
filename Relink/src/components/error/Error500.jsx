import React from "react";

export default function Error500() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>500 - Internal Server Error</h1>
      <img
        src="https://res.cloudinary.com/caprio-web-dev/image/upload/v1678815106/Relink/error-animation_wofguu.gif"
        alt=""
      />
    </div>
  );
}
