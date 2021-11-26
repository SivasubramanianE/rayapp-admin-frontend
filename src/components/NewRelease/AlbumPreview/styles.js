import styled from "styled-components";
import theme from "../../../styles/theme";

export const AlbumPreviewWrapper = styled.div`
  padding: 16px;

  .ant-image {
    border-radius: ${theme.container.borderRadius};
    overflow: hidden;

    ${theme.media.mobile}, ${theme.media.portrait} {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .ant-descriptions-view {
    border-radius: ${theme.container.borderRadius};
    background-color: ${theme.colors.surface};
    box-shadow: -1px 2px 8px -1px rgb(0 0 0 / 10%);
  }

  .section-heading {
    color: ${theme.colors.accent};
    margin: 24px 0;
    font-size: large;
    font-weight: normal;
  }

  .album-descriptions {
    .detail-label {
      font-weight: 450;
    }
    .ant-descriptions-view {
      border-radius: ${theme.container.borderRadius};
      background-color: ${theme.colors.surface};
      box-shadow: none;
    }
  }
`;
