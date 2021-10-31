import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./components/common-components/Navigation";
import NewReleasepage from "./pages/NewRelease";
import { Page, PageContent } from "./components/common-components/Page/styles";
import PageHeader from "./components/common-components/PageHeader";
import { useEffect, useState } from "react";
import MyReleasesPage from "./pages/MyReleases";
import LoginPage from "./pages/Login";
import axios from "axios";
import { API_URL } from "./utils/url";

axios.defaults.baseURL = API_URL;

function App() {
  const [navigationExpanded, setNavigationExpanded] = useState(true);
  const [activeNav, setActiveNav] = useState(0);
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {

    const mobileMedia = window.matchMedia("only screen and (max-width:960px)");
    const portraitMedia = window.matchMedia("(orientation: portrait)");

    const onMediaChange = () => {
      setNavigationExpanded(true);
    };

    mobileMedia.addEventListener("change", onMediaChange);
    portraitMedia.addEventListener("change", onMediaChange);

    return () => {
      mobileMedia.removeEventListener("change", onMediaChange);
      portraitMedia.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation
          navigationExpanded={navigationExpanded}
          setNavigationExpanded={setNavigationExpanded}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          setPageTitle={setPageTitle}
        ></Navigation>
        <Switch>
          <Page>
            <PageHeader
              setNavigationExpanded={setNavigationExpanded}
              pageTitle={pageTitle}
            ></PageHeader>
            <PageContent>
              <Route exact path="/">
                <LoginPage setPageTitle={setPageTitle} />
              </Route>
              <Route exact path="/new-release">
                <NewReleasepage />
              </Route>
              <Route exact path="/my-releases">
                <MyReleasesPage />
              </Route>
            </PageContent>
          </Page>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
