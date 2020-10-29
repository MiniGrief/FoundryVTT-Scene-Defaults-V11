import { modName } from "./utils.js";
import { PresetConfigWindow } from "./presetConfigWindow.js";
import { VersionHandler } from "./versionHandler.js";

export const presetsData = "PresetsData";
export const currentPreset = "CurrentPreset";

export class Settings {
    static wipeSettings() {
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
                version: VersionHandler.effectiveVersion,
                data
            };
            game.settings.set(modName, presetsData, presets);
        }
        else {
            console.error("Scene Defaults | Index out of range");
        }
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
    }
}