"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const AppBar_1 = require("@material-ui/core/AppBar");
const styles_1 = require("@material-ui/core/styles");
const LayoutContext_1 = require("../../core/Context/LayoutContext");
const PersistentSidebar_1 = require("../../models/PersistentSidebar");
const createBreakpointStyles_1 = require("../../utils/createBreakpointStyles");
const useStyles = styles_1.makeStyles(({ breakpoints }) => ({
    root: o => createBreakpointStyles_1.default(o, breakpoints),
}), { name: "LayoutHeader" });
const Header = props => {
    const headerConfig = {
        id: "header",
        position: "fixed",
        clipped: true,
    };
    const effect1 = PersistentSidebar_1.createPersistentSidebarEffect({
        id: "primary-sidebar",
        anchor: "left",
        width: 256,
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
    }, { sidebar: { "primary-sidebar": { open: true } } });
    const effect2 = PersistentSidebar_1.createPersistentSidebarEffect({
        id: "secondary-sidebar",
        anchor: "right",
        width: 200,
        persistentBehavior: "none",
        collapsible: true,
        collapsedWidth: 64,
    }, { sidebar: { "primary-sidebar": { open: true } } });
    const effect3 = PersistentSidebar_1.createPersistentSidebarEffect({
        id: "primary-sidebar",
        anchor: "left",
        width: 256,
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
    }, { sidebar: { "primary-sidebar": { open: true, collapsed: true } } });
    const { styles } = LayoutContext_1.useHeader();
    const classes = useStyles(styles);
    return react_1.default.createElement(AppBar_1.default, Object.assign({ classes: classes, color: "default", elevation: 0 }, props));
};
exports.default = Header;
//# sourceMappingURL=Header.js.map