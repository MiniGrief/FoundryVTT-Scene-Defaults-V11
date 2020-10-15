Hooks.on("preCreateScene", function(data) {
    console.log("Before Creation");
    console.log(data);
    data.name = "Witchcraft";
    data.globalLight = true;
});

Hooks.on("createScene", function(scene) {
    console.log("After Creation");
    console.log(scene.data);
});