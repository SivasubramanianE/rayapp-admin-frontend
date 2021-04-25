import styled from "styled-components";
import theme from "../../../styles/theme";

export const PageHeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 63px;
  background-color: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.textOnSurface}1D;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;

  .hamburger-icon {
    display: none;
  }

  ${theme.media.mobile}, ${theme.media.portrait} {
    .hamburger-icon {
      display: block;
      position: absolute;
      top: 1.4rem;
      right: 1rem;
      cursor: pointer;
    }
    padding: 0 1rem;
    width: 100%;
  }
`;
