import { modName } from "./utils.js";
import { PresetConfigWindow } from "./presetConfigWindow.js";
import { VersionHandler } from "./versionHandler.js";

export const presetsData = "PresetsData";
export const currentPreset = "CurrentPreset";
export const savedVersion = "Version";

export class Settings {
    static wipeSettings() {
        console.warn("Scene Defaults | Wiping all presets");
        game.settings.set(modName, presetsData, null);
    }

    static getCurrentPresetData() {
        const presets = game.settings.get(modName, presetsData);
        const index = game.settings.get(modName, currentPreset);
        if(presets?.length > index) {
            return presets[index].data;
        }
        else {
            return VersionHandler.getFoundryDefaultScene();
        }
    }

    static updateCurrentPresetData(data) {
        let presets = game.settings.get(modName, presetsData);
        const index = game.settings.get(modName, currentPreset);
        if(!(presets?.length > 0)) {
            presets = [{}];
        }
        if(presets.length > index) {
            presets[index] = {
                data
            };
            game.settings.set(modName, presetsData, presets);
        }
        else {
            console.error("Scene Defaults | Index out of range");
        }
    }

    static migrateSavedPresetsToCurrentVersion() {
        if(!VersionHandler.effectiveVersion) {
            console.error("Scene Defaults | Version was not set before trying to migrate presets.");
            return;
        }
        let presets = game.settings.get(modName, presetsData);
        if(presets) {
            //If this module has run before, add any required values for the new version to the presets
            console.log("Scene Defaults | Migrating saved presets to version " + VersionHandler.effectiveVersion);
            for(let i = 0; i < presets.length; i++) {
                const preset = presets[i];
                preset.data = VersionHandler.migrateSceneData(preset.data, VersionHandler.effectiveVersion);
            }
        }
        else {
            // If this is the first time with the module, set up a preset with default values
            console.log("Scene Defaults | Setting up initial preset");
            presets = [{
                data: VersionHandler.getFoundryDefaultScene()
            }];
        }
        game.settings.set(modName, presetsData, presets);
        game.settings.set(modName, savedVersion, VersionHandler.effectiveVersion);
    }

    static getSavedVersion() {
        return game.settings.get(modName, savedVersion);
    }

    static registerSettings() {
        game.settings.registerMenu(modName, "Menu", {
            name: "scene-defaults.menu.name",
            label: "scene-defaults.menu.label",
            hint: "scene-defaults.menu.hint",
            icon: "fas fa-map",
            type: PresetConfigWindow,
            restricted: true
        });
        
        game.settings.register(modName, presetsData, {
            scope: "world",
            config: false
        });

        game.settings.register(modName, currentPreset, {
            scope: "world",
            config: false,
            default: 0
        });

        game.settings.register(modName, savedVersion, {
            scope: "world",
            config: false
        });
    }
}