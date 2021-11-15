import React, { useEffect } from "react";
import { Steps, message, notification } from "antd";
import { StepperFormWrapper } from "./styles";
import BasicInfoForm from "./BasicInfoForm";
import TrackList from "./TrackList";
import { PrimaryButton } from "../common-components/PrimaryButton/styles";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Loader from "../common-components/Loader";
import routes from "../../routes/routes";

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

  const history = useHistory();

  const { albumId } = useParams();

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
            message: "Too Many Drafts",
            description:
              "Looks like you already have a couple of drafts in your library. Please clear or edit the existing ones.",
          });
          history.push(routes.myReleases);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, []);

  if (!loading) {
    return (
      <StepperFormWrapper>
        <Loader />
      </StepperFormWrapper>
    );
  }

  return (
    <StepperFormWrapper>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        {current === 0 && <BasicInfoForm nextStep={next} albumId={albumId} />}
        {current === 1 && <TrackList albumId={albumId} />}
      </div>
      <div className="steps-action">
        {current > 0 && (
          <PrimaryButton style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </PrimaryButton>
        )}
        {current > 0 && current < steps.length - 1 && (
          <PrimaryButton type="primary" onClick={() => next()}>
            Next
          </PrimaryButton>
        )}
        {current === steps.length - 1 && (
          <PrimaryButton
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Publish
          </PrimaryButton>
        )}
      </div>
    </StepperFormWrapper>
  );
}
