import { Clock } from "./Clock.js";
import { deleteShortcut } from "./ContextMenuActions.js";
import LoadShortcuts from "./LoadShortcuts.js";
import { Search } from "./Search.js";
import { showActions } from "./ShortcutActions.js";
import { ShortcutForm ,closeShortcutForm, saveForm} from "./ShortcutForm.js";
import { getWeather } from "./Weather.js";


export async function App(){
    Clock()
    await getWeather()
    LoadShortcuts()
}
document.addEventListener("submit", e => {
    e.preventDefault()
    if (e.target.matches("#main-content .search-form")) Search()
})
document.addEventListener("click", async(e) => {
    //console.log(e.target)

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

})