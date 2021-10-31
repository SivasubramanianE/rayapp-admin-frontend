import React, { useEffect, useRef } from "react";
import { PrimaryButton } from "../common-components/PrimaryButton/styles";
import { LoginWrapper } from "./styles";
import { API_URL } from "../../utils/url";
import { useHistory } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import Cookies from "universal-cookie";
import routes from "../../routes/routes";
import {
  StyledInput,
  StyledPasswordInput,
} from "../common-components/Input/styles";
import axios from "axios";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const login = () =>
    axios
      .post("/users/login", {
        email: emailRef.current,
        password: passwordRef.current,
      })
      .then((response) => {
        let data = response.data.data;
        const userData = data.userInfo;
        const token = data.accessToken;

        setAuthCookies(token, userData);
        return history.push(routes.newRelease);
      });

  const onEmailChange = (e) => (emailRef.current = e.target.value);
  const onPasswordChange = (e) => (passwordRef.current = e.target.value);

  const history = useHistory();
  const cookies = new Cookies();

  const redirectToReleases = () => history.push(routes.newRelease);

  const setAuthCookies = (token, user) => {
    let now = new Date();
    let expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    let options = {
      path: "/",
      expires: expiry,
    };

    cookies.set("SSID", token, options);
    cookies.set("userId", user._id, options);
    cookies.set("userEmail", user.email, options);
    cookies.set("userName", user.name, options);
  };

  useEffect(() => {
    if (isLoggedIn()) {
      return redirectToReleases();
    } else {
      cookies.remove("SSID");
      cookies.remove("userId");
      cookies.remove("userEmail");
      cookies.remove("userName");

      history.push(routes.root);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoginWrapper>
      <div className="background-image"></div>
      <div className="login-container">
        <img
          src="https://www.rayapprelease.com/static/media/LogoHeader.b52f2b32.png"
          alt="RayApp Release"
          className="logo"
        ></img>
        Release Hub
        <div className="input-wrapper">
          <StyledInput
            type="email"
            onChange={onEmailChange}
            placeholder="E-Mail"
          ></StyledInput>
        </div>
        <div className="input-wrapper" type="password">
          <StyledPasswordInput
            onChange={onPasswordChange}
            placeholder="Password"
          ></StyledPasswordInput>
        </div>
        <PrimaryButton onClick={login}>Login</PrimaryButton>
        <div className="login-text">Please login to continue</div>
      </div>
    </LoginWrapper>
  );
}
