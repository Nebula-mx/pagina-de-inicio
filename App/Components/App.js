import { popUpsManager } from "../Helpers/popUpsManager.js";
import { closePromt } from "../Helpers/showPrompt.js";
import { Clock } from "./Clock.js";
import { deleteShortcut } from "./ContextMenuActions.js";
import LoadShortcuts from "./LoadShortcuts.js";
import { Router } from "./Router.js";
import { Search } from "./Search.js";
import { ShortcutForm ,closeShortcutForm, saveForm} from "./ShortcutForm.js";

export function App(){
    Router()
    Clock()
    LoadShortcuts()
}

const MainClickableElements = {
    "shortcut-icon": (ref) => location.href = `${ref.parentNode.getAttribute("data-url")}`,
    "add-btnIMg": () => ShortcutForm("saveSFBtn", undefined, "Create shortcut"),
    "closeSFBtn": () => closeShortcutForm(),
    "saveSFBtn": () => saveForm(),
    
    "edit-btn": (target) => popUpsManager.showPopUp("shortcutsContextMenu", target.parentNode, target.parentNode.parentNode),
    "context-menu_deleteBtn": (ref) => deleteShortcut(ref.parentNode.parentNode.parentNode.parentNode),
    "context-menu_editBtn": (ref) => ShortcutForm("editSaveBtn", ref.parentNode.parentNode.parentNode.parentNode, "Edit shortcut"),
    "editSaveBtn": () => saveForm("edit"),
    "context-menu_newTab": (ref) => window.open(ref.parentNode.parentNode.parentNode.parentNode.querySelector("[data-url]").getAttribute("data-url")),

    "settings-opener": () => {
        location.hash = "#/settings/general"
    },
    "weather": (target) => popUpsManager.showPopUp("weatherPopUp", target.parentNode),
    "closePrompt": () => closePromt(),
}
const keybindsActions = {
    "ShiftN": MainClickableElements["add-btnIMg"]
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

let key = "",
    keybindsAttems = 0,
    keys;
document.addEventListener("keydown", e => {
    key += e.key
    keybindsAttems++
})