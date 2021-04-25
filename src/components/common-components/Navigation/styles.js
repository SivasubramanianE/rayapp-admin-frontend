import styled from "styled-components";
import theme from "../../../styles/theme";

export const NavigationWrapper = styled.div`
  width: 300px;
  height: 100%;
  background-color: ${theme.colors.surface};
  border-right: 1px solid ${theme.colors.textOnSurface}1D;
  z-index: calc(${theme.baseZIndex} + 1);

  ${theme.media.mobile}, ${theme.media.portrait} {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    border-right: none;
  }

  .navigation-header {
    height: 72px;
    width: calc(100% - 4rem);
    padding: 2rem;
    position: relative;

    .logo-container {
      display: flex;
      width: 120px;
      flex-direction: column;
      align-items: center;

      img {
        width: 120px;
        height: auto;
        image-rendering: -moz-crisp-edges; /* Firefox */
        image-rendering: -o-crisp-edges; /* Opera */
        image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
      }

      .logo-text {
        font-size: small;
        font-weight: medium;
        color: ${theme.colors.textOnSurface};
      }
    }

    .button-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 3rem;
    }
  }

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

    animation: slideIn 0.2s forwards;

    @keyframes slideIn {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
`;

export const NavButton = styled.div`
  border-radius: ${theme.button.borderRadius};
  margin: 4px 0;
  min-width: 12rem;
  max-width: 15rem;
  padding: 14px 16px;
  text-align: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.1s ease-in-out;

  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) =>
    active ? theme.colors.textOnAccent : theme.colors.textOnSurface};
  box-shadow: ${({ active }) =>
    active ? "-1px 2px 8px -1px rgba(0, 0, 0, 0.2)" : "none"};
  background-color: ${({ active }) =>
    active ? theme.colors.accent : "transparent"};
`;
