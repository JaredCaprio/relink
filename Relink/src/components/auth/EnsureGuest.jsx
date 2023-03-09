import React from "react";
import { useAuth } from "./UserContext";
import { Navigate } from "react-router-dom";
export default function ensureGuest({ children }) {
  const auth = useAuth();

  if (auth) {
    return <Navigate to="/home" />;
  }
  return children;
}
