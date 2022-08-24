import { App } from "./Components/App.js";
import { loadSettings } from "./Components/loadSettings.js";
import { Router } from "./Components/Router.js"


document.addEventListener("DOMContentLoaded", async (e) => {
    if(!location.hash.includes("#/settings")) location.hash = "#/"
    App()
    Router()
    await loadSettings()
})
window.addEventListener("hashchange", Router)