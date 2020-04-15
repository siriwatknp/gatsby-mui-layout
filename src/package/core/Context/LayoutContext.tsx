import React from "react"
import merge from "deepmerge"
import { useTheme } from "@material-ui/core/styles"
import { createBreakpointStyles, createDisplayNone } from "../../utils"
import { ComponentStyle, ILayoutBuilder } from "../Builder"
import { State, SidebarVariant } from "../../types"

const Context = React.createContext(null)
Context.displayName = "MuiLayoutCtx"

type SidebarPayload = { id: string; value: boolean }
type Action =
  | { type: "SET_OPEN"; payload: SidebarPayload }
  | { type: "SET_COLLAPSED"; payload: SidebarPayload }
interface ISidebarTrigger {
  (id: string, value: boolean): void
}
type ContextValue = {
  state: State
  styles: ComponentStyle
  setOpen: ISidebarTrigger
  setCollapsed: ISidebarTrigger
}

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

export const useLayoutCtx = (): ContextValue => {
  const ctx = React.useContext(Context)
  if (!ctx) {
    throw new Error("useLayoutCtx must be rendered under LayoutProvider")
  }
  return ctx
}

export const useSidebar = (id: string, variant: keyof SidebarVariant) => {
  const { styles, state } = useLayoutCtx()
  const { breakpoints } = useTheme()
  const variantStyle = styles.sidebar[id][variant]
  return {
    state: state.sidebar[id],
    styles: createBreakpointStyles(variantStyle, breakpoints),
  }
}

export const useHeader = () => {
  const { styles } = useLayoutCtx()
  const { breakpoints } = useTheme()
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
  return (
    <Context.Provider
      value={{
        state,
        styles,
        setOpen,
        setCollapsed,
      }}
    >
      {children}
    </Context.Provider>
  )
}
