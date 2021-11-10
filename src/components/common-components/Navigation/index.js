import React, { useEffect } from "react";
import { NavButton, NavigationWrapper } from "./styles";
import {
  CloseOutlined,
  FolderFilled,
  FundFilled,
  PlusCircleFilled,
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
      title: "Your Releases",
      icon: <FolderFilled />,
      route: routes.myReleases,
    },
    {
      id: 2,
      title: "New Release",
      icon: <PlusCircleFilled />,
      route: routes.newRelease,
    },
    {
      id: 3,
      title: "Anaytics",
      icon: <FundFilled />,
      route: routes.analytics,
    },
  ];

  const changeActiveNav = (id) => {
    if (location.pathname === "/") return;
    setActiveNav(id);
    let activeNavObject = navigation.find((n) => n.id === id);
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
            src="https://www.rayapprelease.com/static/media/LogoHeader.b52f2b32.png"
            alt="RayApp Release"
          ></img>
          <div className="logo-text">Release Hubᴮᴱᵀᴬ</div>
        </div>

        <div className="button-wrapper">
          {navigation.map((n) => {
            return (
              <NavButton
                active={activeNav === n.id}
                onClick={() => changeActiveNav(n.id)}
                disabled={location.pathname === routes.root}
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
