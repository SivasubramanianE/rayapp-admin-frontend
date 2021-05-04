import React, { useState } from "react";
import { Col, Drawer, Form, List, Row, Select } from "antd";
import { TrackListWrapper } from "./styles";
import { PrimaryButton } from "../../common-components/PrimaryButton/styles";
import { StyledInput } from "../../common-components/Input/styles";
import { StyledSelect } from "../../common-components/Select/styles";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export default function TrackList() {
  const [songEditVisible, setSongEditVisible] = useState(false);

  const closeSongEditor = () => setSongEditVisible(false);

  const openSongEditor = () => setSongEditVisible(true);

  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <>
      <Drawer
        title="Edit Song Info"
        placement="right"
        closable={false}
        onClose={closeSongEditor}
        visible={songEditVisible}
        width={window.innerWidth > 769 ? 500 : "100%"}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <PrimaryButton onClick={closeSongEditor} style={{ marginRight: 8 }}>
              Cancel
            </PrimaryButton>
            <PrimaryButton onClick={closeSongEditor} type="primary">
              Submit
            </PrimaryButton>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="track_title"
                label="Track Title"
                rules={[
                  { required: true, message: "Please enter track title" },
                  { max: 150, message: "Track title too long" },
                ]}
              >
                <StyledInput placeholder="Track Title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isrc"
                label="ISRC"
                rules={[{ max: 12, message: "Please enter a valid ISRC" }]}
              >
                <StyledInput placeholder="ISRC (Optional)" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="main_genre"
                label="Main Genre"
                rules={[{ required: true, message: "Please enter main genre" }]}
              >
                <StyledSelect
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  size="large"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Pop</Option>
                  <Option value="lucy">Rock</Option>
                  <Option value="tom">Pop</Option>
                </StyledSelect>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sub_genre"
                label="Sub Genre"
                rules={[{ required: true, message: "Please enter sub genre" }]}
              >
                <StyledSelect
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  size="large"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Pop</Option>
                  <Option value="lucy">Rock</Option>
                  <Option value="tom">Pop</Option>
                </StyledSelect>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <TrackListWrapper>
        <List
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[<a onClick={openSongEditor}>Edit Track Info</a>]}
            >
              {item}
            </List.Item>
          )}
        />
      </TrackListWrapper>
    </>
  );
}
