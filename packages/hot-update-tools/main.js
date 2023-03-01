module.exports = {
    load() {},
    unload() {},
    messages: {
        showPanel() {
            //Editor.log(JSON.stringify(Editor.argv));
            Editor.Panel.open("hot-update-tools",Editor.argv);
        },
        test(t, e) {
            Editor.log(e), Editor.Ipc.sendToPanel("hot-update-tools", "hot-update-tools:onBuildFinished")
        },
        // "editor:build-finished": function (t, e) {
            // let i = (new Date).getTime();
            // Editor.Ipc.sendToPanel("hot-update-tools", "hot-update-tools:onBuildFinished", i), Editor.require("packages://hot-update-tools/core/CfgUtil.js").updateBuildTimeByMain(i)
        // }
    }
};
