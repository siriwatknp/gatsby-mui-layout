import React from "react"
import { ThemeProvider, createMuiTheme, Theme } from "@material-ui/core/styles"
import {
  ContextValue,
  LayoutProvider,
  LayoutProviderProps,
} from "../../core/Context"
import { useLayoutCtx } from "../../core/Context"

const baseTheme = createMuiTheme()

type RootProps = {
  theme?: Theme
  themeProviderOmitted?: boolean
  children: FunctionChildren
} & LayoutProviderProps

type FunctionChildren =
  | React.ReactNode
  | ((ctx: ContextValue) => React.ReactNode)

const Layout = ({ children }: { children: FunctionChildren }) => {
  const ctx = useLayoutCtx()
  return typeof children === "function" ? children(ctx) : children
}

const Root = ({
  theme = baseTheme,
  themeProviderOmitted = false,
  children,
  ...props
}: React.PropsWithChildren<RootProps>) => {
  if (themeProviderOmitted) {
    return (
      <LayoutProvider {...props}>
        <Layout>{children}</Layout>
      </LayoutProvider>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <LayoutProvider {...props}>
        <Layout>{children}</Layout>
      </LayoutProvider>
    </ThemeProvider>
  )
}

export default Root
