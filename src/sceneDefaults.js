import { Settings } from "./module/settings.js";
import { VersionHandler } from "./module/versionHandler.js";
import { isCopy } from "./module/utils.js";

Hooks.on("init", function() {
    console.log("Scene Defaults | Initializing");
    Settings.registerSettings();
    VersionHandler.setEffectiveVersion(game.data.version);
    if(Settings.getSavedVersion() !== VersionHandler.effectiveVersion) {
        Settings.migrateSavedPresetsToCurrentVersion();
    }
});

Hooks.on("preCreateScene", function(data, options) {
    if(!options.sdUseOriginal && !isCopy(data)) {
        console.log("Scene Defaults | Replacing Defaults");
        const newData = Settings.getActivePresetData();
        mergeObject(data, newData, true, true, true);
    }
});