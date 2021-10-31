import React from "react";
import { Steps, message } from "antd";
import { StepperFormWrapper } from "./styles";
import BasicInfoForm from "./BasicInfoForm";
import TrackList from "./TrackList";
import { PrimaryButton } from "../common-components/PrimaryButton/styles";

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
  const [albumId, setAlbumId] = React.useState(null);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

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
            setAlbumId={setAlbumId}
          />
        )}
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
