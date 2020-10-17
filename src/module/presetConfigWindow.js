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
        data.gridTypes = this._getGridTypes();
        data.weatherTypes = this._getWeatherTypes();
        data.playlists = this._getEntities(game.playlists);
        data.journals = this._getEntities(game.journal);
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