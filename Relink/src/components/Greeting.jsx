import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./auth/UserContext";

export default function Greeting() {
  const [userLocale, setUserLocale] = useState();
  const userData = useAuth();

  useEffect(() => {
    axios
      .get(`https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_KEY}`)
      .then((response) => {
        setUserLocale(response.data.country);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(Date.now());
  const localCurrentDate = date.toLocaleString(userLocale, dateOptions);
  return (
    <div className="greeting">
      <h4>{localCurrentDate}</h4>
      <h1>Welcome {userData?.firstName}!</h1>
    </div>
  );
}
