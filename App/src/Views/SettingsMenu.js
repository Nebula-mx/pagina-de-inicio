import { sManager } from "../../settingsManager.js";
import { refreshModules } from "../Components/App.js";
import { showAlert } from "../Helpers/showAlert.js";
import { showNotification } from "../Helpers/showNotification.js";
import { showPromt } from "../Helpers/showPrompt.js";
import { getWeather } from "../Components/Weather.js";
import { createWindow } from "../Helpers/windowsManager.js"
import { getSettingsMenuContent } from "./settingsMenuContent.js"
import { getSubMenus } from "./settingsMenu-subMenus.js";
const lang = sManager.getValue("general", ["lang"]);
const language = (await import(`../lang/${lang}.js`)).default;
let mouseUplistenerAdded = false

export let openedMenu; //this variable is used to validate if a menu is opened, its useful when prompts or alerts are required

class SETTINGS_MENU_MANAGER {
    constructor(clickHandler, SelectHandler){
        this.config = sManager.getFullSettings()
        this.ClickHandler = clickHandler
        this.SelectHandler = SelectHandler
        this.$root = document.getElementById("root")
        this.dynamicStyle = document.getElementById("dynamic-style")
        this.apliedMenuStatus = false
        this.menuContent = getSettingsMenuContent()
        this.menuInteractions = {
            "close-menu": async () => {
                if(document.getElementById("closeSettingsBtn").getAttribute("data-alert") === "true") {
                    const target = document.getElementById("closeSettingsBtn")
                    await showAlert(target.dataset.alerttitle, target.dataset.alertdesc)
                        .then(() => {
                            showNotification(language.notifications.info.livePreviewOn.title, language.notifications.info.livePreviewOn.desc)
                            document.getElementById("closeSettingsBtn").setAttribute("data-alert", "false")
                            this.menuInteractions["close-menu"]()
                        })
                        .catch(err => {return})
                }else {
                    document.querySelector(".top-bg").style.display = "none"
                    document.querySelector(".settings-menu").removeEventListener("click", this.handler)
                    location.hash = "#/"
                    this.dynamicStyle.innerHTML = null
                    this.$root.removeChild(document.querySelector(".settings-menu"))
                    
                    this.apliedMenuStatus = false
                    openedMenu = false
                }
            },
            "change-menu": (target) => {
                if(target.dataset.alert === "true") {
                    return showAlert(target.dataset.alerttitle, target.dataset.alertdesc)
                        .then(() => {
                            location.hash = `#/settings/${target.dataset.category}`
                            this.showCategory(target.dataset.category)
                            document.querySelectorAll("[data-alert]").forEach(node => node.setAttribute("data-alert", "false"))
                        })
                        .catch(() => {
                            return
                        })  
                } else {
                    location.hash = `#/settings/${target.dataset.category}`
                    this.showCategory(target.dataset.category)
                }
            },
            "set": async (target) => {
                let keys = JSON.parse(target.dataset.keys)
                let value = null;
                if(target.dataset.keys.includes("autoSet-weather_city")) return getWeather("auto")
                if(target.dataset.promt === "true") value = await showPromt({title: target.dataset.promttitle, desc:target.dataset.promtdesc, placeholder: sManager.getValue(target.dataset.category, keys) || [target.dataset.placeholder]})
                sManager.saveSettings(target.dataset.category, keys, (target.dataset.unit) ? `${target.value}${target.dataset.unit}` : parseInt(target.value) || value || target.dataset.value || target.value)
                refreshModules()
                this.updateMenusContent()
            },
            "toggle": (target) => {
                let toggleElement = target;
                if(target.dataset.active === "false") {
                    if(target.classList.contains("option-toggle_circle")){
                        toggleElement = target.parentNode;
                    }
                    if(target.dataset.specificonroute){
                        let routeKeys = JSON.parse(toggleElement.dataset.specificonroute)
                        sManager.saveSettings(toggleElement.dataset.category, routeKeys, true);
                    }
                    toggleElement.firstElementChild.dataset.active = "true";
                    toggleElement.dataset.active = "true";

                    sManager.saveSettings(toggleElement.dataset.category, JSON.parse(toggleElement.dataset.keys), toggleElement.dataset.activevalue);
                    refreshModules()
                    this.updateMenusContent()                    
                    return;
                }
                if(target.dataset.active === "true") {
                    if(target.classList.contains("option-toggle_circle")){
                        toggleElement = target.parentNode;
                    }
                    if(target.dataset.specificonroute){
                        let routeKeys = JSON.parse(toggleElement.dataset.specificonroute)
                        sManager.saveSettings(toggleElement.dataset.category, routeKeys, false);                        
                    }
                    toggleElement.firstElementChild.dataset.active = "false";
                    toggleElement.dataset.active = "false";

                    if(toggleElement.dataset.roea && sManager.getValue(toggleElement.dataset.category, JSON.parse(toggleElement.dataset.roea)) != toggleElement.dataset.roearv){
                        let targetElement = document.querySelector(`[data-keys='${toggleElement.dataset.roea}']`)
                        console.log(toggleElement.dataset.roeavalue)
                        targetElement.dataset.active = toggleElement.dataset.roeavalue
                        sManager.saveSettings(toggleElement.dataset.category, JSON.parse(toggleElement.dataset.keys), toggleElement.dataset.offvalue);
                        this.menuInteractions.toggle(targetElement)
                    } else {sManager.saveSettings(toggleElement.dataset.category, JSON.parse(toggleElement.dataset.keys), toggleElement.dataset.offvalue);}
                    refreshModules()
                    this.updateMenusContent()                     
                    return;
                }
            },
            "createSubMenu": (target) => {
                getSubMenus.insertMenu(target.dataset.typeofmenu)
            },
            "subMenuInteraction": (target) => {
                getSubMenus.menuInteractions(target.dataset.menu, target.dataset.action, target)
            },
            "openWindow": (target) => {
                if(target.dataset.contenttype === "options"){
                    const style = `
                        .window legend,
                        .window p {
                            color: var(--window-content-title);                            
                        }
                        .window #window-content .window-categoryTitle {
                            text-align: center;
                            font-weight: 700;
                            color: var(--window-content-title);
                            font-size: clamp(0px, 5vw, 1rem);
                        }
                        .window #window-content hr{
                            opacity: 30%;
                            width: 80%;
                        }
                        .window #window-content .onWindowOption {
                            background-color: var(--settings-menu-light-options);
                            position: relative;
                            display: grid;
                            grid-template-rows: repeat(4, auto);
                            grid-template-columns: 75% 25%;
                            padding: .6em;
                            margin: 1rem 0;
                            border-radius: var(--global-border-radius);
                        }
                        .window #window-content .onWindowOption .option-select {
                            grid-row: 1/3;
                            grid-column: 2/3;
                        }
                        .window #window-content .onWindowOption legend{
                            grid-row: 1/2;
                            grid-column: 1/2;
                            font-size: clamp(0px, 2.4vw, 1rem);
                            font-weight: 500;
                        }
                        .window #window-content .onWindowOption .optionProperty{
                            display: flex;
                            grid-column: 1/3;
                            justify-content: space-between;
                            margin-bottom: clamp(0px, 2%, 1rem);
                        }
                        .window #window-content .onWindowOption p{
                            grid-row: 2/3;
                            grid-column: 1/2;
                            margin: 0 0 0 2px;
                            opacity: 60%;
                            font-size: clamp(0px, 3vw, 15px);
                            text-align: justify;
                        }
                        .window #window-content .onWindowOption hr {
                            grid-row: 3;
                            grid-column: 1/3;
                            opacity: 30%;
                            width: 80%;
                        }
                        .window #window-content .onWindowOption .full-space {
                            font-size: clamp(min(.5em), 4vw, max(1.1em));
                            grid-column: 1/3;
                        }
                        .window #window-content .onWindowOption button {
                            grid-row: 1/3;
                            grid-column: 2/3;
                            place-self: end;
                            align-self: center;
                            cursor: pointer;
                        }
                        .window #window-content .onWindowOption .option-buttons {
                            display: flex;
                            grid-row: 3/4;
                            grid-column: 1/3;
                            justify-content: end;
                            margin-top: 5px;
                        }
                        .window #window-content .onWindowOption .keys-container {
                            grid-row:3/4;
                            grid-column: 1/3;
                            place-self: flex-end;
                            margin-top: var(--global-border-radius);
                        }
                        .window #window-content .onWindowOption .keys-container .key {
                            background-color: var(--context-menu-light-li-hover);
                            width: fit-content;
                            padding: .2em .4em;
                            border-radius: var(--global-border-radius);
                        }
                        .window #window-content .onWindowOption code {
                            background-color: var(--settings-menu_code);
                            padding: 1em;
                            border-radius: var(--global-border-radius);
                            overflow: auto;
                        }
                        .window #window-content .onWindowOption .option-toggle {
                            display: flex;
                            grid-column: 2/3;
                            grid-row: 1/3;
                            place-self: end;
                            align-self: center;
                            align-items: center;
                            width: clamp(23px, 5vw, 42px);
                            height: clamp(6px, 3vw, 17px);
                            padding: 4px;
                            background-color: var(--settings-menu-toggleBg);
                            border-radius: 20px;
                            cursor: pointer;
                            transition: ease-in-out 0.5s;
                        }
                        .window #window-content .onWindowOption .option-toggle.containerWithButton{
                            grid-row: 1/2;
                        }
                        .window #window-content .onWindowOption .option-toggle[data-active="true"]{
                            background-color: var(--settings-menu-active-toggle);
                            justify-content: end;
                        }
                        .window #window-content .onWindowOption .colourPicker-clickableSwatches {
                            grid-row: 1/3;
                            grid-column: 2/3;
                        }
                        .toggle-active {
                            justify-content: end;
                        }
                        .window #window-content .onWindowOption .option-toggle .option-toggle_circle{
                            width: clamp(6px, 2vw, 17px);
                            height: clamp(6px, 2vw, 17px);
                            background-color: var(--settings-menu-option-toggleCircle);
                            border-radius: 50%;
                        }
                        .window #window-content .onWindowOption .option-buttons > input[type="button"] {
                            margin: 0 0 0 5px;
                            cursor: pointer;
                        }
                        .window #window-content .onWindowOption button:hover {
                            background-color: var(--light-button-hover);
                        }
                        .window #window-content .onWindowOption button:active {
                            background-color: var(--light-button-active);
                        }
                        .window #window-content .onWindowOption input[type="range"]{
                            grid-column: 2/3;
                            grid-row: 1/3;
                            place-self: center;
                            width: 40%;
                        }
                    `
                    const optionsHTML = {
                        "weatherContainerOptions": `
                            <legend class="window-categoryTitle">${language.settings.appearance.weatherOptions.title}</legend>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.commonWords.activeModule}</legend>
                                <p>${language.settings.appearance.weatherOptions.activeModuleDesc}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "weather", "activeModule"])}" data-category="appearance" data-keys='["mainPageItems", "weather", "activeModule"]' data-activevalue="true" data-offValue="false">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontSize}</legend>
                                    <input type="range" min="0" max="32" value="value="${sManager.getValue("appearance", ["mainPageItems", "weather", "fontSize"])}"" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "weather", "fontSize"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontFamily}</legend>
                                    <select class="option-select">
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="Montserrat">Montserrat</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="DancingScript">Dancing script</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="IBMPlexMono">IBM Plex Mono</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="LibreBaskerville">Libre Baskerville</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="Nixie One">Nixie One</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="OpenSans">OpenSans</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="Playfair">Playfair</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="Poppins">Poppins</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="Raleway">Raleway</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "fontFamily"]' data-value="RobotoMono">Roboto Mono</option>
                                    </select>
                                </div>
                            </div>
                            <hr>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.weatherOptions.icon.legend}</legend>
                                <p>${language.settings.appearance.weatherOptions.icon.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "weather", "icon", "displayOn"])}" data-specificonroute='["mainPageItems", "weather", "icon", "displayOn"]' data-category="appearance" data-keys='["mainPageItems", "weather", "icon", "display"]' data-activevalue="block" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.order}</legend>
                                    <input type="number" min="0" max="2" value="${sManager.getValue("appearance", ["mainPageItems", "weather", "icon", "order"])}" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "icon", "order"]'></input>
                                </div>
                            </div>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.weatherOptions.temp.legend}</legend>
                                <p>${language.settings.appearance.weatherOptions.temp.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "weather", "temp", "displayOn"])}" data-specificonroute='["mainPageItems", "weather", "temp", "displayOn"]' data-category="appearance" data-specificonroute='["mainPageItems", "weather", "temp", "displayOn"]' data-keys='["mainPageItems", "weather", "temp", "display"]' data-activevalue="block" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.order}</legend>
                                    <input type="number" min="0" max="1" value="value="${sManager.getValue("appearance", ["mainPageItems", "weather", "temp", "order"])}"" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weather", "temp", "order"]'></input>
                                </div>
                            </div>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.weatherOptions.location.legend}</legend>
                                <p>${language.settings.appearance.weatherOptions.location.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "weather", "location", "displayOn"])}" data-specificonroute='["mainPageItems", "weather", "location", "displayOn"]' data-category="appearance" data-specificonroute='["mainPageItems", "weather", "location", "displayOn"]' data-keys='["mainPageItems", "weather", "location", "display"]' data-activevalue="block" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                            </div>
                        `,
                        "settingsOpenerOptions": `
                            <legend class="window-categoryTitle">${language.settings.appearance.sOpenerOptions.title}</legend>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.sOpenerOptions.settingsText.legend}</legend>
                                <p>${language.settings.appearance.sOpenerOptions.settingsText.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "settingsOpener", "displayOn"])}" data-specificonroute='["mainPageItems", "settingsOpener", "displayOn"]' data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "display"]' data-activevalue="block" data-offValue="none" data-roea='["mainPageItems", "settingsOpener", "icon", "display"]' data-roearv="block" data-roeavalue="false">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.order}</legend>
                                    <input type="number" min="0" max="1" value="${sManager.getValue("appearance", ["mainPageItems", "settingsOpener", "order"])}" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "order"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontSize}</legend>
                                    <input type="range" min="0" max="32" value="${sManager.getValue("appearance", ["mainPageItems", "settingsOpener", "fontSize"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "settingsOpener", "fontSize"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontFamily}</legend>
                                    <select class="option-select">
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="Montserrat">Montserrat</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="DancingScript">Dancing script</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="IBMPlexMono">IBM Plex Mono</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="LibreBaskerville">Libre Baskerville</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="Nixie One">Nixie One</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="OpenSans">OpenSans</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="Playfair">Playfair</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="Poppins">Poppins</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="Raleway">Raleway</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "fontFamily"]' data-value="RobotoMono">Roboto Mono</option>
                                    </select>
                                </div>
                            </div>
                            <hr>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.sOpenerOptions.settingsIcon.legend}</legend>
                                <p>${language.settings.appearance.sOpenerOptions.settingsIcon.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "settingsOpener", "icon", "displayOn"])}" data-specificonroute='["mainPageItems", "settingsOpener", "icon", "displayOn"]' data-category="appearance" data-specificonvalue='["mainPageItems", "settingsOpener", "icon", "displayOn"]' data-keys='["mainPageItems", "settingsOpener", "icon", "display"]' data-activevalue="block" data-offValue="none" data-roea='["mainPageItems", "settingsOpener", "display"]' data-roearv="block" data-roeavalue="false">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.sOpenerOptions.settingsIcon.size}</legend>
                                    <input type="range" min="0" max="128" value="${sManager.getValue("appearance", ["mainPageItems", "settingsOpener", "icon", "width"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "settingsOpener", "icon", "width"]'></input>
                                </div>
                            </div>
                        `,
                        "dateAndHour": `
                            <legend class="window-categoryTitle">${language.settings.appearance.dateAndHourOptions.title}</legend>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.commonWords.activeModule}</legend>
                                <p>${language.settings.appearance.dateAndHourOptions.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "dateAndHour", "activeModule"])}" data-specificonroute='["mainPageItems", "dateAndHour", "displayOn"]' data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "display"]' data-activevalue="flex" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                            </div>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.dateAndHourOptions.general.legend}</legend>
                                <p>${language.settings.appearance.dateAndHourOptions.general.p}</p>
                                <select class="option-select">
                                    <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "flexDirection"]' data-value="column">Vertical</option>
                                    <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "flexDirection"]' data-value="row">Horizontal</option>
                                </select>
                                <hr>
                                <div class="optionProperty">
                                    <legend>${language.settings.appearance.dateAndHourOptions.general.itemsMargin}</legend>
                                    <input type="range" min="0" max="32" value="${sManager.getValue("appearance", ["mainPageItems", "dateAndHour", "date", "margin"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "dateAndHour", "date", "margin"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend>${language.settings.appearance.dateAndHourOptions.general.alignItems}</legend>
                                    <select class="option-select">
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "alignItems"]' data-value="flex-start">Start</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "alignItems"]' data-value="center">Center</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "alignItems"]' data-value="baseline">Baseline</option>
                                    </select>
                                </div>
                            </div>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.dateAndHourOptions.hour.legend}</legend>
                                <p>${language.settings.appearance.dateAndHourOptions.hour.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "dateAndHour", "hour", "displayOn"])}" data-specificonroute='["mainPageItems", "dateAndHour", "hour", "displayOn"]' data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "display"]' data-activevalue="block" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontSize}</legend>
                                    <input type="range" min="0" max="128" value="${sManager.getValue("appearance", ["mainPageItems", "dateAndHour", "hour", "fontSize"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "dateAndHour", "hour", "fontSize"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontFamily}</legend>
                                    <select class="option-select">
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="Montserrat">Montserrat</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="DancingScript">Dancing script</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="IBMPlexMono">IBM Plex Mono</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="LibreBaskerville">Libre Baskerville</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="Nixie One">Nixie One</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="OpenSans">OpenSans</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="Playfair">Playfair</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="Poppins">Poppins</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="Raleway">Raleway</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "fontFamily"]' data-value="RobotoMono">Roboto Mono</option>
                                    </select>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.order}</legend>
                                    <input type="number" min="0" max="1" value="${sManager.getValue("appearance", ["mainPageItems", "dateAndHour", "hour", "order"])}" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "order"]'></input>
                                </div>
                            </div>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.dateAndHourOptions.date.legend}</legend>
                                <p>${language.settings.appearance.dateAndHourOptions.date.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "dateAndHour", "date", "displayOn"])}" data-specificonroute='["mainPageItems", "dateAndHour", "date", "displayOn"]' data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "display"]' data-activevalue="block" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontSize}</legend>
                                    <input type="range" min="0" max="128" value="${sManager.getValue("appearance", ["mainPageItems", "dateAndHour", "date", "fontSize"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "dateAndHour", "date", "fontSize"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontFamily}</legend>
                                    <select class="option-select">
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="Montserrat">Montserrat</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="DancingScript">Dancing script</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="IBMPlexMono">IBM Plex Mono</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="LibreBaskerville">Libre Baskerville</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="Nixie One">Nixie One</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="OpenSans">OpenSans</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="Playfair">Playfair</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="Poppins">Poppins</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="Raleway">Raleway</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "date", "fontFamily"]' data-value="RobotoMono">Roboto Mono</option>
                                    </select>
                                </div>
                            </div>
                        `,
                        mainContentSettings: `
                            <legend class="window-categoryTitle">${language.settings.appearance.mainContent.container.catTitle}</legend>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.mainContent.container.legend}</legend>
                                <p>${language.settings.appearance.mainContent.container.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "container", "displayOn"])}" data-specificonroute='["mainPageItems", "mainContent", "searchBar", "activeModule"]' data-category="appearance" data-keys='["mainPageItems", "mainContent","container", "display"]' data-activevalue="flex" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend>${language.settings.appearance.mainContent.container.opacity}</legend>
                                    <input type="range" min="0" max="100" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "container", "containerOpacity"])}" data-mode="set" data-category="appearance" data-unit="%" data-keys='["mainPageItems", "mainContent", "container", "containerOpacity"]'></input>                                    
                                </div>
                                <div class="optionProperty">
                                    <legend>${language.settings.appearance.mainContent.container.paddingTop}</legend>
                                    <input type="range" min="0" max="48" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "container", "paddingTop"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "mainContent", "container", "paddingTop"]'></input>                                    
                                </div>
                                <div class="optionProperty">
                                    <legend>${language.settings.appearance.mainContent.container.backdropBlur}</legend>
                                    <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "container", "blurActive"])}" data-category="appearance" data-specificonroute='["mainPageItems", "mainContent", "container", "blurActive"]' data-keys='["mainPageItems", "mainContent","container", "backdropFilter"]' data-activevalue="blur(var(--blur-strenght))" data-offValue="none">
                                        <div class="option-toggle_circle" data-mode="toggle"></div>
                                    </div>
                                </div>
                            </div>
                            <legend class="window-categoryTitle">${language.settings.appearance.mainContent.searchBar.catTitle}</legend>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.mainContent.searchBar.legend}</legend>
                                <p>${language.settings.appearance.mainContent.searchBar.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "searchBar", "activeModule"])}" data-specificonroute='["mainPageItems", "mainContent", "searchBar", "activeModule"]' data-category="appearance" data-keys='["mainPageItems", "mainContent","searchBar", "display"]' data-activevalue="flex" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.mainContent.searchBar.barWidth}</legend>
                                    <input type="range" min="0" max="100" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "searchBar", "width"])}" data-mode="set" data-category="appearance" data-unit="%" data-keys='["mainPageItems", "mainContent", "searchBar", "width"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.mainContent.searchBar.barHeight}</legend>
                                    <input type="range" min="27" max="64" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "searchForm", "height"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "mainContent", "searchForm", "height"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.mainContent.searchBar.barPadding}</legend>
                                    <input type="range" min="0" max="64" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "searchForm", "padding"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "mainContent", "searchForm", "padding"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.mainContent.searchBar.iconSize}</legend>
                                    <input type="range" min="0" max="48" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "searchButton", "width"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "mainContent", "searchButton", "width"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontFamily}</legend>
                                    <select class="option-select">
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="Montserrat">Montserrat</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="DancingScript">Dancing script</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="IBMPlexMono">IBM Plex Mono</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="LibreBaskerville">Libre Baskerville</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="Nixie One">Nixie One</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="OpenSans">OpenSans</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="Playfair">Playfair</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="Poppins">Poppins</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="Raleway">Raleway</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "searchForm", "fontFamily"]' data-value="RobotoMono">Roboto Mono</option>
                                    </select>
                                </div>
                            </div>
                            <legend class="window-categoryTitle">${language.settings.appearance.mainContent.shortcutsIcons.catTitle}</legend>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.mainContent.shortcutsIcons.legend}</legend>
                                <p>${language.settings.appearance.mainContent.shortcutsIcons.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "shortcutsImages", "displayOn"])}" data-specificonroute='["mainPageItems", "mainContent", "shortcutsImages", "displayOn"]' data-category="appearance"  data-keys='["mainPageItems", "mainContent", "shortcutsImages", "display"]' data-activevalue="block" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend>${language.settings.appearance.mainContent.shortcutsIcons.iconWidth}</legend>
                                    <input type="range" min="0" max="64" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "shortcutsImages", "width"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "mainContent", "shortcutsImages", "width"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend>${language.settings.appearance.mainContent.shortcutsIcons.iconHeight}</legend>
                                    <input type="range" min="0" max="64" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "shortcutsImages", "height"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "mainContent", "shortcutsImages", "height"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.order}</legend>
                                    <input type="number" min="0" max="1" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "shortcutsImages", "order"])}" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsImages", "order"]'></input>
                                </div>
                            </div>
                            <legend class="window-categoryTitle">${language.settings.appearance.mainContent.shortcutsTitles.catTitle}</legend>
                            <div class="onWindowOption">
                                <legend>${language.settings.appearance.mainContent.shortcutsTitles.legend}</legend>
                                <p>${language.settings.appearance.mainContent.shortcutsTitles.p}</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "shortcutsLegends", "displayOn"])}" data-category="appearance" data-specificonroute='["mainPageItems", "mainContent", "shortcutsLegends", "displayOn"]'  data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "display"]' data-activevalue="block" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend>${language.settings.appearance.mainContent.shortcutsTitles.margin}</legend>
                                    <input type="range" min="0" max="12" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "shortcutsLegends", "margin"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "margin"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend>${language.settings.appearance.commonWords.fontSize}</legend>
                                    <input type="range" min="0" max="64" value="${sManager.getValue("appearance", ["mainPageItems", "mainContent", "shortcutsLegends", "fontSize"])}" data-mode="set" data-category="appearance" data-unit="px" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontSize"]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">${language.settings.appearance.commonWords.fontFamily}</legend>
                                    <select class="option-select">
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontFamily"]' data-value="Montserrat">Montserrat</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontFamily"]' data-value="DancingScript">Dancing script</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontFamily"]' data-value="LibreBaskerville">Libre Baskerville</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontFamily"]' data-value="Nixie One">Nixie One</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontFamily"]' data-value="OpenSans">OpenSans</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontFamily"]' data-value="Playfair">Playfair</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontFamily"]' data-value="Poppins">Poppins</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontFamily"]' data-value="Raleway">Raleway</option>
                                        <option data-mode="set" data-category="appearance" data-keys='["mainPageItems", "mainContent", "shortcutsLegends", "fontFamily"]' data-value="RobotoMono">Roboto Mono</option>
                                    </select>
                                </div>
                            </div>
                        `
                    }
                    this.menuInteractions["close-menu"]()
                    createWindow.openWindow(language.commonWords.editElement, optionsHTML[target.dataset.windowcontent], style)
                    document.querySelector(".window #window-content").addEventListener("click", this.ClickHandler)
                    document.querySelector(".window #window-content").addEventListener("input", this.SelectHandler)
                }
            },
            "exportSettings": (target) => {
                sManager.exportSettings(target.dataset.obj)
                showNotification(`Your ${target.dataset.obj} have been exported`, `The ${target.dataset.obj} object is now on your clipboard`)
            },
            "importSettings": async (target) => {
                let str = await showPromt({title: `Insert your ${target.dataset.obj} string`, desc: "", placeholder: target.dataset.placeholder})
                sManager.importSettings(target.dataset.obj, str)
            },
            "reset": (target) => {
                showAlert(`Want to reset your ${target.dataset.obj}?`, "This action can't be undone, think it twice!")
                    .then(() => sManager.resetValue(target.dataset.obj))
                    .catch(() => {return})
            }
        }
    }
    updateMenusContent(){
        this.menuContent = getSettingsMenuContent()
    }
    async showMenu(){
        if(this.apliedMenuStatus === true) return
        this.dynamicStyle.innerHTML = this.menuContent.style
        this.$root.insertAdjacentHTML("afterbegin", this.menuContent.main)
        document.querySelector(".top-bg").style.display = "block"
        
        this.apliedMenuStatus = true
        openedMenu = true
        document.querySelector(".settings-menu").addEventListener("click", this.ClickHandler)
        document.querySelector(".settings-menu").addEventListener("input", this.SelectHandler)
    }
    async showCategory(cat){
        let content = this.menuContent
        document.querySelector(".settings-menu_content").innerHTML = null
        document.querySelector(".settings-menu_content").innerHTML = content[cat]
        document.querySelector(".settings-menu_content").scroll(0, 0)
    }
}
function settingsMenuInteractionsHandler(e) {
    if(settingsMenuManager.menuInteractions[e.target.dataset.mode]){
        if(e.target.dataset.dosubmenuinteractionfirst) settingsMenuManager.menuInteractions.subMenuInteraction(e.target)
        settingsMenuManager.menuInteractions[e.target.dataset.mode](e.target)
    }
}
let previousTargetElement = null;
function settingsMenuSelectsHandler(e){
    if(e.target.tagName === "SELECT"){
        if(settingsMenuManager.menuInteractions[e.target.children[e.target.selectedIndex].dataset.mode]){
            settingsMenuManager.menuInteractions[e.target.children[e.target.selectedIndex].dataset.mode](e.target.children[e.target.selectedIndex])
        }
    }
    if(e.target.type === "range"){
        if(settingsMenuManager.menuInteractions[e.target.dataset.mode]){
            if(!document.getElementById("rangeValueIndicator")){
                console.log(e.target.offsetWidth)
                console.log(e.target.offsetWidth/2)
                console.info(e.target.offsetLeft + e.target.offsetWidth/2)
                const $parentNode = e.target.parentNode;
                let $indicator = `
                    <span id="rangeValueIndicator" style="position: absolute;background-color: var(--settings-menu-indicator);padding: 6px 8px;border-radius: var(--global-border-radius);color: var(--main-content-font);font-size: 14px;top: ${e.target.offsetTop - (e.target.offsetHeight*1.6)}px;">${e.target.value} ${(!e.target.dataset.unit) ? "" : e.target.dataset.unit}</span>
                `;
                $parentNode.insertAdjacentHTML("afterBegin", $indicator)
                previousTargetElement = document.getElementById("rangeValueIndicator").parentElement
                document.getElementById("rangeValueIndicator").style.left = `${(e.target.offsetLeft + e.target.offsetWidth/2)- document.getElementById("rangeValueIndicator").offsetWidth/2}px`
            }else {
                if(previousTargetElement != e.target.parentNode && document.getElementById("rangeValueIndicator")){
                    previousTargetElement.removeChild(document.getElementById("rangeValueIndicator"))
                    return;                    
                }
                document.getElementById("rangeValueIndicator").textContent = `${e.target.value} ${(!e.target.dataset.unit) ? "" : e.target.dataset.unit}`
            }
            const mouseUp = (e) =>{
                e.target.parentNode.removeChild(document.getElementById("rangeValueIndicator"))
                e.target.removeEventListener("mouseup", mouseUp)
                mouseUplistenerAdded = false
            }
            if(mouseUplistenerAdded === false){
                mouseUplistenerAdded = true
                e.target.addEventListener("mouseup", mouseUp)
            }
            settingsMenuManager.menuInteractions[e.target.dataset.mode](e.target) 
        }
    }
}
export const settingsMenuManager = new SETTINGS_MENU_MANAGER(settingsMenuInteractionsHandler, settingsMenuSelectsHandler)
