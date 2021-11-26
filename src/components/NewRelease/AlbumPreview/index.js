import { Collapse, Descriptions, Image } from "antd";
import { List } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import moment from "moment";
import React from "react";
import { TrackListWrapper } from "../TrackList/styles";
import { AlbumPreviewWrapper } from "./styles";

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

  return (
    <AlbumPreviewWrapper>
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
