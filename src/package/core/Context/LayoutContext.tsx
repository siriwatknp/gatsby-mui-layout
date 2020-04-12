import React from "react"
import { State } from "../../types"
import { ILayoutBuilder } from "../Builder/Builder"

const Context = React.createContext(null)
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

export const useHeader = () => {
  const ctx = React.useContext(Context)
  return {
    styles: ctx.styles.header,
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
  const [state, dispatch] = React.useReducer(reducer, initialState)
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
