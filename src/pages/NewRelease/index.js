import React from "react";
import NewRelease from "../../components/NewRelease";
import useTitle from "../../hooks/useTitle";

export default function NewReleasepage() {
  useTitle("New Release");
  
  return <NewRelease></NewRelease>;
}
