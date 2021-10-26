import React, { useEffect } from "react";
import { PrimaryButton } from "../common-components/PrimaryButton/styles";
import { LoginWrapper } from "./styles";
import gIcon from "../../assets/G_icon.svg";
import { API_URL } from "../../utils/url";
import { useHistory } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import Cookies from "universal-cookie";
import routes from "../../routes/routes";

export default function Login() {
  const openLogin = () =>
    (window.location.href = API_URL + "/rest/v1/auth/google");

  const history = useHistory();
  const cookies = new Cookies();

  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  //API reponse parameters
  const status = params.get("status");
  const userData = JSON.parse(params.get("user_data"));
  const token = params.get("token");

  const loginSuccess = () => {
    setAuthCookies(token, userData);
    return history.push(routes.newRelease);
  };

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
    cookies.set("userGivenName", user.name.givenName, options);
    cookies.set("userFamilyName", user.name.familyName, options);
    cookies.set("userDisplayPicture", user.display_picture, options);
  };

  useEffect(() => {
    if (status === "SUCCESS") return loginSuccess();

    if (isLoggedIn()) {
      return redirectToReleases();
    } else {
      cookies.remove("SSID");
      cookies.remove("userId");
      cookies.remove("userEmail");
      cookies.remove("userGivenName");
      cookies.remove("userFamilyName");
      cookies.remove("userDisplayPicture");

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
        <PrimaryButton onClick={openLogin}>
          <img alt="google login" className="g-icon" src={gIcon}></img>Login
          with Google
        </PrimaryButton>
        <div className="login-text">Please login to continue</div>
      </div>
    </LoginWrapper>
  );
}
