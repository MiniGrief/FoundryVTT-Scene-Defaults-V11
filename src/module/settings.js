import { modName } from "./utils.js";
import { PresetConfigWindow } from "./presetConfigWindow.js";
import { FoundryDefaults } from "./foundryDefaults.js";

const presetsData = "PresetsData";
const currentPreset = "CurrentPreset";

export class Settings {
    static getCurrentPresetData() {
        const presets = game.settings.get(modName, presetsData);
        const index = game.settings.get(modName, currentPreset);
        if(presets?.length > index) {
            return presets[index];
        }
        else {
            return FoundryDefaults.getDefault();
        }
    }

    static updateCurrentPresetData(data) {
        let presets = game.settings.get(modName, presetsData);
        const index = game.settings.get(modName, currentPreset);
        if(!(presets?.length > 0)) {
            presets = [{}];
        }
        if(presets.length > index) {
            presets[index] = data;
            game.settings.set(modName, presetsData, presets);
        }
        else {
            console.error("Scene Defaults | Index out of range");
        }
    }

    static registerSettings() {
        game.settings.registerMenu(modName, "Menu", {
            name: "scene-defaults.button.name",
            label: "scene-defaults.button.label",
            hint: "scene-defaults.button.hint",
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