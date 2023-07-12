import { sManager } from "../../settingsManager.js";
import { refreshModules } from "./App.js";
import { showAlert } from "../Helpers/showAlert.js";
import { showNotification } from "../Helpers/showNotification.js";
import { showPromt } from "../Helpers/showPrompt.js";
import { getWeather } from "./Weather.js";
import { colourPicker } from "../Helpers/colourPicker.js";
import { createWindow } from "../Helpers/windowsManager.js"
import { getSettingsMenuContent } from "../Helpers/settingsMenuContent.js"
const lang = sManager.getValue("general", ["lang"]);
const language = (await import(`../lang/${lang}.js`)).default;

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
        this.subMenus = {
            "customizeTheme": {
                "dynamicContent": true, //this property indicates if the sub-menu requires an advanced content load
                "parentMenu": "appearance",
                "themeBackup": JSON.parse(JSON.stringify(this.config.customThemes.customTheme1)),
                "previousTheme": null,
                "editedTheme": "customTheme1",
                "previewEnabled": "false",
                "html": `
                    <div>
                        <div class="settings-menu_content-top">
                            <div title="Back to appearance category">
                                <svg id="submenus-backButon" data-alert="false" data-mode="change-menu" data-category="appearance" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="6.28918" y="0.642029" width="2" height="7" rx="1" transform="rotate(60 6.28918 0.642029)" fill="#CFCFCF"/>
                                    <rect x="7.28918" y="6.62592" width="2" height="7" rx="1" transform="rotate(120 7.28918 6.62592)" fill="#CFCFCF"/>
                                </svg>
                            </div>
                            <h5 id="category-name">${language.submenus.themeCreator.title}</h5>
                            <hr>
                        </div>
                        <div class="settings-menu_category-content">
                            <div style="display: none;" class="option">
                                <legend>Want to know more about this feature?</legend>
                                <button data-mode="subMenuInteraction" data-menu="customizeTheme" data-action="openGuide">View tutorials</button>
                            </div>
                            <div class="option theme-editor_actions">
                                <div id="theme-editor_selectedTheme">
                                    <p>${language.submenus.themeCreator.editorActions.p}</p>
                                    <select class="option-select">
                                        <option data-mode="subMenuInteraction" data-menu="customizeTheme" data-action="showThemeValue" data-value="customTheme1">${language.submenus.themeCreator.editorActions.select.customTheme1}</option>
                                        <option data-mode="subMenuInteraction" data-menu="customizeTheme" data-action="showThemeValue" data-value="customTheme2">${language.submenus.themeCreator.editorActions.select.customTheme2}</option>
                                    </select>
                                </div>
                                <div id="theme-editor_actions">
                                    <button id="themeEditorActions_preview" data-mode="subMenuInteraction" data-menu="customizeTheme" data-action="livePreview" data-active="false">${language.submenus.themeCreator.editorActions.buttons.preview}</button>
                                    <button disabled="true" id="themeEditorActions_saveTheme" data-mode="subMenuInteraction" data-menu="customizeTheme" data-action="saveTheme">${language.submenus.themeCreator.editorActions.buttons.save}</button>
                                    <button disabled="true" id="themeEditorActions_cancel" data-mode="subMenuInteraction" data-menu="customizeTheme" data-action="restoreTheme">${language.submenus.themeCreator.editorActions.buttons.cancel}</button>
                                </div>
                            </div>
                            <div class="option" style="display: flex;align-items: center;">
                                <svg style="filter: invert(var(--settings-menu-invert));" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="12" y="6" width="3" height="11" rx="1.5" fill="#222222"></rect>
                                    <circle cx="13.5" cy="19.5" r="1.5" fill="#222222"></circle>
                                    <circle cx="13.5" cy="13.5" r="12.25" stroke="#2F2F2F" stroke-width="2.5"></circle>
                                </svg> 
                                <p id="selectedStyleStatus" style="margin: 0 0 0 5px;">${language.submenus.themeCreator.previewAdvisorDefault}</p>
                            </div>
                            <hr>
                        </div>
                    </div>
                `,
                "insertContent": async (theme = "customTheme1") => {
                    let $container = document.querySelector(".settings-menu_category-content"),
                        $fragment = document.createDocumentFragment(),
                        $contentContainer = document.createElement("div"),
                        inputRangeValues = { //if the input type is range, there are their max values
                            "Global border radius": 10,
                            "Blur strenght": 40,
                            "Settings menu invert icons colour intensity": 100,
                        };
                    location.hash = "#/settings/appearance/theme-editor"
                    $container.scroll(0, 0)
                    $contentContainer.classList.add("customizeThemeContent")
                    this.subMenus.customizeTheme.editedTheme = theme
                    for(let key in this.config.customThemes[theme]) { //creating sub-menu content
                        let $optionContainer = document.createElement("div"),
                            $optionTitle = document.createElement("legend"),
                            $optionDesc = document.createElement("p"),
                            $input = null;
        
                            $optionContainer.classList.add("option")
                            $optionTitle.textContent = key
                            $optionDesc.textContent = `Current value: ${sManager.getValue("customThemes", [theme, key])}`
                            $optionContainer.appendChild($optionTitle)
                            $optionContainer.appendChild($optionDesc)
                            
                            if(/(rgb(a?)|hsl(a?)|#)/.test(sManager.getValue("customThemes", [theme, key]))) { //this "if" validates the data type to use certain input type
                                $input = `<div class="colourPicker-clickableSwatches" data-category="customThemes" data-keys='["${theme}", "${key}"]' value="${sManager.getValue("customThemes", [theme, key])}" style="background-color: ${sManager.getValue('customThemes', [theme, key])};" data-mode="subMenuInteraction" data-menu="customizeTheme" data-action="showColourPicker" data-value="${sManager.getValue("customThemes", [theme, key])}"></div>`
                            } else {$input = `<input type="range" data-subSetting="true" data-mode="set" data-category="customThemes" data-keys='["${theme}", "${key}"]' min="0" max="${inputRangeValues[key]}" value="${sManager.getValue("customThemes", [theme, key])}">`}
                            $optionContainer.insertAdjacentHTML("beforeend", $input)
                            $fragment.appendChild($optionContainer)
                    }
                    $contentContainer.appendChild($fragment)
                    $container.appendChild($contentContainer)
                    this.subMenus.customizeTheme.previousTheme = sManager.getValue("appearance", ["theme"])
                    if(this.subMenus.customizeTheme.previewEnabled === "true" || sManager.getValue("appearance", ["theme"]).includes("customTheme")) {
                        this.subMenus.customizeTheme.previewEnabled = "false"
                        this.subMenus.customizeTheme.submenuInteractions.livePreview()
                    }
                },
                "submenuInteractions": {
                    "livePreview": () => {
                        if(this.subMenus.customizeTheme.previewEnabled === "false") {
                            if(document.querySelectorAll("#theme-editor_actions button[disabled]")) document.querySelectorAll("#theme-editor_actions button[disabled]").forEach(node => node.removeAttribute("disabled"))
                            document.querySelectorAll("[data-alert]").forEach(node => node.setAttribute("data-alert", "true"))
                            this.subMenus.customizeTheme.previewEnabled = "true"
                            
                            document.getElementById("selectedStyleStatus").textContent = `${language.submenus.themeCreator.previewAdvisorActive}`
                            document.getElementById("selectedStyleStatus").style.color = "var(--important-text-colour)"
                            
                            sManager.saveSettings("appearance", ["theme"], this.subMenus.customizeTheme.editedTheme)
                            return refreshModules()
                        } else if(this.subMenus.customizeTheme.previewEnabled === "true"){
                            document.querySelectorAll("[data-alert]").forEach(node => node.setAttribute("data-alert", "false"))
                            this.subMenus.customizeTheme.previewEnabled = "false"
                            
                            document.getElementById("selectedStyleStatus").textContent = `${language.submenus.themeCreator.previewAdvisorDefault}`
                            document.getElementById("selectedStyleStatus").style.color = "var(--main-content-font)"
                            document.getElementById("themeEditorActions_preview").setAttribute("data-active", "false")
                            
                            sManager.saveSettings("appearance", ["theme"], this.subMenus.customizeTheme.previousTheme)
                            refreshModules()
                        }
                    },
                    "showThemeValue": (target) => {
                        document.querySelector(".settings-menu_category-content").removeChild(document.querySelector(".customizeThemeContent"))
                        document.getElementById("themeEditorActions_preview").setAttribute("data-active", "true")
                        this.subMenus.customizeTheme.submenuInteractions.livePreview(document.getElementById("themeEditorActions_preview"))
                        this.subMenus.customizeTheme.insertContent(target.dataset.value)
                    },
                    "saveTheme": () => {
                        showAlert(language.alerts.saveTheme.title, language.alerts.saveTheme.desc)
                            .then(() => {
                                this.subMenus.customizeTheme.themeBackup = null
                            })
                            .catch((err) => {return})
                    },
                    "restoreTheme": () => {
                        showAlert(language.alerts.restoreTheme.title, language.alerts.restoreTheme.desc)
                            .then(() => {
                                showNotification("The theme was restored", "You wont be able to restore your changes")
                                sManager.saveSettings("customThemes", [sManager.getValue("appearance", ["theme"])], this.subMenus.customizeTheme.themeBackup)
                                sManager.saveSettings("appearance", ["theme", this.subMenus.customizeTheme.previousTheme])
                            }) .catch((err) => {return})
                    },
                    "useColour": (obj)=> {
                        const target = obj[1]
                        console.log(target.dataset)
                        target.style.backgroundColor = obj[0]
                        target.previousElementSibling.textContent = `Current value: ${obj[0]}`
                        target.dataset.value = obj[0]
                        sManager.saveSettings(target.dataset.category, JSON.parse(target.dataset.keys), obj[0])
                        refreshModules()
                    },
                    "showColourPicker": (target) => {
                        colourPicker.openMenu(target, this.subMenus.customizeTheme.submenuInteractions.useColour)
                    },
                    "openGuide": () => {
                        const $container = document.querySelector(".settings-menu_content");
                        const $content = `
                                <div>
                                    <div class="settings-menu_content-top">
                                        <h5 id="category-name">How to use the Theme editor</h5>
                                        <hr>
                                    </div>
                                    <div class="settings-menu_category-content">
                                        <legend class="subtitle">Understanding properties name</legend>
                                        <p>Every property name starts with prefixes like "Main content", they bring you information of wich part of the app you'll modify</p>
                                        <ol>
                                            <li>
                                                <p><b>Top content</b></p>
                                                <legend>In the top content you can see the Hour, the weather and finally the settings trigger. Here you can change the font colour and the opacity of the Weather PopUp.</legend>
                                                <img src="App/Assets/Images/Examples/top_content.webp">
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            `
                        $container.innerHTML = ''
                        $container.innerHTML = $content
                    }
                }
            }
        }
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
                if(target.dataset.keys.includes("autoSet-weather_city")) getWeather("auto")
                if(target.dataset.promt === "true") value = await showPromt({title: target.dataset.promttitle, desc:target.dataset.promtdesc, placeholder: sManager.getValue(target.dataset.category, keys) || [target.dataset.placeholder]})
                sManager.saveSettings(target.dataset.category, keys, parseInt(target.value) || target.dataset.value || target.value)
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
                let $contentContainer = document.querySelector(".settings-menu_content")
                $contentContainer.innerHTML = this.subMenus[target.dataset.typeofmenu].html
                if(this.subMenus[target.dataset.typeofmenu].dynamicContent === true) this.subMenus[target.dataset.typeofmenu].insertContent()
            },
            "subMenuInteraction": (target) => {
                if(this.subMenus[target.dataset.menu]["submenuInteractions"].hasOwnProperty(target.dataset.action)) return this.subMenus[target.dataset.menu]["submenuInteractions"][target.dataset.action](target)
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
                            width: 80%;
                        }
                    `
                    const optionsHTML = {
                        "weatherContainerOptions": `
                            <legend class="window-categoryTitle">Edit weather container</legend>
                            <div class="onWindowOption">
                                <legend>Disable module</legend>
                                <p>This will turn off Weather module and the element will be removed</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "weatherContainer", "displayOn"])}" data-specificonroute='["mainPageItems", "weatherContainer", "displayOn"]'data-category="appearance" data-keys='["mainPageItems", "weatherContainer", "display"]' data-activevalue="flex" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                            </div>
                            <hr>
                            <div class="onWindowOption">
                                <legend>Display status icon</legend>
                                <p>Show or hide the weather status icon</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "weatherContainer", "weatherIcon", "displayOn"])}" data-category="appearance" data-keys='["mainPageItems", "weatherContainer", "weatherIcon", "display"]' data-activevalue="block" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">Order</legend>
                                    <input type="number" min="0" max="1" value="0" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weatherContainer", "weatherIcon", "order"]'></input>
                                </div>
                            </div>
                            <div class="onWindowOption">
                                <legend>Display temperature</legend>
                                <p>Show or hide the temperature information</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "weatherContainer", "temp", "displayOn"])}" data-category="appearance" data-keys='["mainPageItems", "weatherContainer", "temp", "display"]' data-activevalue="flex" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">Order</legend>
                                    <input type="number" min="0" max="1" value="0" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "weatherContainer", "weatherIcon", "order"]'></input>
                                </div>
                            </div>
                            <div class="onWindowOption">
                                <legend>Display location</legend>
                                <p>Show or hide the weather location</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "weatherContainer", "location", "displayOn"])}" data-category="appearance" data-keys='["mainPageItems", "weatherContainer", "location", "display"]' data-activevalue="flex" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                            </div>
                        `,
                        "settingsOpenerOptions": `
                            <legend class="window-categoryTitle">Edit settings menu openers</legend>
                            <div class="onWindowOption">
                                <legend>Display "settings"</legend>
                                <p>Show or hide the "Settings" text</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "settingsOpener", "displayOn"])}" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "display"]' data-activevalue="block" data-offValue="none" data-roea='["mainPageItems", "settingsOpener", "settingsIcon", "display"]' data-roearv="block" data-roeavalue="false">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">Order</legend>
                                    <input type="number" min="0" max="1" value="0" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "order"]'></input>
                                </div>
                            </div>
                            <hr>
                            <div class="onWindowOption">
                                <legend>Display icon</legend>
                                <p>Show or hide the settings icon. you can only select one item to hide, if you hide this item, the "Settings" text will be displayed and vice versa</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "weatherContainer", "temp", "displayOn"])}" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "settingsIcon", "display"]' data-activevalue="block" data-offValue="none" data-roea='["mainPageItems", "settingsOpener", "display"]' data-roearv="block" data-roeavalue="false">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">Size</legend>
                                    <input type="range" min="0" max="128" value="32" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "settingsIcon", "size"]'></input>
                                </div>
                            </div>
                        `,
                        "dateOptions": `
                            <legend class="window-categoryTitle">Edit Date and Hour elements</legend>
                            <div class="onWindowOption">
                                <legend>Disable module</legend>
                                <p>By turning of this module, the date and hour will not work until you turn on again this module.</p>
                                <div class="option-toggle containerWithButton" data-mode="toggle" data-active="${sManager.getValue("appearance", ["mainPageItems", "dateAndHour", "hour", "displayOn"])}" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", "display"]' data-activevalue="block" data-offValue="none">
                                    <div class="option-toggle_circle" data-mode="toggle"></div>
                                </div>
                                <hr>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">Order</legend>
                                    <input type="number" min="0" max="1" value="0" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "dateAndHour", "hour", ]'></input>
                                </div>
                                <div class="optionProperty">
                                    <legend class="optionProperty-title">Font size</legend>
                                    <input type="number" min="0" max="1" value="64" data-mode="set" data-category="appearance" data-keys='["mainPageItems", "settingsOpener", "order"]'></input>
                                </div>
                            </div>
                            <hr>
                        `
                    }
                    this.menuInteractions["close-menu"]()
                    createWindow.openWindow("Edit element", optionsHTML[target.dataset.windowcontent], style)
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
        settingsMenuManager.menuInteractions[e.target.dataset.mode](e.target)
    }
}
function settingsMenuSelectsHandler(e){
    if(e.target.tagName === "SELECT"){
        if(settingsMenuManager.menuInteractions[e.target.children[e.target.selectedIndex].dataset.mode]){
            settingsMenuManager.menuInteractions[e.target.children[e.target.selectedIndex].dataset.mode](e.target.children[e.target.selectedIndex])
        }
    }
    if(e.target.type === "range"){
        if(settingsMenuManager.menuInteractions[e.target.dataset.mode]){
           settingsMenuManager.menuInteractions[e.target.dataset.mode](e.target) 
        }
    }
}
export const settingsMenuManager = new SETTINGS_MENU_MANAGER(settingsMenuInteractionsHandler, settingsMenuSelectsHandler)
