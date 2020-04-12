import React from "react"
import { ThemeProvider, createMuiTheme, Theme } from "@material-ui/core/styles"
import { LayoutProvider, LayoutProviderProps } from "../../core/Context"

const baseTheme = createMuiTheme()

type RootProps = {
  theme?: Theme
  themeProviderOmitted?: boolean
} & LayoutProviderProps

const Root = ({
  theme = baseTheme,
  themeProviderOmitted = false,
  children,
  ...props
}: React.PropsWithChildren<RootProps>) => {
  if (themeProviderOmitted) {
    return <LayoutProvider {...props}>{children}</LayoutProvider>
  }
  return (
    <ThemeProvider theme={theme}>
      <LayoutProvider {...props}>{children}</LayoutProvider>
    </ThemeProvider>
  )
}

export default Root
