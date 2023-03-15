import React from "react";

export default function Error404() {
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
      <h1>404 - Resource Not Found</h1>
      <img
        src="https://res.cloudinary.com/caprio-web-dev/image/upload/v1678815106/Relink/error-animation_wofguu.gif"
        alt=""
      />
    </div>
  );
}
