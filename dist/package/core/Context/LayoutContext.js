"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Context = react_1.default.createContext(null);
Context.displayName = "MuiLayoutCtx";
const reducer = (state, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case "SET_OPEN":
            newState.sidebar[action.payload.id].open = action.payload.value;
            return newState;
        case "SET_COLLAPSED":
            newState.sidebar[action.payload.id].collapsed = action.payload.value;
            return newState;
        default:
            return state;
    }
};
exports.useHeader = () => {
    const ctx = react_1.default.useContext(Context);
    return {
        styles: ctx.styles.header,
    };
};
exports.LayoutConsumer = Context.Consumer;
exports.LayoutProvider = ({ initialState, scheme, children, }) => {
    const [state, dispatch] = react_1.default.useReducer(reducer, initialState);
    const setOpen = (id, value) => dispatch({ type: "SET_OPEN", payload: { id, value } });
    const setCollapsed = (id, value) => dispatch({
        type: "SET_COLLAPSED",
        payload: { id, value },
    });
    const styles = scheme.getComponentStyle(state);
    return (react_1.default.createElement(Context.Provider, { value: {
            state,
            styles,
            setOpen,
            setCollapsed,
        } }, children));
};
//# sourceMappingURL=LayoutContext.js.map