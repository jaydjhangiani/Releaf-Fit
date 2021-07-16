import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { SiGooglefit } from "react-icons/si";
import img from "../assets/img/releaf.jpeg";
import GoogleLogin from "react-google-login";
import { hasCookie, SetCookie } from "../utility/CookieManager";

export default function Authenticate({ user, setUser }) {
  const handleLoginSuccess = (response) => {
    console.log(response.mc.access_token);
    if (response.mc.access_token) {
      setUser({
        ...response.profileObj,
        haslogin: true,
        accessToken: response.mc.access_token,
      });

      SetCookie({
        ...response.profileObj,
        accessToken: response.mc.access_token,
      });
      console.log(user);
    }
  };

  const handleLoginFailure = (response) => {
    console.log("failure");
  };
  return (
    <Container>
      <LoginContainer>
        <Logo src={img} />
        <LoginHeading>
          Authenticate with {<SiGooglefit />} to access resources
        </LoginHeading>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Authenticate"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
          scope={
            "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.sleep.read  "
          }
        />
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 40%;
  margin: 0 auto;
`;

const LoginContainer = styled.div`
  padding: 50px;
  opacity: 0.8;
  align-items: center;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  border: 2px solid #53b9f7;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  @media screen and (max-width: 760px) {
    padding: 20px;
  }
`;

const LoginHeading = styled.h3`
  margin-bottom: 30px;
  text-align: center;
`;

const Logo = styled.img`
  height: 300px;
  width: 300px;
`;
