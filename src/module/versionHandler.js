import { defaultSceneData } from "./foundryDefaults.js";

export class VersionHandler {
    static implementedFoundryVersions = ["0.6.6", "0.7.5"];
    static effectiveVersion;

    static setEffectiveVersion(foundryVersion) {
        if(VersionHandler.effectiveVersion) {
            console.warn("Scene Defaults | Version is being set multiple times");
            return;
        }
        for(let i = VersionHandler.implementedFoundryVersions.length - 1; i >= 0; i--) {
            const version = VersionHandler.implementedFoundryVersions[i];
            if(version === foundryVersion || isNewerVersion(foundryVersion, version)) {
                VersionHandler.effectiveVersion = version;
                break;
            }
        }
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
}