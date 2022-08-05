import { loadSettingsContent, openSettingsMenu, setSetting, settingsContent } from "./SettingsMenu.js"


export async function Router() {
    const { hash } = location

    if(hash.includes("#/settings")) {
        openSettingsMenu()
        if(hash.includes("#/settings/general")) loadSettingsContent(settingsContent.general)
        if(hash.includes("#/settings/appereance")) loadSettingsContent(settingsContent.appereance)
        
        document.addEventListener("change", e => {
            console.log("from change" ,e.target)
            if(e.target.matches(".option-select")) setSetting(e.target.children[e.target.selectedIndex])
            if(e.target.matches("#blur-range")) setSetting(e.target)
        })
    }
}