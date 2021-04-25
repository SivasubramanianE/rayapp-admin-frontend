import React, { useState } from "react";
import { NavButton, NavigationWrapper } from "./styles";
import { MenuOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export default function Navigation({
  navigationExpanded,
  setNavigationExpanded,
}) {
  const history = useHistory();

  const [activeNav, setActiveNav] = useState(1);

  const navigation = [
    { id: 1, title: "New Release", route: "/new-release" },
    { id: 2, title: "Your Releases", route: "/your-releases" },
    { id: 3, title: "Anaytics", route: "/analytics" },
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

  return navigationExpanded === true ? (
    <NavigationWrapper>
      <div className="navigation-header">
        <div
          className="hamburger-icon"
          onClick={() => setNavigationExpanded(false)}
        >
          <MenuOutlined></MenuOutlined>
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
                {n.title}
              </NavButton>
            );
          })}
        </div>
      </div>
    </NavigationWrapper>
  ) : null;
}
