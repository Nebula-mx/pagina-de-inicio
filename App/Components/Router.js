import { loadSettingsContent, openSettingsMenu, settingsContent } from "./SettingsMenu.js"


export async function Router() {
    const { hash } = location

    if(hash.includes("#/settings")) {
        openSettingsMenu()
        if(hash.includes("#/settings/general")) loadSettingsContent(settingsContent.general)
        if(hash.includes("#/settings/appereance")) loadSettingsContent(settingsContent.appereance)
        if(hash.includes("#/settings/about")) loadSettingsContent(settingsContent.about)
    }
}
