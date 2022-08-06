import { Clock } from "./Clock.js";
import { deleteShortcut } from "./ContextMenuActions.js";
import LoadShortcuts from "./LoadShortcuts.js";
import { Search } from "./Search.js";
import { importExportSetting } from "./Settings/ImportExportSettings.js";
import { closeSettingsMenu, setSetting } from "./SettingsMenu.js";
import { showActions } from "./ShortcutActions.js";
import { ShortcutForm ,closeShortcutForm, saveForm} from "./ShortcutForm.js";
import { getWeather } from "./Weather.js";


export async function App(){
    Clock()
    await getWeather()
    LoadShortcuts()
}
document.addEventListener("click", async(e) => {
    console.log(e.target)

    if(e.target.matches("[data-AppImg]")){
        window.open(`${e.target.parentNode.getAttribute("data-url")}`)
    }
    
    if(e.target.matches("#add-shortcut") || e.target.matches("#add-shortcut img")) await ShortcutForm("saveBtn")
    if(e.target.matches("#closeBtn")) closeShortcutForm()
    if(e.target.matches("#saveBtn")) saveForm()

    if(e.target.matches("#edit-btn")) showActions(e.target)
    if(e.target.matches("#context-menu_deleteBtn")) deleteShortcut(e.target.parentNode.parentNode.parentNode.parentNode)
    if(e.target.matches("#context-menu_editBtn")) await ShortcutForm("editSaveBtn", e.target.parentNode.parentNode.parentNode.parentNode)
    if(e.target.matches("#editSaveBtn")) saveForm("edit")

    if(e.target.parentNode.matches("#settings")) {
        location.hash = "#/settings/general"
    }
    if(e.target.matches("#closeSettingsBtn")) {
        closeSettingsMenu()
    }

    if(e.target.parentNode.matches("#settings-list")) location.hash = `#/settings/${e.target.dataset.category}`
    if(e.target.tagName === "BUTTON" && e.target.dataset.preference === "weather_city") setSetting(e.target)
    if(e.target.matches(".settings_background-img"))setSetting(e.target)
    if(e.target.tagName === "INPUT" && e.target.dataset.preference === "background") setSetting(e.target)

    if(e.target.matches("#importExportConfig")) importExportSetting(e.target.dataset.mode)

    if(e.target.dataset.action === "reset") {
        localStorage.removeItem("settings")
        location.reload()
    }
    if(e.target.dataset.action === "delete shortcuts") {
        localStorage.removeItem("shortcuts")
        location.reload()
    }
})
document.addEventListener("submit", e => {
    e.preventDefault()
    if (e.target.matches("#main-content .search-form")) Search()
})