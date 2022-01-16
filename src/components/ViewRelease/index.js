import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import axios from "axios";

import AlbumPreview from "../NewRelease/AlbumPreview";
import Loader from "../common-components/Loader";

const albumSchema = {
  title: null,
  primaryArtist: null,
  secondaryArtist: null,
  language: null,
  mainGenre: null,
  subGenre: null,
  releaseDate: null,
  productionYear: null,
  label: null,
  UPC: null,
  songs: [],
};

export default function ViewRelease() {
  const [loading, setLoading] = React.useState(true);

  const [album, setAlbum] = useState(albumSchema);

  const [tracks, setTracks] = useState([]);

  const { albumId } = useParams();

  const getAlbumDetails = () => axios.get("/admin/albums/" + albumId);

  useEffect(() => console.log("album updated", album), [album]);

  useEffect(() => {
    if (!albumId) return;

    setLoading(true);
    getAlbumDetails()
      .then((response) => {
        let album = response.data.data;
        if (album.artUrl)
          album.artUrl = album.artUrl + "&version=" + +new Date();
        if (album.title === undefined) album = { ...albumSchema, ...album };
        setAlbum(album);
        setTracks(album.songs);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }
  return <AlbumPreview album={album} tracks={tracks} />;
}
