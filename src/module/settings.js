import { modName } from "./utils.js";
import { PresetConfigWindow } from "./presetConfigWindow.js";
import { VersionHandler } from "./versionHandler.js";

export const presetsData = "PresetsData";
export const savedVersion = "Version";

/**
 * A class to handle interacting with Foundry's settings.
 * Mostly used to save and load presets.
 */
export class Settings {
    /**
     * Sets all settings to null.
     * Please don't call this outside of testing.
     * Please.
     */
    static wipeSettings() {
        console.warn("Scene Defaults | Wiping all presets");
        game.settings.set(modName, presetsData, null);
        game.settings.set(modName, savedVersion, null);
    }

    /**
     * @returns {Object} The data for the active preset, or the default data if there is none
     */
    static getActivePresetData() {
        const presets = game.settings.get(modName, presetsData);
        if(presets?.length > 0) {
            return presets[0].data;
        }
        else {
            return VersionHandler.getFoundryDefaultScene();
        }
    }

    /**
     * Updates the active preset with the user-defined settings
     * @param {Object} data The new settings for the preset
     */
    static updateActivePresetData(data) {
        console.log("Scene Defaults | Saving Preset settings");
        let presets = game.settings.get(modName, presetsData);
        if(!presets?.length) {
            console.warn("Scene Defaults | Presets were not loaded before being updated");
            presets = [{
                data
            }];
        }
        else {
            presets[0] = {
                data
            };
        }
        game.settings.set(modName, presetsData, presets);
    }

    /**
     * Update the user's saved presets, bringing them up to the newest version
     * Any values in the new version that weren't in the old version are added,
     *  using Foundry's default values.
     * Existing values are kept as the user had saved them.
     */
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
                preset.data = VersionHandler.migrateSceneData(preset.data);
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

    /**
     * @returns {string} The Foundry version that the existing presets used.
     */
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

        game.settings.register(modName, savedVersion, {
            scope: "world",
            config: false
        });
    }
}