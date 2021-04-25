import React from "react";
import { MyReleasesWrapper } from "./styles";
import { Table } from "antd";
import Avatar from "antd/lib/avatar/avatar";

const columns = [
  {
    title: "Release Title",
    dataIndex: "release_title",
    render: (text) => (
      <div className="release-meta">
        <Avatar size="large"></Avatar>
        <div className="release-title">{text}</div>
      </div>
    ),
  },
  {
    title: "Release Date",
    dataIndex: "release_date",
  },
  {
    title: "status",
    dataIndex: "status",
  },
];

const data = [
  {
    key: "1",
    release_title: "Anda Urutti",
    release_date: "1-1-2021",
    status: "Removed",
  },
  {
    key: "2",
    release_title: "Idhayathile",
    release_date: "1-1-2021",
    status: "Published",
  },
  {
    key: "3",
    release_title: "82 D'Block",
    release_date: "1-1-2021",
    status: "Awaiting Review",
  },
  {
    key: "4",
    release_title: "Anda Urutti",
    release_date: "1-1-2021",
    status: "Removed",
  },
  {
    key: "5",
    release_title: "Idhayathile",
    release_date: "1-1-2021",
    status: "Published",
  },
  {
    key: "6",
    release_title: "82 D'Block",
    release_date: "1-1-2021",
    status: "Awaiting Review",
  },
  {
    key: "7",
    release_title: "Anda Urutti",
    release_date: "1-1-2021",
    status: "Removed",
  },
  {
    key: "8",
    release_title: "Idhayathile",
    release_date: "1-1-2021",
    status: "Published",
  },
  {
    key: "9",
    release_title: "82 D'Block",
    release_date: "1-1-2021",
    status: "Awaiting Review",
  },
  {
    key: "10",
    release_title: "Anda Urutti",
    release_date: "1-1-2021",
    status: "Removed",
  },
  {
    key: "11",
    release_title: "Idhayathile",
    release_date: "1-1-2021",
    status: "Published",
  },
  {
    key: "12",
    release_title: "82 D'Block",
    release_date: "1-1-2021",
    status: "Awaiting Review",
  },
  {
    key: "13",
    release_title: "Anda Urutti",
    release_date: "1-1-2021",
    status: "Removed",
  },
  {
    key: "14",
    release_title: "Idhayathile",
    release_date: "1-1-2021",
    status: "Published",
  },
  {
    key: "15",
    release_title: "82 D'Block",
    release_date: "1-1-2021",
    status: "Awaiting Review",
  },
];

export default function MyReleases() {
  return (
    <MyReleasesWrapper>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </MyReleasesWrapper>
  );
}
