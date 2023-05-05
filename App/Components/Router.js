import { settingsMenuManager } from "./SettingsMenu.js"

const routes = {
    "#/settings/general": () => {
        settingsMenuManager.showMenu()
        settingsMenuManager.showCategory("general")
    },
    "#/settings/appearance": () => {
        settingsMenuManager.showMenu()
        settingsMenuManager.showCategory("appearance")
    },
    "#/settings/keybinds": () => {
        settingsMenuManager.showMenu()
        settingsMenuManager.showCategory("keybinds")
    },
    "#/settings/about": () => {
        settingsMenuManager.showMenu()
        settingsMenuManager.showCategory("about")
    },
    "#/settings/appearance/theme-editor": () => {
        settingsMenuManager.showMenu()
        settingsMenuManager.showCategory("appearance")
        document.querySelector("[data-typeofmenu]").click()
    }
}
class ROUTER {
    constructor() {
        this.previousRoute = null
    }
    insertMenu(){
        if(routes.hasOwnProperty(location.hash)){
            routes[location.hash]()
            this.previousRoute = location.hash
        }
    }
}
export const Router = new ROUTER()