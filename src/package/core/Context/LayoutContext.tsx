import React from "react"
import merge from "deepmerge"
import { ComponentStyle, ILayoutBuilder } from "../../builders"
import { ILayoutConfig, LayoutConfig, State } from "../../types"

const Context = React.createContext<ContextValue>(null)
Context.displayName = "MuiLayoutCtx"

export type ContextValue = {
  state: State
  styles: ComponentStyle
  config: LayoutConfig
  data: ILayoutConfig
  setOpen: (id: string, value: boolean) => void
  setCollapsed: (id: string, value: boolean) => void
}

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

export const LayoutConsumer = Context.Consumer

export type LayoutProviderProps = {
  initialState?: State
  scheme: ILayoutBuilder
}

export const LayoutProvider = ({
  initialState: controlledInitialState,
  scheme,
  children,
}: React.PropsWithChildren<LayoutProviderProps>) => {
  const autoGenInitialState = scheme.getInitialState()
  const [state, dispatch] = React.useReducer(
    reducer,
    merge(autoGenInitialState, controlledInitialState || {})
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
  const data = scheme.getComponentData()
  return (
    <Context.Provider
      value={{
        state,
        styles,
        config,
        data,
        setOpen,
        setCollapsed,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
