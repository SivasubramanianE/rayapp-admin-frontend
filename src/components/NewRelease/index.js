import React from "react";
import { Steps, Button, message } from "antd";
import { StepperFormWrapper } from "./styles";
import BasicInfoForm from "./BasicInfoForm";

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
        {current === 0 && <BasicInfoForm nextStep={next} />}
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </StepperFormWrapper>
  );
}
