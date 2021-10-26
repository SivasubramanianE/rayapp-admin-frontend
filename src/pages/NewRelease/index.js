import React from "react";
import { useHistory } from "react-router-dom";
import NewRelease from "../../components/NewRelease";
import useTitle from "../../hooks/useTitle";
import routes from "../../routes/routes";
import { isLoggedIn } from "../../utils/auth";

export default function NewReleasepage() {
  useTitle("New Release");

  const history = useHistory();
  if (!isLoggedIn()) {
    history.push(routes.root);
    return null;
  }

  return <NewRelease></NewRelease>;
}
