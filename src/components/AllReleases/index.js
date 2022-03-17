import React, { useEffect, useRef, useState } from "react";
import { AdminReleaseListWrapper } from "./styles";
import { notification, Table, Input, Button, Space, message } from "antd";
import axios from "axios";
import moment from "moment";
import Loader from "../common-components/Loader";
import Highlighter from "react-highlight-words";
import { StyledSelect } from "../common-components/Select/styles";
import { Option } from "antd/lib/mentions";

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import routes from "../../routes/routes";
import { useHistory } from "react-router";

const StatusArr = [
  "Draft",
  "Submitted",
  "Approved",
  "Released",
  "SentToStores",
  "TakenDown",
  "ReSubmitted",
];

export default function AllReleases() {
  const [tableLoading, setTableLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [releaseList, setReleaseList] = useState([]);
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const searchInput = useRef();

  const history = useHistory();

  const getAllReleases = (limit, offset) => {
    setTableLoading(true);
    (limit && offset
      ? axios.get("/admin/albums", { params: { limit: limit, offset: offset } })
      : axios.get("/admin/albums")
    )
      .then((response) => {
        let albums = response.data.data.albums;

        if (albums.length) {
          albums = albums.map((a) => {
            a.uploadedBy = a.user[0].name;
            a.creatorEmail = a.user[0].email;
            return a;
          });
          setReleaseList(albums);
          setTotalCount(response.data.data.totalCount);
        } else {
          setReleaseList([]);
        }
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  useEffect(() => {
    getAllReleases(10, 0);
    // eslint-disable-next-line
  }, []);

  const getData = (offset, limit) => {
    getAllReleases(limit, offset);
  };

  const handleChange = (pagination, filters, sorter) => {
    const offset =
      pagination.current * pagination.pageSize - pagination.pageSize;
    const limit = pagination.pageSize;
    const params = {};

    if (sorter.hasOwnProperty("column")) {
      params.order = { field: sorter.field, dir: sorter.order };
    }

    getData(offset, limit, params);
  };

  const viewAlbum = (album) => {
    history.push(routes.viewRelease + "/" + album._id);
  };

  const editAlbum = (album) => {
    history.push(routes.editRelease + "/" + album._id);
  };

  const onStatusChange = (status, album, index) => {
    axios
      .patch("/admin/albums/" + album._id + "/status", {
        status: status,
        reviewComments: "",
      })
      .then(() => {
        setReleaseList((albums) => {
          const albumsCopy = [...albums];
          albumsCopy[index].status = status;
          return albumsCopy;
        });
        message.success(
          "Album status for " + album.title + " has been set to " + status
        );
      })
      .catch(() => {
        message.error("Failed changing album status for " + album.title);
      });

    setReleaseList((oldReleaseList) => {
      const albumIndex = oldReleaseList.findIndex((r) => r._id === album._id);
      const newList = [...oldReleaseList];
      newList[albumIndex].status = album.status;
      return newList;
    });
    console.log(status, album);
  };

  const deleteAlbum = (album) => {
    if (!window.confirm("Are you sure you want to delete this album")) return;

    notification.info({
      message: "Deleting album...",
    });
    axios
      .delete("/admin/albums/" + album._id)
      .then(() => {
        notification.success({
          message: "Album deleted",
        });
        setReleaseList((rl) => rl.filter((r) => r._id !== album._id));
      })
      .catch(() => {
        notification.error({
          message: "Error deleting album",
        });
      });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

  const columns = [
    {
      title: "Release Id",
      dataIndex: "fingerprint",
      ...getColumnSearchProps("fingerprint"),
      sorter: (a, b) => ("" + a.fingerprint).localeCompare(b.fingerprint),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Actions",
      render: (album) => (
        <div className="release-actions">
          <div className="action-button">
            <span onClick={() => viewAlbum(album)}>
              <EyeOutlined />
              &nbsp;
            </span>
          </div>
          <div className="action-button">
            <span onClick={() => editAlbum(album)}>
              <EditOutlined />
              &nbsp;
            </span>
          </div>
          <div className="action-button danger">
            <span onClick={() => deleteAlbum(album)}>
              <DeleteOutlined />
              &nbsp;
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => ("" + a.status).localeCompare(b.status),
      sortDirections: ["descend", "ascend"],
      render: (status, album, index) =>
        tableLoading ? (
          <div style={{ height: 40 }}></div>
        ) : (
          <StyledSelect
            showSearch
            style={{ width: 200 }}
            placeholder="Select a status"
            optionFilterProp="children"
            defaultValue={status}
            onChange={(s) => onStatusChange(s, album, index)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {status}
            {StatusArr.map((status) => (
              <Option value={status}>
                {(() => {
                  switch (status) {
                    case "Released":
                      return <span style={{ color: "#00BFA5" }}>{status}</span>;
                    case "SentToStores":
                      return <span style={{ color: "#F06292" }}>{status}</span>;
                    case "Approved":
                      return <span style={{ color: "#F9A825" }}>{status}</span>;
                    default:
                      return status;
                  }
                })()}
              </Option>
            ))}
          </StyledSelect>
        ),
    },
    {
      title: "Release Title",
      dataIndex: "title",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => ("" + a.title).localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
      render: (title, album) => (
        <div className="release-meta" onClick={() => viewAlbum(album)}>
          <div className="release-title">
            {title || (
              <span>
                <i>No information available</i>
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Primary Artist",
      dataIndex: "primaryArtist",
      render: (primaryArtist) => primaryArtist,
      ...getColumnSearchProps("primaryArtist"),
      sorter: (a, b) => ("" + a.primaryArtist).localeCompare(b.primaryArtist),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Uploaded By",
      dataIndex: "uploadedBy",
      render: (uploadedBy) => uploadedBy,
      ...getColumnSearchProps("uploadedBy"),
      sorter: (a, b) => ("" + a.uploadedBy).localeCompare(b.uploadedBy),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "UPC",
      dataIndex: "UPC",
      render: (UPC) => UPC,
      ...getColumnSearchProps("UPC"),
      sorter: (a, b) => ("" + a.UPC).localeCompare(b.UPC),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      ...getColumnSearchProps("releaseDate"),
      sorter: (a, b) => ("" + a.releaseDate).localeCompare(b.releaseDate),
      sortDirections: ["descend", "ascend"],
      render: (releaseDate) => moment(releaseDate).format("MMMM Do YYYY"),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) => ("" + a.createdAt).localeCompare(b.createdAt),
      sortDirections: ["descend", "ascend"],
      render: (createdAt) => moment(createdAt).format("MMMM Do YYYY"),
    },
    {
      title: "Creator Email",
      dataIndex: "creatorEmail",
      render: (creatorEmail) => creatorEmail,
      ...getColumnSearchProps("creatorEmail"),
      sorter: (a, b) => ("" + a.creatorEmail).localeCompare(b.creatorEmail),
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <AdminReleaseListWrapper>
      <Table
        columns={columns}
        dataSource={releaseList}
        pagination={{
          defaultPageSize: 10,
          total: totalCount,
        }}
        loading={tableLoading}
        scroll={{ x: "max-content" }}
        onChange={handleChange}
        size="small"
      />
    </AdminReleaseListWrapper>
  );
}
