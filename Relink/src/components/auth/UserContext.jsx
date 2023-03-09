import { useContext, useState, useEffect, createContext } from "react";

export const userDataContext = createContext();

export default function UserContext({ children }) {
  const [userData, setUserData] = useState();
  useEffect(() => {
    fetch("http://localhost:8080/auth/api/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <userDataContext.Provider value={userData}>
      {children}
    </userDataContext.Provider>
  );
}
