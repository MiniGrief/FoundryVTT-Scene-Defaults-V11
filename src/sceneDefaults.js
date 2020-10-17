import { Settings } from "./module/settings.js";

Hooks.on("setup", function() {
    console.log("Scene Defaults | Setting Up");
    Settings.registerSettings();
});

Hooks.on("ready", function() {
    Settings.reset();
    //Save the default Foundry scene options
    let scenePromise = Scene.create(
    {
        name: "Scene"
    }, 
    {
        useOriginal: true,
        saveAsDefault: true
    });
    scenePromise.then(function(scene) {
        scene.delete();
    });
});

Hooks.on("preCreateScene", function(data, options) {
    console.log("Before Creation");
    console.log(data, options);
    if(!options.useOriginal) {
        const newData = Settings.getCurrentPresetData();
        mergeObject(data, newData, true, true, true);
    }
});

Hooks.on("createScene", function(scene, options) {
    console.log("After Creation");
    console.log(scene.data, options);
    if(options.saveAsDefault) {
        Settings.saveFoundryDefault(scene.data)
    }
});