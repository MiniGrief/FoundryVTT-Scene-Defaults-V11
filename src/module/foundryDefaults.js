//A map of the default scene settings for each supported Foundry version
export const defaultSceneData = {
    "0.6.6": {
        journal: null,
        img: null,
        width: 4000,
        height: 3000,
        backgroundColor: "#999999",
        gridType: 1,
        grid: 100,
        shiftX: 0,
        shiftY: 0,
        gridColor: "#000000",
        gridUnits: "ft",
        gridDistance: 5,
        gridColor: "#000000",
        gridAlpha: 0.2,
        tokenVision: true,
        globalLight: false,
        fogExploration: true,
        darkness: 0,
        playlist: null,
        weather: null,
        permission: {
            default: 0
        },
        navigation: true,
        navName: null
    }, 
    "0.7.5": {
        navigation: true,
        navName: null,
        permission: {
            default: 0
        },
        img: null,
        width: 4000,
        height: 3000,
        padding: 0.25,
        backgroundColor: "#999999",
        gridType: 1,
        grid: 100,
        shiftX: 0,
        shiftY: 0,
        gridColor: "#000000",
        gridAlpha: 0.2,
        gridDistance: 5,
        gridUnits: "ft",
        tokenVision: true,
        fogExploration: true,
        globalLight: false,
        globalLightThreshold: null,
        darkness: 0,
        journal: null,
        playlist: null,
        weather: null
    }
}