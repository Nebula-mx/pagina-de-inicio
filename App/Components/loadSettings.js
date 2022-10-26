import { showNotification } from "../Helpers/showNotification.js"
import { loadTheme } from "./Settings/loadTheme.js"
import { getWeather } from "./Weather.js"
import { ajustShortcutsLenght } from "./ShortcutForm.js"

if(!localStorage.getItem("updated_settings")){
    localStorage.setItem("updated_settings", "false")
}
class settingsManager {
    constructor(){
        this.config = null,
        this.defaultSettings = {
            "general": {
                "shortcuts_limit": 8,
                "search_engine": "https://www.google.com/search?q=",
                "open_search_in_newTab": "false",
                "weather_city": "Mexico-City",
                "lang": "en"
            },
            "appearance": {
                "theme": "light",
                "background": "App/Assets/Images/Backgrounds/1.jpg",
                "blur": 8,
                "dateFormat": "normalDate",
                "top_itemsBg": "false",
                "invert_top_items_colour": "false"
            }
        }
    }
    loadModules(){
        loadTheme()
        getWeather()
        ajustShortcutsLenght()
    }
    updateSettings(){
        console.error("update settings method started")
        let newSettings = this.defaultSettings
        if(localStorage.getItem("settings").includes("appereance")) {
            let newStr = localStorage.getItem("settings").replace("appereance", "appearance")
            this.config = JSON.parse(newStr)
        }
        for(let key in this.config){
            for(let option in this.config[key]){
                newSettings[key][option] = this.config[key][option]
            }
        }
        localStorage.setItem("settings", JSON.stringify(newSettings))
        localStorage.setItem("updated_settings", "true")
        this.config = newSettings
    }
    testSettingsStatus(){
        if(!localStorage.getItem("settings")){
            localStorage.setItem("settings", JSON.stringify(this.defaultSettings))
            this.config = this.defaultSettings
        } else {
            try {
                this.config = JSON.parse(localStorage.getItem("settings"))
            } catch (err) {
                this.config = this.defaultSettings
                localStorage.setItem("settings", JSON.stringify(this.defaultSettings))
                showNotification("Your settings have been restored", "The settings object was corrupt")
            }
        }
        if(localStorage.getItem("updated_settings") === "false") return this.updateSettings()
    }
    loadConfig(){
        this.testSettingsStatus()
        this.loadModules()
    }

    //settings managment

    getValue(key, option){
        return this.config[key][option]
    }
    getFullSettings(){
        try {
            return JSON.parse(localStorage.getItem("settings"))
        } catch {
            this.loadConfig()
            return this.defaultSettings
        }
    }
    saveSettings(category, option, value){
        this.config[category][option] = value
        localStorage.setItem("settings", JSON.stringify(this.config))
        this.loadConfig()
    }
    exportSettings(obj){
        navigator.clipboard.writeText(localStorage.getItem(obj))
        showNotification(`Your ${obj} have been exported!`, "Now you can paste the string to import your settings in other place")
    }
    importSettings(obj, str){
        localStorage.setItem(obj, str)
        localStorage.setItem("updated_settings", "false")
        showNotification(`Your ${obj} have been imported!`, "The app will reload in 3 secconds to apply the changes")
        setTimeout(() => location.reload(), 3100)
    }
}
export let sManager = new settingsManager()