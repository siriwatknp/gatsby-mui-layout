import React from "react"
// @ts-ignore
import BrowserIFrame from "../components/BrowserIFrame"
import { WindowProvider } from "../package/core"
import ReactJsDemo from "./standard"

const Page = () => {
  return (
    <BrowserIFrame>
      {({ window, document }) => {
        return (
          <WindowProvider value={{ iWindow: window, iDocument: document }}>
            <ReactJsDemo />
          </WindowProvider>
        )
      }}
    </BrowserIFrame>
  )
}

export default Page
