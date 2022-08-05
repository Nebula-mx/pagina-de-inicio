import { loadTheme } from "./Settings/loadTheme.js"

const defaultSettings = {
    "general": {
        "shortcuts_limit": 8,
        "search_engine": "https://www.google.com/search?q=",
        "weather_city": "Mexico-City",
        "lang": "en"
    },
    "appereance": {
        "theme": "light",
        "background": "App/Assets/Images/Backgrounds/3.jpg",
        "blur": 8
    }
}
export let config = (!localStorage.getItem("settings")) ? defaultSettings : JSON.parse(localStorage.getItem("settings"))
export async function loadSettings(){
    if(!localStorage.getItem("settings")){
        localStorage.setItem("settings", JSON.stringify(defaultSettings))
        config = defaultSettings
    }
    loadTheme()
}