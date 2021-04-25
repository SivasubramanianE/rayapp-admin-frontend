import React, { useState } from "react";
import { BasicInfoFormWrapper } from "./styles";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Button, DatePicker, Upload, message } from "antd";

import { StyledInput } from "../../common-components/Input/styles";
import { StyledDatePicker } from "../../common-components/Datepicker/styles";
import { PrimaryButton } from "../../common-components/PrimaryButton/styles";

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

export default function BasicInfoForm({ nextStep }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

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
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name of the Release :"
            name="username"
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
            name="Primary Artist"
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
            name="Language of release"
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
                name="Main Genre"
                rules={[
                  {
                    required: true,
                    message: "Main Genre is Required!",
                  },
                ]}
              >
                <StyledInput />
              </Form.Item>
            </div>
            <div className="right">
              <Form.Item
                label="Sub Genre :"
                name="Sub Genre"
                rules={[
                  {
                    required: true,
                    message: "Sub Genre is Required!",
                  },
                ]}
              >
                <StyledInput />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Release Date :"
            name="Release Date"
            rules={[
              {
                required: true,
                message: "Release Date is Required!",
              },
            ]}
          >
            <StyledDatePicker />
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
