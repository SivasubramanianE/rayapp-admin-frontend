import {
  Collapse,
  Descriptions,
  Image,
  message,
  Modal,
  Input,
  Alert,
} from "antd";
import { List } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import moment from "moment";
import React, { useState } from "react";
import { TrackListWrapper } from "../TrackList/styles";
import { PrimaryButton } from "../../common-components/PrimaryButton/styles";
import { StyledSelect } from "../../common-components/Select/styles";
import { Option } from "antd/lib/mentions";
import axios from "axios";
import { AlbumPreviewWrapper } from "./styles";
import { copyTextToClipboard } from "../../../utils/clipboard";
const { TextArea } = Input;

export default function AlbumPreview({ album, setAlbum, tracks }) {
  const [visible, setVisible] = React.useState(false);
  const [reviewComments, setReviewComments] = useState(album.reviewComments);
  const [status, setStatus] = useState(album.status);

  const albumData = [
    { title: "Title", value: album.title },
    { title: "Primary Artist", value: album.primaryArtist },
    { title: "Secondary Artist", value: album.secondaryArtist },
    { title: "Language", value: album.language },
    { title: "Main Genre", value: album.mainGenre },
    { title: "Sub Genre", value: album.subGenre },
    {
      title: "Release Date",
      value: moment(album.releaseDate).format("MMMM Do YYYY"),
    },
  ];

  const StatusArr = [
    "Draft",
    "Submitted",
    "Approved",
    "Released",
    "Rejected",
    "ReSubmitted",
  ];

  const onStatusChange = (status) => {
    setStatus(status);

    if (status === "Rejected") {
      setVisible(true);
    } else {
      submitStatus(status);
    }
  };

  const submitStatus = (status) => {
    axios
      .patch("/admin/albums/" + album._id + "/status", {
        status: status,
        reviewComments: status === "Rejected" ? reviewComments : "",
      })
      .then(() => {
        message.success(
          "Album status for " + album.title + " has been set to " + status
        );
        setVisible(false);
        setAlbum((album) => {
          const copy = { ...album };
          if (status === "Rejected") copy.reviewComments = reviewComments;
          else copy.reviewComments = "";
          return copy;
        });
      })
      .catch((e) => {
        message.error("Failed changing album status for " + album.title);
      });
  };

  const setComments = (comments) => {
    console.log(comments.target.value);
    setReviewComments(comments.target.value);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const copyExcelRows = () => {
    let excelRows = tracks.map((track, index) => {
      return [
        index + 1, // track number
        track.title, // track title
        "", // version
        index + 1, // cd number
        album.title, // release title
        track.primaryArtist, // primary artists
        track.secondaryArtist, // featuring artists
        "", // remix artists
        track.lyricist, // authors
        track.composer, // composers
        album.label, // label
        album.productionYear, // production year
        album.label, // production owner
        album.label, // copyright owner
        track.mainGenre, // genre
        track.subGenre, // sub genre
        tracks.length === 1 ? "Single" : "Album", // track type
        track.language, // lyrics language
        track.language, // title language
        track.explicit, // parental advisory
      ];
    });
    excelRows = excelRows.map((lines) => lines.join("\t")).join("\n");
    console.log(excelRows);
    copyTextToClipboard(excelRows).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
        message.success("Excel rows copied successfully!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
        message.success("Error copying excel rows.");
      }
    );
  };

  return (
    <AlbumPreviewWrapper>
      <div className="flex">
        <div style={{ width: 200 }}>
          <StyledSelect
            showSearch
            style={{ width: 100 }}
            placeholder="Select a status"
            optionFilterProp="children"
            defaultValue={album.status}
            onChange={(s) => onStatusChange(s)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {album.status}
            {StatusArr.map((status) => (
              <Option value={status}>{status}</Option>
            ))}
          </StyledSelect>
        </div>

        <Modal
          title="Rejected Comments"
          visible={visible}
          onOk={() => submitStatus(status)}
          onCancel={handleCancel}
        >
          <TextArea
            onChange={setComments}
            defaultValue={album.reviewComments}
            value={reviewComments}
            rows={4}
          />
        </Modal>

        <div style={{ paddingLeft: 15 }}>
          <PrimaryButton onClick={copyExcelRows}>Copy Excel Rows</PrimaryButton>
        </div>
      </div>
      <div className="section-heading">Album Info</div>

      {album.reviewComments && album.reviewComments !== "" && (
        <Alert
          message="Album was previously rejected with the following review comments:"
          description={
            <pre className="review-comments">{album.reviewComments}</pre>
          }
          type="warning"
          showIcon
        />
      )}

      <TrackListWrapper>
        <Image width={200} src={album.artUrl} />
        <List
          size="large"
          dataSource={[1]}
          renderItem={() => (
            <List.Item>
              <Descriptions layout="vertical" className="album-descriptions">
                {albumData.map((element) => (
                  <Descriptions.Item
                    label={<div className="detail-label">{element.title}</div>}
                  >
                    {element.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </List.Item>
          )}
        />
      </TrackListWrapper>

      <div className="section-heading">Songs</div>
      <Collapse bordered={false} ghost>
        {tracks.map((track, index) => (
          <CollapsePanel
            header={track.title || <i>No info available</i>}
            key={index}
          >
            <Descriptions bordered>
              <Descriptions.Item
                span={2}
                label={<div className="detail-label">Title</div>}
              >
                {track.title}
              </Descriptions.Item>
              <Descriptions.Item
                span={2}
                label={<div className="detail-label">Audio File</div>}
              >
                <audio controls src={track.masterUrl}></audio>
              </Descriptions.Item>
              <Descriptions.Item
                span={2}
                label={<div className="detail-label">Primary Artist</div>}
              >
                {track.primaryArtist}
              </Descriptions.Item>
              <Descriptions.Item
                span={2}
                label={<div className="detail-label">Secondary Artist</div>}
              >
                {track.secondaryArtist}
              </Descriptions.Item>
              <Descriptions.Item
                span={2}
                label={<div className="detail-label">Language</div>}
              >
                {track.language}
              </Descriptions.Item>
              <Descriptions.Item
                span={2}
                label={<div className="detail-label">Main Genre</div>}
              >
                {track.mainGenre}
              </Descriptions.Item>
              <Descriptions.Item
                span={2}
                label={<div className="detail-label">Sub Genre</div>}
              >
                {track.subGenre}
              </Descriptions.Item>
            </Descriptions>
          </CollapsePanel>
        ))}
      </Collapse>
    </AlbumPreviewWrapper>
  );
}
