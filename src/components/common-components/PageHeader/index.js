import { MenuOutlined } from "@ant-design/icons";
import React from "react";
import { PageHeaderWrapper } from "./styles";

export default function PageHeader({ setNavigationExpanded }) {
  return (
    <PageHeaderWrapper>
      <div>New Release - Basic Info</div>
      <div
        className="hamburger-icon"
        onClick={() => setNavigationExpanded(true)}
      >
        <MenuOutlined></MenuOutlined>
      </div>
    </PageHeaderWrapper>
  );
}
