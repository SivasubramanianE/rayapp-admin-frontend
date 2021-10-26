import { MenuOutlined } from "@ant-design/icons";
import React from "react";
import { PageHeaderWrapper } from "./styles";

export default function PageHeader({ setNavigationExpanded, pageTitle }) {
  return (
    <PageHeaderWrapper>
      <div>{pageTitle}</div>
      <div
        className="hamburger-icon"
        onClick={() => setNavigationExpanded(true)}
      >
        <MenuOutlined></MenuOutlined>
      </div>
    </PageHeaderWrapper>
  );
}
