import { Settings } from "./module/settings.js";
import { VersionHandler } from "./module/versionHandler.js";
import { isCopy } from "./module/utils.js";

Hooks.on("init", function() {
    console.log("Scene Defaults | Initializing");
    Settings.registerSettings();
    VersionHandler.setEffectiveVersion(game.data.version);
});

Hooks.on("ready", function() {
    if(Settings.getSavedVersion() !== VersionHandler.effectiveVersion) {
        Settings.migrateSavedPresetsToCurrentVersion();
    }
});

Hooks.on("preCreateScene", function(scene, data, options) {
    // With 0.8.0's document change, we need to update the scene's data differently
    // Include backwards compatibility for now
    // Note: This hook's parameters changed from {data, options} to {scene, data, options}
    if(isNewerVersion("0.8.0", game.data.version)) {
        preCreateSceneLegacy(scene, data);
        return;
    }

    if(!options.sdUseOriginal && !isCopy(data)) {
        console.log("Scene Defaults | Replacing Defaults");
        const preset = Settings.getActivePresetData();
        const newData = mergeObject(data, preset, {
            insertKeys: true,
            insertValues: true,
            overwrite: true,
            inplace: false
        });

        scene.data.update(newData);
    }
});

function preCreateSceneLegacy(data, options) {
    if(!options.sdUseOriginal && !isCopy(data)) {
        console.log("Scene Defaults | Replacing Defaults");
        const newData = Settings.getActivePresetData();
        mergeObject(data, newData, true, true, true);
    }
};