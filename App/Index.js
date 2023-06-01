import { sManager } from "./Components/loadSettings.js";
import { Router } from "./Components/Router.js";
import { App } from "./Components/App.js"

document.addEventListener("readystatechange", () => {
    if(!location.hash.match("#/settings")) location.hash = "#/"
    sManager.loadConfig()
    Router.insertMenu()
    App()
})