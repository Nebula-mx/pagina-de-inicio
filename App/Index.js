import { App } from "./Components/App.js";
import { sManager } from "./Components/loadSettings.js";
import { Router } from "./Components/Router.js"
import { settingsMenuManager } from "./Components/SettingsMenu.js";


document.addEventListener("DOMContentLoaded", async (e) => {
    if(!location.hash.includes("#/settings")) location.hash = "#/"
    await sManager.loadConfig()
    settingsMenuManager.showMenu()
    App()
})
window.addEventListener("hashchange", Router)