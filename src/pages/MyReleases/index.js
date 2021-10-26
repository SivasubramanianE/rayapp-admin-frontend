import React from "react";
import { useHistory } from "react-router-dom";
import MyReleases from "../../components/MyReleases";
import useTitle from "../../hooks/useTitle";
import routes from "../../routes/routes";
import { isLoggedIn } from "../../utils/auth";

export default function MyReleasesPage() {
  useTitle("Your Releases");

  const history = useHistory();
  if (!isLoggedIn()) {
    history.push(routes.root);
    return null;
  }

  return <MyReleases></MyReleases>;
}
