import React, { useEffect, useState } from "react";
import { MyReleasesWrapper } from "./styles";
import { Table } from "antd";
import axios from "axios";
import moment from "moment";
import Loader from "../common-components/Loader";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileDoneOutlined,
  FormOutlined,
  RollbackOutlined,
  UploadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import routes from "../../routes/routes";
import { useHistory } from "react-router";

const getStatusIcon = (status) => {
  switch (status) {
    case "Draft":
      return <FormOutlined />;
    case "Submitted":
      return <UploadOutlined />;
    case "Approved":
      return <FileDoneOutlined />;
    case "Released":
      return <CheckCircleOutlined />;
    case "Rejected":
      return <CloseCircleOutlined />;
    case "ReSubmitted":
      return <RollbackOutlined />;

    default:
      return null;
  }
};

export default function MyReleases() {
  const [pageLoading, setPageLoading] = useState(true);
  const [releaseList, setReleaseList] = useState([]);

  const history = useHistory();

  const getDraftAlbums = () =>
    axios.get("/albums", { params: { status: "Draft" } });

  useEffect(() => {
    setPageLoading(true);
    getDraftAlbums()
      .then((response) => {
        const albums = response.data.data;

        if (albums.length) {
          setReleaseList(albums);
        }
      })
      .finally(() => {
        setPageLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  const editAlbum = (album) => {
    history.push(routes.editRelease + "/" + album._id);
  };

  const columns = [
    {
      title: "Release Title",
      dataIndex: "title",
      render: (text) => (
        <div className="release-meta">
          <div className="release-title">{text}</div>
        </div>
      ),
    },
    {
      title: "Primary Artist",
      dataIndex: "primaryArtist",
      render: (primaryArtist) => primaryArtist,
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (releaseDate) => moment(releaseDate).format("MMMM Do YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <div>
          {getStatusIcon(status)}
          &nbsp;{status}
        </div>
      ),
    },
    {
      title: "Actions",
      render: (album) => (
        <div className="release-actions">
          <div className="action-button">
            {album.status === "Draft" || album.status === "ReSubmitted" ? (
              <span onClick={() => editAlbum(album)}>
                <EditOutlined />
                &nbsp;Edit
              </span>
            ) : null}
          </div>
        </div>
      ),
    },
  ];

  if (pageLoading) {
    return (
      <MyReleasesWrapper>
        <Loader />
      </MyReleasesWrapper>
    );
  }

  return (
    <MyReleasesWrapper>
      <Table
        columns={columns}
        dataSource={releaseList}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 960 }}
      />
    </MyReleasesWrapper>
  );
}
