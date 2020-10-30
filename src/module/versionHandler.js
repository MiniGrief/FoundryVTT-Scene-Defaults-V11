import { defaultSceneData } from "./foundryDefaults.js";

export class VersionHandler {
    static implementedFoundryVersions = ["0.6.6", "0.7.5"];
    static effectiveVersion;

    static setEffectiveVersion(foundryVersion) {
        if(VersionHandler.effectiveVersion) {
            console.warn("Scene Defaults | Version is being set multiple times");
            return;
        }
        VersionHandler.effectiveVersion = this.findClosestImplementedVersion(foundryVersion);
    }

    static findClosestImplementedVersion(foundryVersion) {
        for(let i = VersionHandler.implementedFoundryVersions.length - 1; i >= 0; i--) {
            const version = VersionHandler.implementedFoundryVersions[i];
            if(version === foundryVersion || isNewerVersion(foundryVersion, version)) {
                return version;
            }
        }
        console.error("Scene Defaults | Foundry Version is unsupported.");
    }

    static getFoundryDefaultScene() {
        if(!VersionHandler.effectiveVersion) {
            console.error("Scene Defaults | Version was not set before getting Foundry defaults");
        }
        return defaultSceneData[VersionHandler.effectiveVersion];
    }

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