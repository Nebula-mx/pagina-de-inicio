import { App } from "./Components/App.js";
import { sManager } from "./Components/loadSettings.js";
import { Router } from "./Components/Router.js"


document.addEventListener("DOMContentLoaded", async (e) => {
    if(!location.hash.includes("#/settings")) location.hash = "#/"
    await sManager.loadConfig()
    App()
})
window.addEventListener("hashchange", Router)