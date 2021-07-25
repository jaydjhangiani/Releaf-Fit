import React, { useEffect, useState } from "react";
import { SetCookie, DeleteCookie, hasCookie } from "./utility/CookieManager";
import Dashboard from "./components/Dashboard";
import Authenticate from "./components/Authenticate";
import Navbar from "./components/Navbar";

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
