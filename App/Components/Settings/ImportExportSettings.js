import { showNotification } from "../../Helpers/showNotification.js";
import { config, loadSettings } from "../loadSettings.js";

export function importExportSetting(mode) {
    if(mode === "export settings") {
        navigator.clipboard.writeText(localStorage.getItem("settings"))
        showNotification("Settings exported succesfully!", "Settings have been copied to your Clipboard")
    }
    if(mode === "import settings") {
        let options = prompt("Paste the settings string you will use")
        if(!options) return

        localStorage.setItem("settings", options)
        showNotification("Settings have been aplied", "The app will reload in 3 secconds")
        setTimeout(() => {location.reload()}, 3500)
    }

    if(mode === "export shortcuts") {
        navigator.clipboard.writeText(localStorage.getItem("shortcuts"))
        showNotification("Shortcuts exported succesfully!", "Shortcuts config have been copied to your Clipboard")
    }
    if(mode === "import shortcuts") {
        let shortcuts = prompt("Paste the shortcuts string you will use")
        if(!shortcuts) return
        //if(/$()^/.test)

        localStorage.setItem("shortcuts", shortcuts)
        showNotification("Shortcuts have been loaded", "The app will reload in 3 secconds")
        setTimeout(() => {location.reload()}, 3500)
    }

}