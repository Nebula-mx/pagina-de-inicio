import { themeVariables } from "./themesVariables.js";

class THEME_MANAGER {
    constructor(){
        this.config = null;
        this.$cssvariables = document.getElementById("themeVariables");
        this.$root = document.getElementById("root");
        this.$favicon = document.getElementById("favicon");
        this.favicons = {
            "Firefox": "App/Assets/Images/icons/Firefox.webp",
            "Edg": "App/Assets/Images/icons/Edge.webp",
            "Chrome": "App/Assets/Images/icons/Chrome.webp"
        };
        this.bgTypes = {
            "backgroundImage": (value) => `url(${value})`,
            "backgroundColor": (value) => value
        };
    }
    aplyTheme(){
        let bgObj = this.config.appearance.background
        console.log(bgObj.value)
        this.$root.style[bgObj.type] = this.bgTypes[bgObj.type](bgObj.value)
        this.$cssvariables.innerHTML = this.theme;
        if(localStorage.getItem("browser")) {
            this.$favicon.href = this.favicons[localStorage.getItem("browser")]
        } else {
            for(let nav in this.favicons){
                if(navigator.userAgent.includes(nav)){
                    this.$favicon.href = this.favicons[nav]
                    localStorage.setItem("browser", nav)
                }
            }
        }
        bgObj = null;
        this.theme = null;
    }
    startModule(config){
        this.config = config;
        this.theme = themeVariables(this.config.appearance.theme)
        this.aplyTheme();
    }
}
export let themeManager = new THEME_MANAGER()