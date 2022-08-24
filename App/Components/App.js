import { closePromt } from "../Helpers/showPrompt.js";
import { Clock } from "./Clock.js";
import { deleteShortcut } from "./ContextMenuActions.js";
import LoadShortcuts from "./LoadShortcuts.js";
import { Search } from "./Search.js";
import { closeSettingsMenu } from "./SettingsMenu.js";
import { showActions } from "./ShortcutActions.js";
import { ShortcutForm ,closeShortcutForm, saveForm} from "./ShortcutForm.js";


export async function App(){
    Clock()
    LoadShortcuts()
}

const MainClickableElements = {
    "shortcut-icon": (ref) => location.href = `${ref.parentNode.getAttribute("data-url")}`,
    "add-btnIMg": () => ShortcutForm("saveSFBtn"),
    "closeSFBtn": () => closeShortcutForm(),
    "saveSFBtn": () => saveForm(),

    "edit-btn": (ref) => showActions(ref),
    "context-menu_deleteBtn": (ref) => deleteShortcut(ref.parentNode.parentNode.parentNode.parentNode),
    "context-menu_editBtn": (ref) => ShortcutForm("editSaveBtn", ref.parentNode.parentNode.parentNode.parentNode),
    "editSaveBtn": () => saveForm("edit"),

    "settings-opener": () => location.hash = "#/settings/general",
    "closeSettingsBtn": () => closeSettingsMenu(),

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