/* eslint-disable no-use-before-define,react/no-array-index-key */
import React from "react"
import Box from "@material-ui/core/Box"
import CssBaseline from "@material-ui/core/CssBaseline"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Edit from "@material-ui/icons/Edit"
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles"
import Layout from "../package/core"
import {
  Root,
  Header,
  Content,
  DrawerSidebar,
  InsetSidebar,
  InsetContainer,
  InsetFooter,
  FullScreen,
} from "../package/components"
import {
  MessengerSearch,
  ChatsHeader,
  ChatList,
  ConversationHead,
  ChatSettings,
  ChatBar,
  ChatDialog,
  // @ts-ignore
} from "@mui-treasury/mockup/brands/messenger"

const useStyles = makeStyles(() => ({
  header: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .10)",
    backgroundColor: "#ffffff",
  },
  insetBody: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
  edit: {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
}))

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "rgb(0, 153, 255)",
      },
      background: {
        default: "#fff",
      },
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      body1: {
        fontSize: `${15 / 16}rem`,
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "strong, b": {
            fontWeight: "bold",
          },
        },
      },
    },
  })
)

const MessengerDemo = () => {
  const styles = useStyles()
  const scheme = Layout()
  scheme.configureHeader(builder => {
    builder.create("appHeader").registerConfig("xs", {
      position: "relative",
      initialHeight: 60,
    })
  })
  scheme.configureEdgeSidebar(builder => {
    builder
      .create("primarySidebar", { anchor: "left" })
      .registerPermanentConfig("xs", {
        width: "25%",
        collapsible: true,
        collapsedWidth: 80,
      })
  })
  scheme.enableAutoCollapse("primarySidebar", "sm")
  scheme.configureInsetSidebar(builder => {
    builder
      .create("secondarySidebar", { anchor: "right" })
      .registerAbsoluteConfig("sm", {
        width: "33%",
      })
  })
  return (
    <FullScreen>
      <Root theme={theme} scheme={scheme}>
        {({ state: { sidebar } }) => (
          <>
            <CssBaseline />
            <Header className={styles.header}>
              <Toolbar disableGutters>
                <ConversationHead />
              </Toolbar>
            </Header>
            <DrawerSidebar sidebarId={"primarySidebar"}>
              {sidebar.primarySidebar.collapsed ? (
                <Box textAlign={"center"} my={1}>
                  <IconButton className={styles.edit}>
                    <Edit />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <ChatsHeader />
                  <Box p={"4px 16px 12px"}>
                    <MessengerSearch />
                  </Box>
                </>
              )}
              <ChatList concise={sidebar.primarySidebar.collapsed} />
            </DrawerSidebar>
            <Content>
              <InsetContainer
                disableGutters
                rightSidebar={
                  <InsetSidebar
                    sidebarId={"secondarySidebar"}
                    classes={{ paper: styles.insetBody }}
                  >
                    <ChatSettings />
                  </InsetSidebar>
                }
              >
                <ChatDialog />
              </InsetContainer>
            </Content>
            <InsetFooter ContainerProps={{ disableGutters: true }}>
              <Box display={"flex"} alignItems={"center"} p={1}>
                <ChatBar concise={sidebar.primarySidebar.collapsed} />
              </Box>
            </InsetFooter>
          </>
        )}
      </Root>
    </FullScreen>
  )
}

// hide-start
MessengerDemo.metadata = {
  title: "Messenger",
  path: "layout/clones/messenger",
  files: [],
  relates: [],
}
// hide-end
export default MessengerDemo
