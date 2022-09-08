import { loadSettingsContent, openSettingsMenu, settingsContent } from "./SettingsMenu.js"


export async function Router() {
    const { hash } = location

    if(hash.includes("#/settings")) {
        openSettingsMenu()
        if(hash.includes("#/settings/general")) return loadSettingsContent(settingsContent.general)
        if(hash.includes("#/settings/appereance")) return loadSettingsContent(settingsContent.appereance)
        if(hash.includes("#/settings/keybinds")) return loadSettingsContent(settingsContent.keybinds)
        if(hash.includes("#/settings/about")) return loadSettingsContent(settingsContent.about)
    }
}
