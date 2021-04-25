import styled from "styled-components";
import theme from "../../../styles/theme";

export const PageHeaderWrapper = styled.div`
  position: relative;
  width: calc(100% - 6rem);
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
      top: 1rem;
      right: 1rem;
      cursor: pointer;
    }
    padding: 0 1rem;
    width: calc(100% - 2rem);
  }
`;
