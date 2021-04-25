import styled from "styled-components";
import theme from "../../styles/theme";

export const StepperFormWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 3rem 10rem;

  .ant-steps-item-content {
    display: inline-flex;
    align-items: center;

    .ant-steps-item-title {
      font-size: small;
      font-weight: 500;
    }
  }

  .steps-action {
    float: right;
  }

  ${theme.media.mobile}, ${theme.media.portrait} {
    padding: 3rem 1rem;
  }
`;
