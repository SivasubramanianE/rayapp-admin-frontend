import React from "react";
import { useHistory } from "react-router-dom";
import ViewRelease from "../../components/ViewRelease";
import useTitle from "../../hooks/useTitle";
import routes from "../../routes/routes";
import { isLoggedIn } from "../../utils/auth";

export default function ViewReleasePage() {
  useTitle("Admin");

  const history = useHistory();
  if (!isLoggedIn()) {
    history.push(routes.root);
    return null;
  }

  return <ViewRelease></ViewRelease>;
}
