import { Settings } from "./settings.js";
import { FoundryDefaults } from "./foundryDefaults.js";

export class PresetConfigWindow extends FormApplication {
    constructor(object, options = {}) {
        super(object, options);
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
        data.gridTypes = this._getGridTypes();
        data.weatherTypes = this._getWeatherTypes();
        data.playlists = this._getEntities(game.playlists);
        data.journals = this._getEntities(game.journal);
        return data;
    }

    async _updateObject(entity, data) {
        data.initial = null;
        data.permission = {
            default: data["permission.default"]
        };
        Settings.updateCurrentPresetData(data);
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('button[name="reset-all"]').click(this._resetSettings.bind(this));
    }

    _resetSettings(event) {
        event.preventDefault();
        const form = event.target.form;
        if(!form) {
            return;
        }
        const defaultData = FoundryDefaults.getDefault();
        for(let [k, v] of Object.entries(defaultData)) {
            if(k === "permission") {
                k = "permission.default";
                v = v.default;
            }
            const field = form[k]
            if(field) {
                if(field.type === "checkbox") {
                    field.checked = v;
                }
                else {
                    field.value = v;
                }
            }
        }
        //Update the derived elements
        form["backgroundColorPicker"].value = defaultData.backgroundColor;
        form["gridColorPicker"].value = defaultData.gridColor;
        form["darknessLabel"].value = defaultData.darkness;
    }

    /* -------------------------------------------- */
    /**
     * Get an enumeration of the available grid types which can be applied to this Scene
     * @return {Object}
     * @private
     */
    _getGridTypes() {
        const labels = {
        "GRIDLESS": "SCENES.GridGridless",
        "SQUARE": "SCENES.GridSquare",
        "HEXODDR": "SCENES.GridHexOddR",
        "HEXEVENR": "SCENES.GridHexEvenR",
        "HEXODDQ": "SCENES.GridHexOddQ",
        "HEXEVENQ": "SCENES.GridHexEvenQ"
      };
      return Object.keys(CONST.GRID_TYPES).reduce((obj, t) => {
          obj[CONST.GRID_TYPES[t]] = labels[t];
          return obj;
      }, {});
    }
  
    /* -------------------------------------------- */
    /**
     * Get the available weather effect types which can be applied to this Scene
     * @return {Object}
     * @private
     */
    _getWeatherTypes() {
      const types = {};
      for ( let [k, v] of Object.entries(CONFIG.weatherEffects) ) {
        types[k] = v.label;
      }
      return types;
    }
  
    /* -------------------------------------------- */
    /**
     * Get the alphabetized entities which can be chosen as a configuration for the scene
     * @param {EntityCollection} collection
     * @return {Array}
     * @private
     */
    _getEntities(collection) {
      const entities = collection.entities.map(e => {
        return {_id: e.data._id, name: e.data.name};
      });
      entities.sort((a, b) => a.name.localeCompare(b.name));
      return entities;
    }
}