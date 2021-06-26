import React from "react";
import styled from "styled-components";
import releafLogo from "../assets/img/releaf.jpeg";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { SetCookie, DeleteCookie, hasCookie } from "../utility/CookieManager";

const Navbar = ({ user, setUser }) => {
  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };
  const handleLogoutSuccess = (response) => {
    setUser({ haslogin: false, accessToken: "" });
    DeleteCookie([
      "accessToken",
      "email",
      "givenName",
      "familyName",
      "imageUrl",
      "name",
      "googleId",
    ]);
    console.log(user);
  };
  return (
    <Nav>
      <NavLink to="/">
        <NavImg src={releafLogo} alt="Releaf" />
      </NavLink>
      <NavText>Releaf Fit beta</NavText>
      <NavMenu>
        {user.haslogin && (
          <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogoutSuccess}
            onFailure={handleLogoutFailure}
          ></GoogleLogout>
        )}
      </NavMenu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  /* background: #16B0FE; */
  background: #14a7f3;
  height: 80px;
  display: flex;
  justify-content: space-between;
  /* padding: 0.5rem calc((100vw - 1000px) / 2); */
  padding: 2rem;
  z-index: 10;
  @media screen and (max-width: 768px) {
    padding: 0rem;
    height: 80px;
  }
`;

const NavText = styled.h1`
  /* margin-right: 2rem; */
  display: flex;
  align-items: center;
  color: white;
  font-family: "Josefin Sans", sans-serif;
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

const NavImg = styled.img`
  width: 70px;
  display: block;
  border-radius: 50%;
  margin-right: 100px;
  @media screen and (max-width: 480px) {
    margin-right: 10px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  /* margin-right: -24px; */
  /* margin-left: -120px; */
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  /* color: #14a7f3; */
  color: white;
  /* font-weight: 600; */
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  //margin-left: -50px;
  cursor: pointer;
  &:active {
    color: #01579b;
  }
  &:hover {
    color: #01579b;
    transition: 0.2s ease-in-out;
  }
`;
