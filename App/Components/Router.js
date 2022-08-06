import { loadSettingsContent, openSettingsMenu, setSetting, settingsContent } from "./SettingsMenu.js"


export async function Router() {
    const { hash } = location

    if(hash.includes("#/settings")) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude)
          });

        openSettingsMenu()
        if(hash.includes("#/settings/general")) loadSettingsContent(settingsContent.general)
        if(hash.includes("#/settings/appereance")) loadSettingsContent(settingsContent.appereance)
        if(hash.includes("#/settings/about")) loadSettingsContent(settingsContent.about)
        
        document.addEventListener("change", e => {
            if(e.target.matches(".option-select")) setSetting(e.target.children[e.target.selectedIndex])
            if(e.target.matches("#blur-range")) setSetting(e.target)
        })
    }
}