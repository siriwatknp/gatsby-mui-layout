import React from "react"
import merge from "deepmerge"
import { useTheme, Theme } from "@material-ui/core/styles"
import { createBreakpointStyles, getSidebarAnchor } from "../../utils"
import { ILayoutBuilder } from "../Builder"
import { ContextValue, State } from "../../types"
import { useSidebarCtx } from "./SidebarContext"

const Context = React.createContext<ContextValue>(null)
Context.displayName = "MuiLayoutCtx"

type SidebarPayload = { id: string; value: boolean }
type Action =
  | { type: "SET_OPEN"; payload: SidebarPayload }
  | { type: "SET_COLLAPSED"; payload: SidebarPayload }

const reducer = (state: State, action: Action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case "SET_OPEN":
      newState.sidebar[action.payload.id].open = action.payload.value
      return newState
    case "SET_COLLAPSED":
      newState.sidebar[action.payload.id].collapsed = action.payload.value
      return newState
    default:
      return state
  }
}

export const useSidebarCta = (sidebarId: string, consumer?: string) => {
  const { breakpoints } = useTheme<Theme>()
  const { id = sidebarId } = useSidebarCtx()
  const props = useSidebar(id, consumer)
  const anchor = getSidebarAnchor(props.config)
  return {
    id,
    anchor,
    breakpoints,
    ...props,
  }
}

export const useLayoutCtx = () => {
  const ctx = React.useContext(Context)
  if (!ctx) {
    throw new Error("useLayoutCtx must be rendered under LayoutProvider")
  }
  return ctx
}

export const useSidebar = (id: string, consumer?: string) => {
  if (!id) {
    throw new Error(`You must specify a sidebar id to <${consumer} />`)
  }
  const { styles, state, config, ...props } = useLayoutCtx()
  return {
    state: state.sidebar[id],
    styles: styles.sidebar[id],
    config: config.sidebarById[id],
    ...props,
  }
}

export const useHeader = () => {
  const { styles } = useLayoutCtx()
  const { breakpoints } = useTheme<Theme>()
  return {
    styles: createBreakpointStyles(styles.header, breakpoints),
  }
}

export const LayoutConsumer = Context.Consumer

export type LayoutProviderProps = {
  initialState?: State
  scheme: ILayoutBuilder
}

export const LayoutProvider = ({
  initialState,
  scheme,
  children,
}: React.PropsWithChildren<LayoutProviderProps>) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    merge(scheme.getInitialState(), initialState)
  )
  const setOpen = (id: string, value: boolean) =>
    dispatch({ type: "SET_OPEN", payload: { id, value } })
  const setCollapsed = (id: string, value: boolean) =>
    dispatch({
      type: "SET_COLLAPSED",
      payload: { id, value },
    })
  const styles = scheme.getComponentStyle(state)
  const config = scheme.getComponentConfig()
  return (
    <Context.Provider
      value={{
        state,
        styles,
        config,
        setOpen,
        setCollapsed,
      }}
    >
      {children}
    </Context.Provider>
  )
}
