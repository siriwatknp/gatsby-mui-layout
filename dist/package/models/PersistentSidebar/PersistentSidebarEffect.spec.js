"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PersistentSidebarEffect_1 = require("./PersistentSidebarEffect");
const getWidthStyle = (model, ...args) => model.getObjectWidth(...args).getStyle();
const getMarginStyle = (model, ...args) => model.getObjectMargin(...args).getStyle();
describe("[Simple] None Behavior", () => {
    const baseConfig = {
        id: "persistent-sidebar",
        anchor: "left",
        collapsible: true,
        collapsedWidth: 80,
        width: 256,
        persistentBehavior: "none",
    };
    it("affect nothing", () => {
        const model = PersistentSidebarEffect_1.default(baseConfig, {
            sidebar: { "persistent-sidebar": { open: true, collapsed: false } },
        });
        expect(getMarginStyle(model)).toEqual({
            marginLeft: 0,
        });
        expect(getWidthStyle(model)).toEqual({
            width: "100%",
        });
    });
});
describe("[Simple] Fit Behavior", () => {
    let baseConfig;
    let state;
    beforeEach(() => {
        baseConfig = {
            id: "persistent-sidebar",
            anchor: "left",
            collapsible: true,
            collapsedWidth: 80,
            width: 256,
            persistentBehavior: "fit",
        };
        state = {
            sidebar: { "persistent-sidebar": { open: true, collapsed: false } },
        };
    });
    it("[anchor: left] affect margin left", () => {
        let model = PersistentSidebarEffect_1.default(baseConfig);
        expect(getMarginStyle(model)).toEqual({
            marginLeft: 0,
        });
        model = PersistentSidebarEffect_1.default(baseConfig, state);
        // default to "fit"
        expect(getMarginStyle(model)).toEqual({
            marginLeft: 256,
        });
        model = PersistentSidebarEffect_1.default(baseConfig, state);
        expect(getMarginStyle(model)).toEqual({
            marginLeft: 256,
        });
        model = PersistentSidebarEffect_1.default(baseConfig, state);
        expect(getMarginStyle(model)).toEqual({
            marginLeft: 256,
        });
    });
    it("[anchor: left] affect margin left when collapsed", () => {
        state.sidebar["persistent-sidebar"].collapsed = true;
        let model = PersistentSidebarEffect_1.default(baseConfig, state);
        expect(getMarginStyle(model)).toEqual({
            marginLeft: 80,
        });
    });
    it("[anchor: right] affect margin right", () => {
        baseConfig.width = 300;
        baseConfig.anchor = "right";
        let model = PersistentSidebarEffect_1.default(baseConfig);
        expect(getMarginStyle(model)).toEqual({
            marginRight: 0,
        });
        model = PersistentSidebarEffect_1.default(baseConfig, state);
        expect(getMarginStyle(model)).toEqual({
            marginRight: 300,
        });
    });
    it("affect other object's width", () => {
        baseConfig.width = "30%";
        baseConfig.collapsedWidth = 80;
        let model = PersistentSidebarEffect_1.default(baseConfig, state);
        expect(getWidthStyle(model)).toEqual({ width: "calc(100% - (30%))" });
        expect(getWidthStyle(model)).toEqual({
            width: "calc(100% - (30%))",
        });
        state.sidebar["persistent-sidebar"].open = false;
        model = PersistentSidebarEffect_1.default(baseConfig, state);
        expect(getWidthStyle(model)).toEqual({ width: "100%" });
        state.sidebar["persistent-sidebar"].open = true;
        state.sidebar["persistent-sidebar"].collapsed = true;
        model = PersistentSidebarEffect_1.default(baseConfig, state);
        expect(getWidthStyle(model)).toEqual({
            width: "calc(100% - 80px)",
        });
    });
});
describe("[Simple] Flexible Behavior", () => {
    let baseConfig;
    let state;
    beforeEach(() => {
        baseConfig = {
            id: "persistent-sidebar",
            anchor: "left",
            collapsible: true,
            collapsedWidth: 80,
            width: 256,
            persistentBehavior: "flexible",
        };
        state = {
            sidebar: { "persistent-sidebar": { open: true, collapsed: false } },
        };
    });
    it("[anchor: left | right] affect only margin left", () => {
        // ------------------------------------------------------------
        // special for persistent behavior : flexible
        // should only affect marginLeft as negative value, otherwise does not work
        // css constraint
        // todo support rtl direction
        let model = PersistentSidebarEffect_1.default(baseConfig, state);
        expect(getMarginStyle(model)).toEqual({
            marginLeft: 256,
        });
        baseConfig.anchor = "right";
        model = PersistentSidebarEffect_1.default(baseConfig, state);
        expect(getMarginStyle(model)).toEqual({
            marginLeft: -256,
        });
    });
});
describe("[ObjectReference] Mixed Behavior", () => {
    let baseConfig;
    let state;
    beforeEach(() => {
        baseConfig = {
            id: "persistent-sidebar",
            anchor: "left",
            collapsible: true,
            collapsedWidth: 80,
            width: 256,
            persistentBehavior: {
                object1: "fit",
                object2: "flexible",
            },
        };
        state = {
            sidebar: { "persistent-sidebar": { open: true, collapsed: false } },
        };
    });
    it("[anchor: left] return correct width and margin for each object", () => {
        let model = PersistentSidebarEffect_1.default(baseConfig, state);
        // object 1
        expect(getMarginStyle(model, "object1")).toEqual({
            marginLeft: 256,
        });
        expect(getWidthStyle(model, "object1")).toEqual({
            width: "calc(100% - 256px)",
        });
        // object 2
        expect(getMarginStyle(model, "object2")).toEqual({
            marginLeft: 256,
        });
        expect(getWidthStyle(model, "object2")).toEqual({
            width: "100%",
        });
    });
    it("[anchor: right] return correct width and margin for each object", () => {
        baseConfig.anchor = "right";
        state.sidebar["persistent-sidebar"].collapsed = true;
        let model = PersistentSidebarEffect_1.default(baseConfig, state);
        // object 1
        expect(getMarginStyle(model, "object1")).toEqual({
            marginRight: 80,
        });
        expect(getWidthStyle(model, "object1")).toEqual({
            width: "calc(100% - 80px)",
        });
        // object 2
        expect(getMarginStyle(model, "object2")).toEqual({
            marginLeft: -80,
        });
        expect(getWidthStyle(model, "object2")).toEqual({
            width: "100%",
        });
    });
});
//# sourceMappingURL=PersistentSidebarEffect.spec.js.map