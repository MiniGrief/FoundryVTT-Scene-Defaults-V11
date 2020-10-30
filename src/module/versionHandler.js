import { defaultSceneData } from "./foundryDefaults.js";

/**
 * A class to help manage support for different versions of Foundry.
 */
export class VersionHandler {
    // The Foundry versions that have been implemented
    static implementedFoundryVersions = ["0.6.6", "0.7.5"];
    // The version we are treating Foundry as
    static effectiveVersion;

    /**
     * Sets the "effectiveVersion" parameter to the newest
     *  supported Foundry version that is not newer than it.
     * @param {string} foundryVersion The current true version of Foundry
     */
    static setEffectiveVersion(foundryVersion) {
        if(VersionHandler.effectiveVersion) {
            console.warn("Scene Defaults | Version is being set multiple times");
            return;
        }
        VersionHandler.effectiveVersion = this.findClosestImplementedVersion(foundryVersion);
    }

    /**
     * Essentially "floors" the current Foundry version to an implemented version
     * @param {string} foundryVersion The current true version of Foundry
     * @returns {string} The closest implemented version
     */
    static findClosestImplementedVersion(foundryVersion) {
        for(let i = VersionHandler.implementedFoundryVersions.length - 1; i >= 0; i--) {
            const version = VersionHandler.implementedFoundryVersions[i];
            if(version === foundryVersion || isNewerVersion(foundryVersion, version)) {
                return version;
            }
        }
        console.error("Scene Defaults | Foundry Version is unsupported.");
    }

    /**
     * @returns {Object} The default data Foundry uses to create scenes for the current effective version of Foundry
     */
    static getFoundryDefaultScene() {
        if(!VersionHandler.effectiveVersion) {
            console.error("Scene Defaults | Version was not set before getting Foundry defaults");
        }
        return defaultSceneData[VersionHandler.effectiveVersion];
    }

    /**
     * @returns {string} the path to the template used to configure scene defaults for the current effective version of Foundry
     */
    static getTemplate() {
        if(!VersionHandler.effectiveVersion) {
            console.error("Scene Defaults | Version was not set before getting template");
        }
        const templates = {
            "0.6.6": "./modules/scene-defaults/templates/defaultSceneConfigs/defaultSceneConfig-0-6-6.html",
            "0.7.5": "./modules/scene-defaults/templates/defaultSceneConfigs/defaultSceneConfig-0-7-5.html"
        }
        return templates[VersionHandler.effectiveVersion];
    }

    /**
     * Migrates a scene's data to the given Foundry version,
     *  adding any missing settings by using Foundry's default settings.
     * No data is (read: should be) overwritten.
     * The updated data is returned, rather than updated in place.
     * @param {Object} data Data from an existing preset.
     * @param {string} targetVersion The version to which to update the data
     * @returns {Object} The migrated data
     */
    static migrateSceneData(data, targetVersion) {
        targetVersion = this.findClosestImplementedVersion(targetVersion);
        let targetDefaultData = defaultSceneData[targetVersion];
        if(!data) {
            console.warn("Scene Defaults | Trying to migrate null data. Returning default data")
            return targetDefaultData;
        }
        // Add all keys needed for the target version, but don't overwrite existing data
        // Extra keys that were saved but aren't used in the target version will last 
        //   until the scene default config window is opened and saved
        return mergeObject(data, targetDefaultData, {
            insertKeys: true,
            insertValues: true,
            overwrite: false,
            inplace: false
        });
    }
}