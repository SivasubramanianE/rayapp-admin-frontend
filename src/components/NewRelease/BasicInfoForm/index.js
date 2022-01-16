import React, { useEffect, useState } from "react";
import { BasicInfoFormWrapper } from "./styles";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Upload, message, notification } from "antd";

import { StyledInput } from "../../common-components/Input/styles";
import { StyledDatePicker } from "../../common-components/Datepicker/styles";
import { PrimaryButton } from "../../common-components/PrimaryButton/styles";
import axios from "axios";
import moment from "moment";
import { StyledSelect } from "../../common-components/Select/styles";
import { Option } from "antd/lib/mentions";
import { genreList } from "../../../utils/genres";
import { isoLangs } from "../../../utils/languages";
import { API_URL } from "../../../utils/url";

export default function BasicInfoForm({ nextStep, albumId, album, setAlbum }) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();

  const getFormDefaults = (a) => ({
    title: a.title,
    primaryArtist: a.primaryArtist,
    secondaryArtist: a.secondaryArtist,
    mainGenre: a.mainGenre,
    subGenre: a.subGenre,
    language: a.language,
    releaseDate: a.releaseDate
      ? moment(a.releaseDate)
      : moment().add(11, "days"),
    productionYear: a.productionYear
      ? moment({ year: a.productionYear })
      : moment(),
    label: a.label,
    UPC: a.UPC,
  });

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
    console.log("Submit form", values);
    values.releaseDate = values.releaseDate.toISOString();
    values.productionYear = values.productionYear.year();

    Object.keys(values).forEach((key) => {
      if (values[key] === "" || !values[key]) {
        values[key] = "__delete__";
      }
    });

    setSubmitting(true);
    axios
      .patch("/admin/albums/" + albumId, { ...values })
      .then(() => {
        const newAlbum = { ...album };
        Object.keys(newAlbum).forEach((key) => {
          if (!values[key]) return;
          if (values[key] === "__delete__") newAlbum[key] = null;
          else newAlbum[key] = values[key];
        });

        form.setFieldsValue(getFormDefaults(newAlbum));
        setAlbum(newAlbum);
        nextStep();
      })
      .catch((error) => {
        notification.error({
          message: "Error editing album details.",
          description: error.response.data.error,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const checkImageDimensions = (file) => {
    return new Promise((resolve) => {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(img.src);
        if (img.width < 3000 || img.height < 3000 || img.width !== img.height)
          return resolve(false);
        return resolve(true);
      };
      img.src = url;
    });
  };

  function beforeUpload(file) {
    uploadAlbumArt(file);
    return false;
  }

  const uploadAlbumArt = async (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      return message.error("Please upload a JPG or PNG file");
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      return message.error("Image file must smaller than 10MB");
    }

    const dimensionsOk = await checkImageDimensions(file);

    if (!dimensionsOk)
      return message.error(
        "Album art needs to be a square with minimum dimension of 3000px"
      );

    const formData = new FormData();
    formData.append("coverArtFile", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    setLoading(true);
    axios
      .put(API_URL + "/admin/albums/" + albumId + "/cover", formData, config)
      .then((response) => {
        const data = response.data.data;
        const newAlbum = { ...album };
        newAlbum.artUrl = data.signedUrl + "&version=" + +new Date();
        setAlbum(newAlbum);
      })
      .finally(() => setLoading(false));
  };

  return (
    <BasicInfoFormWrapper>
      <div>
        <Upload
          name="coverArtFile"
          listType="picture-card"
          className="cover-art-uploader"
          action={() => null}
          showUploadList={false}
          onDrop={() => null}
          beforeUpload={() => null}
          onChange={() => null}
        >
          {album.artUrl !== null && !loading ? (
            <img
              src={album.artUrl}
              alt="cover-art"
              className="cover-art"
              style={{ width: "100%" }}
            />
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
          initialValues={getFormDefaults(album)}
          form={form}
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

          <Form.Item label="Secondary Artist :" name="secondaryArtist">
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
            <StyledSelect
              showSearch
              style={{ width: 200 }}
              placeholder="Select a language"
              optionFilterProp="children"
              filterOption={(input, option) => {
                console.log(option);
                return (
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                  placeholder="Select a genre"
                  optionFilterProp="children"
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
                  placeholder="Select a genre"
                  optionFilterProp="children"
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
            </div>
          </div>
          <div className="flex-row">
            <div className="left">
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
                  format="Do MMMM YYYY"
                  disabledDate={function disabledDate(current) {
                    return current && current < moment().add(10, "days");
                  }}
                />
              </Form.Item>
            </div>
            <div className="right">
              <Form.Item
                label="Production Year :"
                name="productionYear"
                rules={[
                  {
                    required: true,
                    message: "Production Year is Required!",
                  },
                ]}
              >
                <StyledDatePicker
                  picker="year"
                  disabledDate={function disabledDate(current) {
                    return current && current > moment();
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex-row">
            <div className="left">
              <Form.Item
                label="Production Name :"
                name="label"
                rules={[
                  {
                    required: true,
                    message: "Release Date is Required!",
                  },
                ]}
              >
                <StyledInput />
              </Form.Item>
            </div>
            <div className="right">
              <Form.Item
                label="UPC :"
                name="UPC"
                rules={[{ max: 13, message: "Please enter a valid UPC" }]}
              >
                <StyledInput />
              </Form.Item>
            </div>
          </div>
          <Form.Item {...tailLayout}>
            <PrimaryButton
              type="primary"
              htmlType="submit"
              className="submit-btn"
              disabled={submitting || !album.artUrl}
              /* onClick={nextStep} */
            >
              {submitting ? "Saving" : "Next"}
            </PrimaryButton>
          </Form.Item>
        </Form>
      </div>
    </BasicInfoFormWrapper>
  );
}
