export class FoundryDefaults {
    static getDefault() {
        const ver0_6_6 = {
            name: "Scene",
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
        }
        return ver0_6_6;
    }
}