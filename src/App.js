import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { SetCookie, DeleteCookie, hasCookie } from "./utility/CookieManager";
import Dashboard from "./components/Dashboard";
import Authenticate from "./components/Authenticate";
import Navbar from "./components/Navbar";
import UserContext from "./context/UserContext";

export default function App() {
  const [user, setUser] = useState({ haslogin: false, accessToken: "" });
  useEffect(() => {
    const cookieObject = hasCookie();
    if (cookieObject.haslogin) {
      setUser({
        ...cookieObject,
      });
    }
    console.log(user);
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      {user.haslogin ? (
        <Dashboard user={user} />
      ) : (
        <Authenticate user={user} setUser={setUser} />
      )}
    </div>
  );
}
