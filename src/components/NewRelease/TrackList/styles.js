import styled from "styled-components";
import theme from "../../../styles/theme";

export const TrackListWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 1rem;

  .ant-list-item {
    background-color: ${theme.colors.surface};
    border: none;
    margin: 1.5rem 0;
    border-radius: 8px;
    box-shadow: -1px 2px 8px -1px rgb(0 0 0 / 10%);

    .edit-link {
      cursor: pointer;
    }
  }

  .add-link {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    opacity: 0.6;
    cursor: pointer;

    :hover {
      opacity: 1;
    }
  }
`;
