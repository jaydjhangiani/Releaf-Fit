import React from "react";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState({ haslogin: false, accessToken: "" });

  const getUser = (u) => {
    setUser(u);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;

export { UserContextProvider };
