import styled from "styled-components";
import theme from "../../styles/theme";

export const MyReleasesWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  .ant-pagination-item-link,
  .ant-pagination-item {
    border-radius: 50%;
  }

  .release-meta {
    display: flex;
    align-items: center;
    cursor: pointer;

    .release-title {
      display: inline-block;
      margin-left: 16px;
      color: ${theme.colors.accent};
    }
  }

  .release-actions {
    .action-button {
      display: inline-block;
      color: ${theme.colors.accent};
      cursor: pointer;
      margin: 0 4px;
    }

    .danger {
      color: red;
    }
  }

  ${theme.media.mobile}, ${theme.media.portrait} {
    .ant-table-cell {
      font-size: small;
    }
  }
`;
