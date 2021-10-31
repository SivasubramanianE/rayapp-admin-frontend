import React, { useEffect, useState } from "react";
import { BasicInfoFormWrapper } from "./styles";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Button, DatePicker, Upload, message } from "antd";

import { StyledInput } from "../../common-components/Input/styles";
import { StyledDatePicker } from "../../common-components/Datepicker/styles";
import { PrimaryButton } from "../../common-components/PrimaryButton/styles";
import axios from "axios";
import moment from "moment";
import { StyledSelect } from "../../common-components/Select/styles";
import { Option } from "antd/lib/mentions";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error("Image must smaller than 10MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default function BasicInfoForm({ nextStep, albumId, setAlbumId }) {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [album, setAlbum] = useState({});

  const getDraftAlbums = () =>
    axios.get("/albums", { params: { status: "Draft" } });

  useEffect(() => {
    setPageLoading(true);
    getDraftAlbums()
      .then((response) => {
        const albums = response.data.data;

        if (albums.length) {
          // There can only be one Draft at any given time.
          const responseAlbum = albums[0];
          if (!albumId) {
            setAlbumId(responseAlbum._id);
          }
          setAlbum(responseAlbum);
        }
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
        setLoading(false);
      });
    }
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    nextStep();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (pageLoading) {
    return null;
  }

  return (
    <BasicInfoFormWrapper>
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>

      <div className="basic-info">
        <Form
          {...layout}
          name="basic"
          layout="vertical"
          className="w-100"
          initialValues={{
            title: album.title,
            primaryArtist: album.primaryArtist,
            mainGenre: album.mainGenre,
            subGenre: album.subGenre,
            language: album.language,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name of the Release :"
            name="title"
            rules={[
              {
                required: true,
                message: "Release Name is Required!",
              },
            ]}
          >
            <StyledInput />
          </Form.Item>

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

          <Form.Item label="Secondary Artist :" name="Secondary Artist">
            <StyledInput />
          </Form.Item>

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
            <StyledInput />
          </Form.Item>

          <div className="flex-row">
            <div className="left">
              <Form.Item
                label="Main Genre :"
                name="mainGenre"
                rules={[
                  {
                    required: true,
                    message: "Main Genre is Required!",
                  },
                ]}
              >
                <StyledSelect
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
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
            </div>
            <div className="right">
              <Form.Item
                label="Sub Genre :"
                name="subGenre"
                rules={[
                  {
                    required: true,
                    message: "Sub Genre is Required!",
                  },
                ]}
              >
                <StyledSelect
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
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
            </div>
          </div>

          <Form.Item
            label="Release Date :"
            name="releaseDate"
            rules={[
              {
                required: true,
                message: "Release Date is Required!",
              },
            ]}
          >
            <StyledDatePicker
              disabledDate={function disabledDate(current) {
                return current && current < moment().add(7, "days");
              }}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <PrimaryButton
              type="primary"
              /* htmlType="submit" */ className="submit-btn"
              onClick={nextStep}
            >
              Next
            </PrimaryButton>
          </Form.Item>
        </Form>
      </div>
    </BasicInfoFormWrapper>
  );
}
