import { Settings } from "./module/settings.js";

Hooks.on("setup", function() {
    console.log("Scene Defaults | Setting Up");
    Settings.registerSettings();
});

Hooks.on("ready", function() {
    Settings.reset();
});

Hooks.on("preCreateScene", function(data, options) {
    console.log("Before Creation");
    console.log(data, options);
    if(!options.sdUseOriginal) {
        const newData = Settings.getCurrentPresetData();
        mergeObject(data, newData, true, true, true);
    }
});