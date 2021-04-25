import React from "react";
import { List } from "antd";
import { TrackListWrapper } from "./styles";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export default function TrackList() {
  return (
    <TrackListWrapper>
      <List
        size="large"
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </TrackListWrapper>
  );
}
