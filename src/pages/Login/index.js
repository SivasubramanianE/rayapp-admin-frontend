import React, { useEffect } from "react";
import Login from "../../components/Login";
import useTitle from "../../hooks/useTitle";

export default function LoginPage({ setPageTitle }) {
  useTitle("Login");

  useEffect(() => {
    setPageTitle("Login");
  });

  return <Login />;
}
