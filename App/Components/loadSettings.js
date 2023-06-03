import { showNotification } from "../Helpers/showNotification.js"
import { themeManager } from "./Settings/loadTheme.js"

if(!localStorage.getItem("updated_settings")){
    localStorage.setItem("updated_settings", "false")
}
class settingsManager {
    constructor(){
        this.config = null,
        this.lang = null,
        this.defaultSettings = {
            "general": {
                "shortcuts_limit": 8,
                "search_engine": "https://www.google.com/search?q=",
                "open_search_in_newTab": "false",
                "weather_city": "Mexico-City",
                "lang": "en",
                "version": "0.9.6"
            },
            "appearance": {
                "theme": "light",
                "background": "App/Assets/Images/Backgrounds/1.webp",
                "blur": 8,
                "shortcutsPopUpOpacity": 89,
                "weatherPopUpOpacity": 85,
                "mainContentBgOpacity": 65,
                "dateFormat": "normalDate",
                "top_itemsBg": "false",
                "invert_top_items_colour": "true"
            },
            "customThemes": {
                "customTheme1": {
                    "Global border radius": 5,
                    "Blur strenght": 8,
                    "Top content font colour": "rgba(255, 255, 255, 255)",
                    "Highlight top content items bg": "rgba(0, 0, 0, 51)",
                    "Weather popUp Bg colour": "rgba(0, 0, 0, 216)",
                    "Important text colour": "rgb(236, 141, 141)",
                    
                    "Input type color border colour": "rgba(47, 47, 47, 255)",
                    
                    "Main content font colour": "rgba(255, 255, 255, 255)",
                    "Main content Bg colour": "rgba(0, 0, 0, 165)",
                    "Main content Search box Bg colour": "rgba(0, 0, 0, 204)",
                    "Main content Search btn Bg colour": "rgba(0, 0, 0, 255)",
                    "Shortcuts Bg colour": "rgba(0, 0, 0, 153)",
                    
                    "Buttons Bg colour": "rgba(39, 39, 39, 255)",
                    "Buttons border colour": "rgba(255, 255, 255, 15)",
                    "Buttons font colour": "rgba(255, 255, 255, 255)",
                    "Buttons hover colour": "rgba(55, 55, 55, 255)",
                    "Buttons active Bg colour": "rgba(28, 28, 28, 255)",
                    
                    "Alerts top content Bg": "rgba(13, 13, 13, 255)",
                    "Alerts actions container Bg": "rgba(19, 19, 19, 255)",
                    
                    "Context menu Bg colour": "rgba(16, 16, 16, 255)",
                    "Context menu items Bg colour": "rgb(0, 0, 0)",
                    "Context menu items hover colour": "rgba(0, 0, 0, 255)",
                    
                    "Shortcuts form Bg colour": "rgba(17, 17, 17, 255)",
                    "Shortcuts form inputs Bg colour": "rgba(34, 34, 34, 221)",
                    "Shortcuts form inputs border colour": "rgba(47, 47, 47, 255)",
                    "Shortcuts form buttons bg": "rgba(34, 34, 34, 221)",
                    "Shortcuts form button hover bg": "rgba(38, 38, 38, 255)",
                    "Shortcuts form button active bg": "rgba(28, 28, 28, 255)",
                    
                    "Settings menu liks colour": "rgba(95, 13, 132, 255)",
                    "Settings menu categories list Bg colour": "rgba(7, 7, 7, 196)",
                    "Settings menu categories items Bg": "rgba(40, 40, 40, 102)",
                    "Settings menu categories items hover Bg": "rgba(34, 34, 34, 255)",
                    "Settings menu main content Bg": "rgba(0, 0, 0, 255)",
                    "Settings menu options Bg colour": "rgba(14, 14, 14, 255)",
                    "Settings menu details Bg colour": "rgba(6, 6, 6, 255)",
                    "Settings menu selects Bg colour": "rgba(39, 39, 39, 255)",
                    "Settings menu off toggle Bg": "rgba(39, 39, 39, 255)",
                    "Settings menu toggle circle Bg colour": "rgba(255, 255, 255, 255)",
                    "Settings menu active toggle Bg": "rgba(124, 121, 255, 255)",
                    "Settings menu code Bg colour": "rgba(0, 0, 0, 255)",
                    "Settings menu invert icons colour intensity": "100%"
                },
                "customTheme2": {
                    "Global border radius": 5,
                    "Blur strenght": 8,
                    "Top content font colour": "rgba(255, 255, 255, 255)",
                    "Highlight top content items bg": "rgba(0, 0, 0, 51)",
                    "Weather popUp Bg colour": "rgba(0, 0, 0, 216)",
                    "Important text colour": "rgb(236, 141, 141)",
                    
                    "Input type color border colour": "rgba(47, 47, 47, 255)",
                    
                    "Main content font colour": "rgba(255, 255, 255, 255)",
                    "Main content Bg colour": "rgba(0, 0, 0, 165)",
                    "Main content Search box Bg colour": "rgba(0, 0, 0, 204)",
                    "Main content Search btn Bg colour": "rgba(0, 0, 0, 255)",
                    "Shortcuts Bg colour": "rgba(0, 0, 0, 153)",
                    
                    "Buttons Bg colour": "rgba(39, 39, 39, 255)",
                    "Buttons border colour": "rgba(255, 255, 255, 15)",
                    "Buttons font colour": "rgba(255, 255, 255, 255)",
                    "Buttons hover colour": "rgba(55, 55, 55, 255)",
                    "Buttons active Bg colour": "rgba(28, 28, 28, 255)",
                    
                    "Alerts top content Bg": "rgba(13, 13, 13, 255)",
                    "Alerts actions container Bg": "rgba(19, 19, 19, 255)",
                    
                    "Context menu Bg colour": "rgba(16, 16, 16, 255)",
                    "Context menu items Bg colour": "rgb(0, 0, 0)",
                    "Context menu items hover colour": "rgba(0, 0, 0, 255)",
                    
                    "Window BG colour": "rgba(0, 0, 0, 255)",
                    
                    "Shortcuts form Bg colour": "rgba(17, 17, 17, 255)",
                    "Shortcuts form inputs Bg colour": "rgba(34, 34, 34, 221)",
                    "Shortcuts form inputs border colour": "rgba(47, 47, 47, 255)",
                    "Shortcuts form buttons bg": "rgba(34, 34, 34, 221)",
                    "Shortcuts form button hover bg": "rgba(38, 38, 38, 255)",
                    "Shortcuts form button active bg": "rgba(28, 28, 28, 255)",
                    
                    "Settings menu liks colour": "rgba(95, 13, 132, 255)",
                    "Settings menu categories list Bg colour": "rgba(7, 7, 7, 196)",
                    "Settings menu categories items Bg": "rgba(40, 40, 40, 102)",
                    "Settings menu categories items hover Bg": "rgba(34, 34, 34, 255)",
                    "Settings menu main content Bg": "rgba(0, 0, 0, 255)",
                    "Settings menu options Bg colour": "rgba(14, 14, 14, 255)",
                    "Settings menu details Bg colour": "rgba(6, 6, 6, 255)",
                    "Settings menu selects Bg colour": "rgba(39, 39, 39, 255)",
                    "Settings menu off toggle Bg": "rgba(39, 39, 39, 255)",
                    "Settings menu toggle circle Bg colour": "rgba(255, 255, 255, 255)",
                    "Settings menu active toggle Bg": "rgba(124, 121, 255, 255)",
                    "Settings menu code Bg colour": "rgba(0, 0, 0, 255)",
                    "Settings menu invert icons colour intensity": "100%"
                }
            }
        }
    }
    async loadModules(){
        let lang = this.config.general.lang
        this.lang = (await import(`../lang/${lang}.js`)).default;
        document.getElementById("settings").firstElementChild.textContent = this.lang.settings.title
        themeManager.startModule()
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
            localStorage.setItem("updated_settings", "true")
            this.config = newSettings
        }
        return
    }
    async testSettingsStatus(){
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
                showNotification("Your settings have been restored", "The settings object was corrut")
            }
        }
    }
    loadConfig(){
        this.testSettingsStatus().then(() => this.loadModules())
    }

    //settings managment

    getValue(key, option){
        if(!this.config) this.loadConfig()
        try {
            return this.config[key][option]
        } catch(err) {
            console.error(err, " :", key, option)
            console.info(this.config)
            return this.defaultSettings[key][option]
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
    async saveSettings(category, option, value){
        if(category instanceof Array){
            this.config[category[0]][category[1]][option] = value
            localStorage.setItem("settings", JSON.stringify(this.config))
            return this.loadConfig()        
        }
        this.config[category][option] = value
        localStorage.setItem("settings", JSON.stringify(this.config))
        this.loadConfig()
    }
    async exportSettings(obj){
        navigator.clipboard.writeText(localStorage.getItem(obj))
        showNotification(`Your ${obj} have been exported!`, "Now you can paste the string to import your settings in other place")
    }
    async importSettings(obj, str){
        localStorage.setItem(obj, str)
        localStorage.setItem("updated_settings", "false")
        showNotification(`Your ${obj} have been imported!`, "The app will reload in 3 secconds to apply the changes")
        setTimeout(() => location.reload(), 3100)
    }
    async resetValue(obj){
        localStorage.removeItem(obj)
        showNotification(`Your ${obj} have been reset`, "The app will reload in 3 secconds")
        setTimeout(() => location.reload(), 3100)
    }
}
export let sManager = new settingsManager()
window.SettingsManager = new settingsManager()