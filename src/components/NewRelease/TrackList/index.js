import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Col,
  Drawer,
  Form,
  List,
  notification,
  Row,
  Select,
} from "antd";
import { TrackListWrapper } from "./styles";
import { PrimaryButton } from "../../common-components/PrimaryButton/styles";
import { StyledInput } from "../../common-components/Input/styles";
import { StyledSelect } from "../../common-components/Select/styles";
import axios from "axios";
import { genreList } from "../../../utils/genres";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { isoLangs } from "../../../utils/languages";

export default function TrackList({ albumId, tracks, setTracks }) {
  const [songEditVisible, setSongEditVisible] = useState(false);
  const [currentEditTrack, setCurrentEditTrack] = useState({});

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    Object.keys(values).forEach((key) => {
      if (
        values[key] === "" ||
        values[key] === null ||
        values[key] === undefined
      ) {
        values[key] = "__delete__";
      }
    });

    axios
      .patch("/admin/songs/" + currentEditTrack._id, { ...values })
      .then(() => {
        console.log("Album updated");
        notification.success({
          message: "Track edited successfully.",
        });
        setTracks((existingSongs) => {
          return existingSongs.map((track) => {
            if (track._id === currentEditTrack._id) {
              Object.keys(values).forEach((key) => {
                if (!values[key]) return;
                if (values[key] === "__delete__") track[key] = null;
                else track[key] = values[key];
              });
            }
            return track;
          });
        });
        closeSongEditor();
      })
      .catch((error) => {
        notification.error({
          message: "Error editing track.",
          description: error.response.data.error,
        });
      });
    console.log("values: ", values);
  };

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line
  }, [currentEditTrack]);

  const addNewTrack = () => {
    axios
      .post("/admin/admin/songs", { albumId })
      .then((response) => {
        const song = response.data.data.songInfo;
        setTracks((existingSongs) => [...existingSongs, song]);
      })
      .catch((error) => {
        notification.error({
          message: "Error creating track.",
          description: error.response.data.error,
        });
      });
  };

  const deleteSong = (songId) => {
    axios
      .delete("/admin/songs/" + songId)
      .then(() => {
        setTracks((existingSongs) =>
          existingSongs.filter((s) => s._id !== songId)
        );
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting track.",
          description: error.response.data.error,
        });
      });
  };

  const closeSongEditor = () => {
    setSongEditVisible(false);
  };

  const openSongEditor = (track) => {
    setCurrentEditTrack(track);
    setSongEditVisible(true);
  };

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
            <PrimaryButton onClick={() => form.submit()} type="primary">
              Submit
            </PrimaryButton>
          </div>
        }
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          initialValues={{
            title: currentEditTrack.title,
            primaryArtist: currentEditTrack.primaryArtist,
            secondaryArtist: currentEditTrack.secondaryArtist,
            composer: currentEditTrack.composer,
            lyricist: currentEditTrack.lyricist,
            explicit: currentEditTrack.explicit || false,
            mainGenre: currentEditTrack.mainGenre,
            subGenre: currentEditTrack.subGenre,
            language: currentEditTrack.language,
            ISRC: currentEditTrack.ISRC,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Track Title"
                rules={[
                  { required: true, message: "Please enter track title" },
                  { max: 150, message: "Track title too long" },
                ]}
              >
                <StyledInput />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ISRC"
                label="ISRC"
                rules={[
                  { min: 12, max: 12, message: "Please enter a valid ISRC" },
                ]}
              >
                <StyledInput />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="mainGenre"
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
                name="subGenre"
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Primary Artist :"
                name="primaryArtist"
                rules={[
                  {
                    required: true,
                    message: "Primary Artist is Required!",
                  },
                ]}
              >
                <StyledInput />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Secondary Artist :" name="secondaryArtist">
                <StyledInput />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Composer :"
                name="composer"
                rules={[
                  {
                    required: true,
                    message: "Composer is Required!",
                  },
                ]}
              >
                <StyledInput />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Lyricist :"
                name="lyricist"
                rules={[
                  {
                    required: true,
                    message: "Lyricist is Required!",
                  },
                ]}
              >
                <StyledInput />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Language of release :"
                name="language"
                rules={[
                  {
                    required: true,
                    message: "Language of release is Required!",
                  },
                ]}
              >
                <StyledSelect
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a language"
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    console.log(option);
                    return (
                      option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    );
                  }}
                >
                  {Object.values(isoLangs).map((language) => (
                    <Option value={language.name}>
                      {language.name}({language.nativeName})
                    </Option>
                  ))}
                </StyledSelect>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="explicit" valuePropName="checked">
                  <Checkbox>Explicit</Checkbox>
                </Form.Item>
              </Col>
            </Row>
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
                <span className="edit-link">
                  <FileAddOutlined />
                  &nbsp;Upload Track
                </span>,
                <span
                  className="edit-link"
                  onClick={() => openSongEditor(track)}
                >
                  <EditOutlined />
                  &nbsp;Edit Track Info
                </span>,
                <span
                  className="edit-link"
                  onClick={() => deleteSong(track._id)}
                >
                  <DeleteOutlined />
                  &nbsp;Delete
                </span>,
              ]}
            >
              {track.title || (
                <span
                  className="edit-link"
                  onClick={() => openSongEditor(track)}
                >
                  <i>
                    <PlusCircleOutlined />
                    &nbsp;Add Details
                  </i>
                </span>
              )}
            </List.Item>
          )}
        />
        <div className="add-link" onClick={addNewTrack}>
          <PlusCircleOutlined />
          &nbsp;Add Track
        </div>
      </TrackListWrapper>
    </>
  );
}
