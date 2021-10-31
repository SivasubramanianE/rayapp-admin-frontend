import React, { useEffect, useState } from "react";
import { Col, Drawer, Form, List, Row, Select } from "antd";
import { TrackListWrapper } from "./styles";
import { PrimaryButton } from "../../common-components/PrimaryButton/styles";
import { StyledInput } from "../../common-components/Input/styles";
import { StyledSelect } from "../../common-components/Select/styles";
import axios from "axios";
import { genreList } from "../../../utils/genres";

export default function TrackList({ albumId }) {
  const [songEditVisible, setSongEditVisible] = useState(false);
  const [tracks, setTracks] = useState([]);

  const getAlbumSongs = () => {
    return axios.get("/songs", { params: { albumId } });
  };

  useEffect(() => {
    getAlbumSongs().then((response) => {
      const songs = response.data.data;
      setTracks(songs);
      console.log(songs);
    });
    // eslint-disable-next-line
  }, []);

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
                  placeholder="Select a genre"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {genreList.map((genre) => (
                    <Option value={genre}>{genre}</Option>
                  ))}
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
                  placeholder="Select a genre"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {genreList.map((genre) => (
                    <Option value={genre}>{genre}</Option>
                  ))}
                </StyledSelect>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <TrackListWrapper>
        <List
          size="large"
          dataSource={tracks}
          renderItem={(track) => (
            <List.Item
              actions={[
                <span className="edit-link" onClick={openSongEditor}>
                  Edit Track Info
                </span>,
              ]}
            >
              {track.title}
            </List.Item>
          )}
        />
        <div className="add-link">+ Add Track</div>
      </TrackListWrapper>
    </>
  );
}
