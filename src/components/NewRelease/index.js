import React, { useEffect, useState } from "react";
import { Steps, notification } from "antd";
import { StepperFormWrapper } from "./styles";
import BasicInfoForm from "./BasicInfoForm";
import TrackList from "./TrackList";
import { PrimaryButton } from "../common-components/PrimaryButton/styles";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Loader from "../common-components/Loader";
import routes from "../../routes/routes";
import AlbumPreview from "./AlbumPreview";

const { Step } = Steps;

const steps = [
  {
    id: 0,
    title: "Basic Info",
  },
  {
    id: 1,
    title: "Track List",
  },
  {
    id: 2,
    title: "Review",
  },
];

export default function NewRelease() {
  const [current, setCurrent] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const [album, setAlbum] = useState({
    title: null,
    primaryArtist: null,
    language: null,
    mainGenre: null,
    subGenre: null,
    releaseDate: null,
  });

  const [tracks, setTracks] = useState([]);

  const history = useHistory();

  const { albumId } = useParams();

  const getAlbumDetails = () => axios.get("/albums/" + albumId);

  useEffect(() => console.log("album updated", album), [album]);

  useEffect(() => {
    if (!albumId) return;

    setLoading(true);
    getAlbumDetails()
      .then((response) => {
        const album = response.data.data;
        if (album.artUrl)
          album.artUrl = album.artUrl + "&version=" + +new Date();
        setAlbum(album);
        setTracks(album.songs);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  const submitAlbum = () => {
    axios
      .patch("/albums/" + albumId + "/submit")
      .then(() => {
        notification.success({
          message: "Album submitted for review",
        });
        history.push(routes.myReleases);
      })
      .catch((error) => {
        notification.error({
          message: "Error submitting release",
          description: error.response.data.error,
        });
      });
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    const createAlbum = () => axios.post("/albums");

    if (!albumId) {
      setLoading(true);
      createAlbum()
        .then((response) => {
          const album = response.data.data.albumInfo;
          history.push("/edit-release/" + album._id);
        })
        .catch((error) => {
          notification.error({
            message: "Too many drafts",
            description:
              "Looks like you already have a couple of drafts in your library. Please clear or edit the existing ones.",
          });
          history.push(routes.myReleases);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <StepperFormWrapper>
        <Loader />
      </StepperFormWrapper>
    );

  if (!albumId) return null;

  return (
    <StepperFormWrapper>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        {current === 0 && (
          <BasicInfoForm
            nextStep={next}
            albumId={albumId}
            album={album}
            setAlbum={setAlbum}
          />
        )}
        {current === 1 && (
          <TrackList albumId={albumId} tracks={tracks} setTracks={setTracks} />
        )}
        {current === 2 && <AlbumPreview album={album} tracks={tracks} />}
      </div>
      <div className="steps-action">
        {current > 0 && (
          <PrimaryButton style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </PrimaryButton>
        )}
        {current > 0 && current < steps.length - 1 && (
          <PrimaryButton
            type="primary"
            onClick={() => next()}
            disabled={
              !tracks.length ||
              !tracks.every((track) => {
                console.log(track.title);
                return (
                  track.title !== undefined &&
                  track.title !== null &&
                  track.title !== ""
                );
              })
            }
          >
            Next
          </PrimaryButton>
        )}
        {current === steps.length - 1 && (
          <PrimaryButton type="primary" onClick={submitAlbum}>
            Publish
          </PrimaryButton>
        )}
      </div>
    </StepperFormWrapper>
  );
}
