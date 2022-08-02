import { App } from "./Components/App.js";
import { loadSettings } from "./Components/loadSettings.js";
import { Router } from "./Components/Router.js"
import { loadTheme } from "./Components/Settings/loadTheme.js";
(() => {
    document.addEventListener("DOMContentLoaded", e => {
        if(!location.hash.includes("#/settings")) location.hash = "#/"
        loadSettings()
        loadTheme()
        App()
        Router()
    })
    window.addEventListener("hashchange", Router)
})();