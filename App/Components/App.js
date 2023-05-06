import { popUpsManager } from "../Helpers/popUpsManager.js";
import { showAlert } from "../Helpers/showAlert.js";
import { closePromt } from "../Helpers/showPrompt.js";
import { Clock } from "./Clock.js";
import { getWeather } from "./Weather.js";
import { Search } from "./Search.js";
import { settingsMenuManager } from "./SettingsMenu.js"
import { shortcuts_manager } from "./ShortcutsManager.js"

export function App(){
    Clock()
    getWeather()
    shortcuts_manager.testShortcutsStatus()
}
const MainClickableElements = {
    "shortcut-icon": (ref) => {
        let url = `${ref.parentNode.getAttribute("data-url")}`
        if(url.match(/^https:\/\//) === null || url.match(/^http:\/\//) === null) {
            return location.href = `https://${url}`
        } else {location.href = `${ref.parentNode.getAttribute("data-url")}`}
    },
    "add-btnIMg": () => shortcuts_manager.createShortcut(),
    
    "edit-btn": (target) => popUpsManager.showPopUp("shortcutsContextMenu", target.parentNode, target.parentNode.parentNode),
    "context-menu_deleteBtn": (ref) => {
        showAlert("Want to delete this shortcut?", "This action can not be undone", ref.parentNode.parentNode.parentNode.parentNode, true)
        .then((res) => shortcuts_manager.deleteShortcut(res.obj))
        .catch((err) => console.log(err))
    },
    "context-menu_editBtn": (ref) => shortcuts_manager.editShortcut(ref.parentNode.parentNode.parentNode.parentNode),
    "editSaveBtn": () => saveForm("edit"),
    "context-menu_newTab": (ref) => window.open(ref.parentNode.parentNode.parentNode.parentNode.querySelector("[data-url]").getAttribute("data-url")),

    "settings-opener": () => {
        location.hash = "#/settings/general"
        settingsMenuManager.showMenu()
        settingsMenuManager.showCategory("general")
    },
    "weather": (target) => popUpsManager.showPopUp("weatherPopUp", target.parentNode),
    "closePrompt": () => closePromt(),
}
document.addEventListener("click", async(e) => {
    if(MainClickableElements.hasOwnProperty(e.target.parentNode.id)){
        return MainClickableElements[e.target.parentNode.id](e.target)
    } else if(MainClickableElements.hasOwnProperty(e.target.id)) {
        return MainClickableElements[e.target.id](e.target)
    }
})
document.addEventListener("submit", e => {
    e.preventDefault()
    if (e.target.matches("#main-content .search-form")) Search()
})