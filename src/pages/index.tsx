import React from "react"
import { Link } from "gatsby"

import Header from "../package/components/Header"
import { EdgeSidebarConfig, HeaderConfig } from "../package/types"

const IndexPage = () => {
  const config = {
    xs: {
      header: {
        id: 'app-header',
        position: 'fixed',
        clipped: true,
      },
      sidebars: [
        {
          id: 'app-primary-sidebar',
          anchor: 'left',
          width: 256,
          collapsible: true,
          collapsedWidth: 64,
        },
        {
          id: 'app-secondary-sidebar',
          anchor: 'right',
          width: 200,
          collapsible: true,
          collapsedWidth: 64,
        }
      ]
    },
    sm: {
      header: {
        id: 'app-header',
        position: 'relative',
        clipped: {
          'app-primary-sidebar': true,
          'app-secondary-sidebar': false,
        }
      },
    }
  }
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
