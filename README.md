# Scene Defaults
![Latest Release Download Count](https://img.shields.io/badge/dynamic/json?label=Downloads%20(Latest)&query=assets%5B1%5D.download_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2FBradfordC%2FFoundryVTT-Scene-Defaults%2Freleases%2Flatest)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fscene-defaults&colorB=4aa94a)
![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FBradfordC%2FFoundryVTT-Scene-Defaults%2Fmaster%2Fsrc%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)

A module that allows you to change the default settings when creating new scenes. For instance, you can have new scenes created with a grid size of 50 instead of 100 or with Global Illumination turned on, without having to change it each time.

# Usage
Simply click on "Edit Scene Defaults" under "Module Settings", edit the settings to your heart's content, and save it. Any scenes you create will start out with those settings.

# Compatibility
* **Foundry Version**: Scene Defaults is compatible with Foundry VTT 0.6.6 through 0.8.6, and is safe to use with newer versions as well. (The window for editing scene defaults might get funky, though.)
* **Systems**: Scene Defaults should be compatible with all systems, but won't let you edit scene settings that they might add.
* **Modules**: Scene Defaults shouldn't cause issues with other modules add to scene settings, but won't enable you to change default options for them.

# License
Scene Defaults is licensed under the MIT License (see LICENSE file), as well as Foundry VTT's [Limited License Agreement for Module Development 05/29/2020](https://foundryvtt.com/article/license/).