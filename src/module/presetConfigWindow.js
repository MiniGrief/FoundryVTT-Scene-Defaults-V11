import { Settings } from "./settings.js";
import { VersionHandler } from "./versionHandler.js";

/**
 * The window for configuring the scene presets
 */
export class PresetConfigWindow extends FormApplication {
    constructor(object, options = {}) {
        super(object, options);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "scene-default-form",
            title: game.i18n.localize("scene-defaults.window.title"),
            template: VersionHandler.getTemplate(),
            classes: ["sheet", "scene-sheet"],
            width: 720,
            closeOnSubmit: true
        });
    }

    getData() {
        let data = Settings.getActivePresetData();
        data.gridTypes = this._getGridTypes();
        data.weatherTypes = this._getWeatherTypes();
        // Getting entities was deprecated in 0.8.0,
        // replaced by getting documents
        if(isNewerVersion("0.8.0", game.data.version)) {
            // Old
            data.playlists = this._getEntities(game.playlists);
            data.journals = this._getEntities(game.journal);
        }
        else {
            // New
            data.playlists = this._getDocuments(game.playlists);
            const playlist = game.playlists.get(data.playlist);
            data.sounds = this._getDocuments(playlist?.data.sounds ?? []);
            data.journals = this._getDocuments(game.journal);
        }

        // Global illumination threshold
        data.hasGlobalThreshold = data.globalLightThreshold !== null;
        data.globalLightThreshold = data.globalLightThreshold ?? 0;

        return data;
    }

    async _updateObject(entity, data) {
        //Initial view - not used
        data.initial = null;
        //Handled weirdly
        data.permission = {
            default: data["permission.default"]
        };
        //Global illumination set to null if unchecked
        if(!data.hasGlobalThreshold) {
            data.globalLightThreshold = null;
        }
        Settings.updateActivePresetData(data);
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('button[name="reset-all"]').click(this._resetSettings.bind(this));
        html.find("select[name='playlist']").change(this._onChangePlaylist.bind(this));
    }

    /**
     * Resets the form to use Foundry's default values.
     * @param {Object} event 
     */
    _resetSettings(event) {
        event.preventDefault();
        const form = event.target.form;
        if(!form) {
            console.error("Scene Defaults | Form not found");
            return;
        }
        const defaultData = VersionHandler.getFoundryDefaultScene();
        for(let [k, v] of Object.entries(defaultData)) {
            if(k === "permission") {
                k = "permission.default";
                v = v.default;
            }
            if(k === "globalLightThreshold") {
                v = 0;
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
            //Update a derived element (range label, color picker) if it exists
            const derivedElement = k + (k.endsWith("Color") ? "Picker" : "Label");
            if(form[derivedElement]) {
                form[derivedElement].value = v;
            }
        }
        if(form["hasGlobalThreshold"]) {
            form["hasGlobalThreshold"].checked = defaultData.globalLightThreshold !== null;
        }
    }

    /**
     * Handle updating the select menu of PlaylistSound options when the Playlist is changed
     * @param {Event} event   The initiating select change event
     * @private
     */
    _onChangePlaylist(event) {
      event.preventDefault();
      const playlist = game.playlists.get(event.target.value);
      const sounds = this._getDocuments(playlist?.sounds || []);
      const options = ['<option value=""></option>'].concat(sounds.map(s => {
        return `<option value="${s.id}">${s.name}</option>`;
      }));
      const select = this.form.querySelector(`select[name="playlistSound"]`);
      select.innerHTML = options.join("");
    }

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
  
    /**
     * Get the alphabetized Documents which can be chosen as a configuration for the Scene
     * @param {WorldCollection} collection
     * @return {object[]}
     * @private
     */
    _getDocuments(collection) {
        const documents = collection.map(doc => {
          return {id: doc.id, name: doc.name};
        });
        documents.sort((a, b) => a.name.localeCompare(b.name));
        return documents;
    }
}