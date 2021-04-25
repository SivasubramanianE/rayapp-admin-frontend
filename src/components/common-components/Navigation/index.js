import React, { useEffect, useState } from "react";
import { NavButton, NavigationWrapper } from "./styles";
import {
  CloseOutlined,
  FolderFilled,
  FundFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";

export default function Navigation({
  navigationExpanded,
  setNavigationExpanded,
  activeNav,
  setActiveNav,
}) {
  const history = useHistory();
  const location = useLocation();

  const navigation = [
    {
      id: 1,
      title: "New Release",
      icon: <PlusCircleFilled />,
      route: "/new-release",
    },
    {
      id: 2,
      title: "Your Releases",
      icon: <FolderFilled />,
      route: "/my-releases",
    },
    {
      id: 3,
      title: "Anaytics",
      icon: <FundFilled />,
      route: "/analytics",
    },
  ];

  const changeActiveNav = (id) => {
    setActiveNav(id);
    let activeNavObject = navigation.find((n) => n.id === id);
    history.push(activeNavObject.route);

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
    }
    //eslint-disable-next-line
  }, [location]);

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
            src="https://www.rayapprelease.com/static/media/LogoHeader.b52f2b32.png"
            alt="RayApp Release"
          ></img>
          <div className="logo-text">Release Hub</div>
        </div>

        <div className="button-wrapper">
          {navigation.map((n) => {
            return (
              <NavButton
                active={activeNav === n.id}
                onClick={() => changeActiveNav(n.id)}
              >
                {n.icon}&nbsp;&nbsp;{n.title}
              </NavButton>
            );
          })}
        </div>
      </div>
    </NavigationWrapper>
  ) : null;
}
