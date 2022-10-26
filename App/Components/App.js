import { closePromt } from "../Helpers/showPrompt.js";
import { Clock } from "./Clock.js";
import { deleteShortcut } from "./ContextMenuActions.js";
import LoadShortcuts from "./LoadShortcuts.js";
import { Router } from "./Router.js";
import { Search } from "./Search.js";
import { showActions } from "./ShortcutActions.js";
import { ShortcutForm ,closeShortcutForm, saveForm} from "./ShortcutForm.js";
import { wPopUp } from "./Weather.js";


export async function App(){
    Router()
    Clock()
    LoadShortcuts()
}

const MainClickableElements = {
    "openWeatherPopUp": () => wPopUp.openMenu(),
    "weather-location": () => wPopUp.openMenu(),
    "closeWeatherPopUp": () => wPopUp.closeMenu(),
    "shortcut-icon": (ref) => location.href = `${ref.parentNode.getAttribute("data-url")}`,
    "add-btnIMg": () => ShortcutForm("saveSFBtn"),
    "closeSFBtn": () => closeShortcutForm(),
    "saveSFBtn": () => saveForm(),

    "edit-btn": (ref) => showActions(ref),
    "context-menu_deleteBtn": (ref) => deleteShortcut(ref.parentNode.parentNode.parentNode.parentNode),
    "context-menu_editBtn": (ref) => ShortcutForm("editSaveBtn", ref.parentNode.parentNode.parentNode.parentNode),
    "editSaveBtn": () => saveForm("edit"),
    "context-menu_newTab": (ref) => window.open(ref.parentNode.parentNode.parentNode.parentNode.querySelector("[data-url]").getAttribute("data-url")),

    "settings-opener": () => {
        location.hash = "#/settings/general"
    },

    "closePrompt": () => closePromt(),
}
document.addEventListener("click", async(e) => {
    if(MainClickableElements.hasOwnProperty(e.target.id)) {
        MainClickableElements[e.target.id](e.target)
    }
})
document.addEventListener("submit", e => {
    e.preventDefault()
    if (e.target.matches("#main-content .search-form")) Search()
})