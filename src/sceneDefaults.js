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
	console.log("Scene Defaults | Replacing Defaults");
	const preset = Settings.getActivePresetData();
	const newData = mergeObject(data, preset, {
		insertKeys: true,
		insertValues: true,
		overwrite: true,
		inplace: false
	});

	scene.updateSource(newData);
});
