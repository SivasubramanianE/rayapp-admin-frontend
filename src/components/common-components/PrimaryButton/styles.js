import { Button } from "antd";
import styled from "styled-components";
import theme from "../../../styles/theme";

export const PrimaryButton = styled(Button)`
  padding: 1.2rem;
  border-radius: ${theme.button.borderRadius};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
