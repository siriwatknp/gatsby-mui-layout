import React from "react"
import { Link } from "gatsby"

import Header from "../package/components/Header"
import { EdgeSidebarConfig, HeaderConfig } from "../package/types"

const IndexPage = () => {
  const headerConfig = {
    xs: {
      position: "fixed",
    },
    md: {
      position: "relative",
    },
  }
  const sidebarConfig = {
    sm: {
      headerClipped: false,
      collapsedWidth: 64,
      width: 256,
      collapsible: true,
      anchor: "left",
    },
    lg: {
      headerClipped: false,
      collapsedWidth: 80,
      width: "30%",
      collapsible: true,
      anchor: "left",
    },
  }
  return (
    <div>
      <Header>Hello</Header>
    </div>
  )
}

export default IndexPage
