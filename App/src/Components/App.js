import { sManager } from "../../settingsManager.js"
import { themeManager } from "./loadTheme.js"
import { Router } from "./Router.js"
import { mainView } from "../Views/mainView.js"

export function refreshModules() {
    themeManager.startModule()
    mainView()
}
function startApp(){
    if(!location.hash.match("#/settings")) location.hash = "#/"
    sManager.loadConfig()
    mainView()
    themeManager.startModule()
    Router.insertMenu()
}
startApp()