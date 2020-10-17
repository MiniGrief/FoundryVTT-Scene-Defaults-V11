import { modName } from "./utils.js";
import { Settings } from "./settings.js";

export class PresetConfigWindow extends FormApplication {
    constructor(object, options = {}) {
        super(object, options);
        Settings.debug();
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "scene-default-form",
            title: "Scene Default Configuration",
            template: "./modules/scene-defaults/templates/presetConfigWindow.html",
            classes: ["sheet", "scene-sheet"],
            width: 720,
            closeOnSubmit: true
        });
    }

    getData() {
        let data = Settings.getCurrentPresetData();
        console.log("Get", data);
        return data;
    }

    async _updateObject(entity, data) {
        console.log("Update", data);
        data.initial = null;
        Settings.updateCurrentPresetData(data);
    }

    activateListeners(html) {
        super.activateListeners(html);
    }
}