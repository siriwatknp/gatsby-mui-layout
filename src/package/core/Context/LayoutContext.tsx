import React from "react"
import merge from "deepmerge"
import { useTheme } from "@material-ui/core/styles"
import { createBreakpointStyles } from "../../utils"
import { ILayoutBuilder } from "../Builder"
import { State, ResultStyle } from "../../types"

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
  styles: {
    header: ResultStyle
  }
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
