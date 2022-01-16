import { Collapse, Descriptions, Image, message } from "antd";
import { List } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import moment from "moment";
import React from "react";
import { TrackListWrapper } from "../TrackList/styles";
import { PrimaryButton } from "../../common-components/PrimaryButton/styles";
import { AlbumPreviewWrapper } from "./styles";
import { copyTextToClipboard } from "../../../utils/clipboard";

export default function AlbumPreview({ album, tracks }) {
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
      <PrimaryButton onClick={copyExcelRows}>Copy Excel Rows</PrimaryButton>
      <div className="section-heading">Album Info</div>
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
