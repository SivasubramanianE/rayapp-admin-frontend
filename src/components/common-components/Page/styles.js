import styled from "styled-components";
import theme from "../../../styles/theme";

export const Page = styled.div`
  width: calc(100% - 300px);
  height: 100%;
  position: relative;

  ${theme.media.mobile}, ${theme.media.portrait} {
    width: 100%;
  }
`;

export const PageContent = styled.div`
  position: relative;
  height: calc(100% - 64px);
  width: 100%;
`;
