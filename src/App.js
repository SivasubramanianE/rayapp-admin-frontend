import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./components/common-components/Navigation";
import NewReleasepage from "./pages/NewRelease";
import { Page, PageContent } from "./components/common-components/Page/styles";
import PageHeader from "./components/common-components/PageHeader";
import { useEffect, useState } from "react";
import theme from "./styles/theme";

function App() {
  const [navigationExpanded, setNavigationExpanded] = useState(true);

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
        ></Navigation>
        <Page>
          <PageHeader
            setNavigationExpanded={setNavigationExpanded}
          ></PageHeader>
          <PageContent>
            <Switch>
              <Route exact path="/">
                <NewReleasepage />
              </Route>
              <Route exact path="/new-release">
                <NewReleasepage />
              </Route>
            </Switch>
          </PageContent>
        </Page>
      </Router>
    </div>
  );
}

export default App;
