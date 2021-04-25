import React from "react";
import MyReleases from "../../components/MyReleases";
import useTitle from "../../hooks/useTitle";

export default function MyReleasesPage() {
  useTitle("Your Releases");

  return <MyReleases></MyReleases>;
}
