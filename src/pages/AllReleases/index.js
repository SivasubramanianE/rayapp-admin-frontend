import React from "react";
import { useHistory } from "react-router-dom";
import AllReleases from "../../components/AllReleases";
import useTitle from "../../hooks/useTitle";
import routes from "../../routes/routes";
import { isLoggedIn } from "../../utils/auth";

export default function AllReleasesPage() {
  useTitle("Admin");

  const history = useHistory();
  if (!isLoggedIn()) {
    history.push(routes.root);
    return null;
  }

  return <AllReleases></AllReleases>;
}
