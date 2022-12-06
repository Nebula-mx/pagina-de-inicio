import { App } from "./Components/App.js";
import { sManager } from "./Components/loadSettings.js";
import { Router } from "./Components/Router.js"

document.addEventListener("DOMContentLoaded", () => {
    if(!location.hash.match("#/settings")) location.hash = "#/"
    sManager.loadConfig()
    App()
})
window.addEventListener("hashchange", Router)
