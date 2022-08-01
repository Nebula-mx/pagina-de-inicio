import { App } from "./Components/App.js";
import { loadSettings } from "./Components/loadSettings.js";
import { Router } from "./Components/Router.js"


document.addEventListener("DOMContentLoaded", e => {
    if(!location.hash.includes("#/settings")) location.hash = "#/"
    loadSettings()
    App()
    Router()
})
window.addEventListener("hashchange", Router)