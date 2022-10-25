import { settingsMenuManager } from "./SettingsMenu.js"

export function Router(e) {
    const { hash } = location
    if(hash.match("settings")) {
        if(settingsMenuManager.apliedMenuStatus === false) settingsMenuManager.showMenu()
        if(hash.match("general")) settingsMenuManager.showCategory("general")
        if(hash.match("keybinds")) settingsMenuManager.showCategory("keybinds")
        if(hash.match("appearance")) settingsMenuManager.showCategory("appearance")
        if(hash.match("about")) settingsMenuManager.showCategory("about")
    }
}