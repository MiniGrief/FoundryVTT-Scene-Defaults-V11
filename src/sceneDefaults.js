import { Settings } from "./module/settings.js";

Hooks.on("init", function() {
    console.log("Scene Defaults | Initializing");
    Settings.registerSettings();
});

Hooks.on("preCreateScene", function(data, options) {
    if(!options.sdUseOriginal) {
        console.log("Scene Defaults | Replacing Defaults");
        const newData = Settings.getCurrentPresetData();
        mergeObject(data, newData, true, true, true);
    }
});