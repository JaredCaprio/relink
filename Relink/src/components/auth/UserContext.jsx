import { useContext, useState, useEffect, createContext } from "react";

export const userDataContext = createContext();

export const useAuth = () => {
  return useContext(userDataContext);
};

export default function UserContext({ children }) {
  const [userData, setUserData] = useState({});
  const authUser = () => {
    useEffect(() => {
      fetch(`${import.meta.env.VITE_HOSTNAME}/auth/api/user`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.log(err));
    }, []);
  };
  authUser();

  return (
    <userDataContext.Provider value={userData}>
      {children}
    </userDataContext.Provider>
  );
}
