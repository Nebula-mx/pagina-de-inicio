import { defaultSettings } from "./Assets/data/defaultSettings.js"

if(!localStorage.getItem("updated_settings")){
    localStorage.setItem("updated_settings", "false")
}
class settingsManager {
    constructor(){
        this.config = null;
        this.defaultSettings = defaultSettings;
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
                    if(typeof(newSettings[key][option]) === "object"){
                        for(let prop in newSettings[key][option]){
                            if(!this.config[key][option][prop]) {
                                newSettings[key][option][prop] = this.defaultSettings[key][option][prop]
                                continue;
                            }
                            newSettings[key][option][prop] = this.config[key][option][prop]
                        }
                        continue;
                    }
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
                return {title:"Your settings have been restored", description:"The settings object was corrut"}
            }
        }
    }
    loadConfig(){
        this.testSettingsStatus()
    }

    //settings managment

    getValue(category, keys = []){
        if(!this.config) this.loadConfig()
        try {
            let value = this.config[category]
            keys.forEach((item => {
                value = value[item]
            }))
            return value
        } catch(err) {
            console.error(err, " :", category, keys)
            console.log(category)
            let value = this.defaultSettings[category]
            keys.forEach((item => {
                value = value[item]
            }))
            return value
        }
    }
    getFullSettings(){
        try {
            this.loadConfig()
            return JSON.parse(localStorage.getItem("settings"))
        } catch {
            return this.defaultSettings
        }
    }
    saveSettings(category, keys = [], value){
        let obj = this.config[category]
        try {
            keys.forEach(((item, i) => {
                if(i === (keys.length -1)) {
                    return obj[item] = value;
                }
                obj = obj[item]
            }))
            obj = value
            localStorage.setItem("settings", JSON.stringify(this.config))
            this.loadConfig()
        }catch(err){
            console.log(category)
            return console.log(err)
        }
    }
    exportSettings(obj){
        navigator.clipboard.writeText(localStorage.getItem(obj))
    }
    importSettings(obj, str){
        localStorage.setItem(obj, str)
        localStorage.setItem("updated_settings", "false")
        setTimeout(() => location.reload(), 3100)
    }
    resetValue(obj){
        localStorage.removeItem(obj)
        setTimeout(() => location.reload(), 3100)
    }
}
export let sManager = new settingsManager()
window.SettingsManager = new settingsManager()
