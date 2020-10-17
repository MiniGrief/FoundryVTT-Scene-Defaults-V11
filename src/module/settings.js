import { modName } from "./utils.js";
import { PresetConfigWindow } from "./presetConfigWindow.js";

const presetsData = "PresetsData";
const foundryDefault = "FoundryDefault";
const currentPreset = "CurrentPreset";

export class Settings {

    static debug() {
        console.log("Scene Defaults | All Settings");
        console.log(game.settings.get(modName, presetsData));
        console.log(game.settings.get(modName, foundryDefault));
        console.log(game.settings.get(modName, currentPreset));
    }

    static reset() {
        console.log("Scene Defaults | Resetting Presets");
        console.log(game.settings.set(modName, presetsData, null));
    }

    static getCurrentPresetData() {
        const presets = game.settings.get(modName, presetsData);
        const index = game.settings.get(modName, currentPreset);
        if(presets?.length > index) {
            return presets[index];
        }
        else {
            return game.settings.get(modName, foundryDefault);
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
            console.warn("Scene Defaults | Index out of range");
        }
    }

    static resetPresets() {
        const presets = [game.settings.get(modName, foundryDefault)];
        game.settings.set(modName, presetsData);
    }

    static saveFoundryDefault(data) {
        game.settings.set(modName, foundryDefault, data);
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

        game.settings.register(modName, foundryDefault, {
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