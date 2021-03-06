import React, { useEffect } from "react";
import { NavButton, NavigationWrapper } from "./styles";
import {
  CloseOutlined,
  FundFilled,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { getLoggedInUser } from "../../../utils/auth";
import routes from "../../../routes/routes";

export default function Navigation({
  navigationExpanded,
  setNavigationExpanded,
  activeNav,
  setActiveNav,
  setPageTitle,
}) {
  const history = useHistory();
  const location = useLocation();

  const user = getLoggedInUser();

  const navigation = [
    {
      id: 1,
      title: "All Releases",
      icon: <FundFilled />,
      route: routes.allReleases,
    },
    {
      id: 2,
      title: "Anaytics",
      icon: <FundFilled />,
      route: routes.analytics,
      disabled: true,
    },
  ];

  const changeActiveNav = (nav) => {
    if (location.pathname === "/" || nav.disabled === true) return;
    setActiveNav(nav.id);
    let activeNavObject = navigation.find((n) => n.id === nav.id);
    history.push(activeNavObject.route);
    setPageTitle(activeNavObject.title);

    const mobileMedia = window.matchMedia("only screen and (max-width:960px)");
    const portraitMedia = window.matchMedia("(orientation: portrait)");

    if (mobileMedia.matches || portraitMedia.matches) {
      setNavigationExpanded(false);
    }
  };

  useEffect(() => {
    let path = location.pathname;
    let activeMenu = navigation.find((nav) => nav.route === path);

    if (activeMenu) {
      setActiveNav(activeMenu.id);
      setPageTitle(activeMenu.title);
    }
    //eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (window.visualViewport.width < 960) setNavigationExpanded(false);
    // eslint-disable-next-line
  }, []);

  return navigationExpanded === true ? (
    <NavigationWrapper>
      <div className="navigation-header">
        <div
          className="hamburger-icon"
          onClick={() => setNavigationExpanded(false)}
        >
          <CloseOutlined />
        </div>
        <div className="logo-container">
          <img
            src="https://www.rayapprelease.com/assets/images/logo-main.png"
            alt="RayApp Release"
          ></img>
          <div className="logo-text">Admin</div>
        </div>

        <div className="button-wrapper">
          {navigation.map((n) => {
            return (
              <NavButton
                active={activeNav === n.id}
                onClick={() => changeActiveNav(n)}
                disabled={
                  location.pathname === routes.root || n.disabled === true
                }
              >
                {n.icon}&nbsp;&nbsp;{n.title}
              </NavButton>
            );
          })}
        </div>
      </div>
      {user._id && (
        <div className="user-details">
          Logged in as
          <span className="name">&nbsp;{user.name}</span>
        </div>
      )}
    </NavigationWrapper>
  ) : null;
}
