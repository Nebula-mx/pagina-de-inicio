import { showNotification } from "../Helpers/showNotification.js"
import { themeManager } from "./Settings/loadTheme.js"
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
                "lang": "en",
                "version": "0.9.4.dev02"
            },
            "appearance": {
                "theme": "light",
                "background": "App/Assets/Images/Backgrounds/1.jpg",
                "blur": 8,
                "shortcutsPopUpOpacity": 89,
                "weatherPopUpOpacity": 85,
                "mainContentBgOpacity": 65,
                "dateFormat": "normalDate",
                "top_itemsBg": "false",
                "invert_top_items_colour": "false"
            },
            "customThemes": {
                "customTheme1": {
                    "Global border radius": 5,
                    "Blur strenght": 8,
                    "Top content font colour": "rgba(255, 255, 255, 1)",
                    "Highlight top content items bg": "rgba(0, 0, 0, 0.2)",
                    "Weather popUp Bg colour": "rgba(0, 0, 0, 0.85)",
                    "Important text colour": "rgb(236, 141, 141)",
                    
                    "Input type color border colour": "rgba(47, 47, 47, 1)",
                    
                    "Main content font colour": "rgba(255, 255, 255, 1)",
                    "Main content Bg colour": "rgba(0, 0, 0, .65)",
                    "Main content Search box Bg colour": "rgba(0, 0, 0, .8)",
                    "Main content Search btn Bg colour": "rgba(0, 0, 0, 1)",
                    "Shortcuts Bg colour": "rgba(0, 0, 0, .6)",
                    
                    "Buttons Bg colour": "rgba(39, 39, 39, 1)",
                    "Buttons border colour": "rgba(255, 255, 255, .06)",
                    "Buttons font colour": "rgba(255, 255, 255, 1)",
                    "Buttons hover colour": "rgba(55, 55, 55, 1)",
                    "Buttons active Bg colour": "rgba(28, 28, 28, 1)",
                    
                    "Alerts top content Bg": "rgba(13, 13, 13, 1)",
                    "Alerts actions container Bg": "rgba(19, 19, 19, 1)",
                    
                    "Context menu Bg colour": "rgba(16, 16, 16, 1)",
                    "Context menu items Bg colour": "rgb(0, 0, 0)",
                    "Context menu items hover colour": "rgba(0, 0, 0, 0.10)",
                    
                    "Shortcuts form Bg colour": "rgba(17, 17, 17, 1)",
                    "Shortcuts form inputs Bg colour": "rgba(34, 34, 34, 0.87)",
                    "Shortcuts form inputs border colour": "rgba(47, 47, 47, 1)",
                    "Shortcuts form buttons bg": "rgba(34, 34, 34, 0.87)",
                    "Shortcuts form button hover bg": "rgba(38, 38, 38, 1)",
                    "Shortcuts form button active bg": "rgba(28, 28, 28, 1)",
                    
                    "Settings menu liks colour": "rgba(95, 13, 132, 1)",
                    "Settings menu categories list Bg colour": "rgba(7, 7, 7, 0.77)",
                    "Settings menu categories items Bg": "rgba(40, 40, 40, 0.4)",
                    "Settings menu categories items hover Bg": "rgba(34, 34, 34, 1)",
                    "Settings menu main content Bg": "rgba(0, 0, 0, 1)",
                    "Settings menu options Bg colour": "rgba(14, 14, 14, 1)",
                    "Settings menu details Bg colour": "rgba(6, 6, 6, 1)",
                    "Settings menu selects Bg colour": "rgba(39, 39, 39, 1)",
                    "Settings menu off toggle Bg": "rgba(39, 39, 39, 1)",
                    "Settings menu toggle circle Bg colour": "rgba(255, 255, 255, 1)",
                    "Settings menu active toggle Bg": "rgba(124, 121, 255, 1)",
                    "Settings menu code Bg colour": "rgba(0, 0, 0, 1)",
                    "Settings menu invert icons colour intensity": "100%"
                },
                "customTheme2": {
                    "Global border radius": 5,
                    "Blur strenght": 8,
                    "Top content font colour": "rgba(255, 255, 255, 1)",
                    "Highlight top content items bg": "rgba(0, 0, 0, 0.2)",
                    "Weather popUp Bg colour": "rgba(0, 0, 0, 0.85)",
                    "Important text colour": "rgb(236, 141, 141)",
                    
                    "Input type color border colour": "rgba(47, 47, 47, 1)",
                    
                    "Main content font colour": "rgba(255, 255, 255, 1)",
                    "Main content Bg colour": "rgba(0, 0, 0, .65)",
                    "Main content Search box Bg colour": "rgba(0, 0, 0, .8)",
                    "Main content Search btn Bg colour": "rgba(0, 0, 0, 1)",
                    "Shortcuts Bg colour": "rgba(0, 0, 0, .6)",
                    
                    "Buttons Bg colour": "rgba(39, 39, 39, 1)",
                    "Buttons border colour": "rgba(255, 255, 255, .06)",
                    "Buttons font colour": "rgba(255, 255, 255, 1)",
                    "Buttons hover colour": "rgba(55, 55, 55, 1)",
                    "Buttons active Bg colour": "rgba(28, 28, 28, 1)",
                    
                    "Alerts top content Bg": "rgba(13, 13, 13, 1)",
                    "Alerts actions container Bg": "rgba(19, 19, 19, 1)",
                    
                    "Context menu Bg colour": "rgba(16, 16, 16, 1)",
                    "Context menu items Bg colour": "rgb(0, 0, 0)",
                    "Context menu items hover colour": "rgba(0, 0, 0, 0.10)",
                    
                    "Shortcuts form Bg colour": "rgba(17, 17, 17, 1)",
                    "Shortcuts form inputs Bg colour": "rgba(34, 34, 34, 0.87)",
                    "Shortcuts form inputs border colour": "rgba(47, 47, 47, 1)",
                    "Shortcuts form buttons bg": "rgba(34, 34, 34, 0.87)",
                    "Shortcuts form button hover bg": "rgba(38, 38, 38, 1)",
                    "Shortcuts form button active bg": "rgba(28, 28, 28, 1)",
                    
                    "Settings menu liks colour": "rgba(95, 13, 132, 1)",
                    "Settings menu categories list Bg colour": "rgba(7, 7, 7, 0.77)",
                    "Settings menu categories items Bg": "rgba(40, 40, 40, 0.4)",
                    "Settings menu categories items hover Bg": "rgba(34, 34, 34, 1)",
                    "Settings menu main content Bg": "rgba(0, 0, 0, 1)",
                    "Settings menu options Bg colour": "rgba(14, 14, 14, 1)",
                    "Settings menu details Bg colour": "rgba(6, 6, 6, 1)",
                    "Settings menu selects Bg colour": "rgba(39, 39, 39, 1)",
                    "Settings menu off toggle Bg": "rgba(39, 39, 39, 1)",
                    "Settings menu toggle circle Bg colour": "rgba(255, 255, 255, 1)",
                    "Settings menu active toggle Bg": "rgba(124, 121, 255, 1)",
                    "Settings menu code Bg colour": "rgba(0, 0, 0, 1)",
                    "Settings menu invert icons colour intensity": "100%"
                }
            }
        }
        this.langs = {
            "en": {},
            "es": {}
        }
    }
    loadModules(){
        themeManager.startModule()
        ajustShortcutsLenght()
    }
    updateSettings(mode){
        if(mode === "start"){
            let newSettings = JSON.parse(JSON.stringify(this.defaultSettings))
            if(localStorage.getItem("settings").includes("appereance")) {
                let newStr = localStorage.getItem("settings").replace("appereance", "appearance")
                this.config = JSON.parse(newStr)
            }
            for(let key in this.config){
                for(let option in this.config[key]){
                    newSettings[key][option] = this.config[key][option]
                }
            }
            newSettings.general.version = this.defaultSettings.general.version
            localStorage.setItem("settings", JSON.stringify(newSettings))
            localStorage.setItem("updated_settings", "false")
            this.config = newSettings
        }
        return
    }
    testSettingsStatus(){
        if(!localStorage.getItem("settings")){
            localStorage.setItem("settings", JSON.stringify(this.defaultSettings))
            this.config = this.defaultSettings
        } else {
            try {
                this.config = JSON.parse(localStorage.getItem("settings"))
                if(localStorage.getItem("updated_settings") === "false" || !this.config.general.version || this.config.general.version !== this.defaultSettings.general.version) return this.updateSettings("start")
            } catch (err) {
                console.log(err)
                this.config = this.defaultSettings
                localStorage.setItem("settings", JSON.stringify(this.defaultSettings))
                showNotification("Your settings have been restored", "The settings object was corrupt")
            }
        }
    }
    loadConfig(){
        this.testSettingsStatus()
        this.loadModules()
    }

    //settings managment

    getValue(key, option){
        try {
            return this.config[key][option]
        } catch(err) {
            console.error(err, " :", key, option)
        }
    }
    getSubObjectValue(category, obj, key) {
        return this.config[category][obj][key]
    }
    getFullSettings(){
        try {
            this.loadConfig()
            return JSON.parse(localStorage.getItem("settings"))
        } catch {
            return this.defaultSettings
        }
    }
    saveSettings(category, option, value){
        if(category instanceof Array){
            this.config[category[0]][category[1]][option] = value
            localStorage.setItem("settings", JSON.stringify(this.config))
            return this.loadConfig()        
        }
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
    resetValue(obj){
        localStorage.removeItem(obj)
        showNotification(`Your ${obj} have been reset`, "The app will reload in 3 secconds")
        setTimeout(() => location.reload(), 3100)
    }
}
export let sManager = new settingsManager()