import { sManager } from "../../settingsManager.js"
import { popUpsManager } from "../Helpers/popUpsManager.js";
import { showAlert } from "../Helpers/showAlert.js";
import { closePromt } from "../Helpers/showPrompt.js";
import { Clock } from "../Components/Clock.js";
import { getWeather } from "../Components/Weather.js";
import { Search } from "../Components/Search.js";
import { settingsMenuManager } from "./SettingsMenu.js"
import { shortcuts_manager } from "../Helpers/ShortcutsManager.js"
import { createWindow } from "../Helpers/windowsManager.js";
const lang = sManager.getValue("general", ["lang"]);
const language = (await import(`../lang/${lang}.js`)).default;

export function mainView(){
    Clock()
    getWeather()
    document.getElementById("settings").children[0].textContent = language.settings.title
    shortcuts_manager.testShortcutsStatus()
}
const MainClickableElements = {
    "shortcut-icon": (ref) => {
        let url = `${ref.parentNode.getAttribute("data-url")}`
        location.href = url
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
        if(createWindow.apliedWindow === true) createWindow.actions.closeMenu()
        location.hash = "#/settings/general"
        settingsMenuManager.showMenu()
        settingsMenuManager.showCategory("general")
    },
    "weather": (target) => popUpsManager.showPopUp("weatherPopUp", target.parentNode),
    "closePrompt": () => closePromt()
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