import styled from "styled-components";
import loginBg from "../../assets/login-bg.jpg";
import theme from "../../styles/theme";

export const LoginWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .background-image {
    position: absolute;
    height: 100%;
    width: 100%;
    background: url("${loginBg}");
    background-size: cover;

    :after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: #ffffff;
      opacity: 0.1;
      transition: all 1s;
      -webkit-transition: all 1s;
    }
  }

  .login-container {
    padding: 36px;
    z-index: calc(${theme.baseZIndex} + 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    border-radius: ${theme.container.borderRadius};
    box-shadow: 2px 1px 6px 0px rgba(0, 0, 0, 0.02);
    color: #ffffffD9;

    .login-text {
      margin-top: 4px;
      font-size: x-small;
    }

    .g-icon {
      width: 16px;
      margin-right: 4px;
    }

    .logo {
      width: 160px;
      opacity: 0.9;
    }

    .ant-btn {
      margin: 4px 0;
    }
  }

  .input-wrapper {
    margin: 4px 0;
    width: 100%;
  }
`;
