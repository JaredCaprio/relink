import React from "react";
import { useAuth } from "./UserContext";
import { Navigate } from "react-router-dom";
export default function ensureAuth({ children }) {
  const auth = useAuth();
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
}
