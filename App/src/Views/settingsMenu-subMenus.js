import { sManager } from "../../settingsManager.js";
import { refreshModules } from "../Components/App.js";
import { colourPicker } from "../Components/colourPicker.js";
import { showAlert } from "../Helpers/showAlert.js";
const lang = sManager.getValue("general", ["lang"]);
const language = (await import(`../lang/${lang}.js`)).default;

class GET_SUBMENUS_CONTENT {
    constructor() {
        this.config = sManager.getFullSettings();
        this.themeEditor = {
            vars: {
                dynamicContent: true,
                parentMenu: "appearance",
                themeBackup: null,
                previousTheme: null,
                editedTheme: "customTheme1",
                previewEnabled: "false"
            },
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
                            <button data-mode="subMenuInteraction" data-menu="themeEditor" data-action="openGuide">View tutorials</button>
                        </div>
                        <div class="option theme-editor_actions">
                            <div id="theme-editor_selectedTheme">
                                <p>${language.submenus.themeCreator.editorActions.p}</p>
                                <select class="option-select">
                                    <option data-mode="subMenuInteraction" data-menu="themeEditor" data-action="showThemeValue" data-value="customTheme1">${language.submenus.themeCreator.editorActions.select.customTheme1}</option>
                                    <option data-mode="subMenuInteraction" data-menu="themeEditor" data-action="showThemeValue" data-value="customTheme2">${language.submenus.themeCreator.editorActions.select.customTheme2}</option>
                                </select>
                            </div>
                            <div id="theme-editor_actions">
                                <button id="themeEditorActions_preview" data-mode="subMenuInteraction" data-menu="themeEditor" data-action="livePreview" data-active="false">${language.submenus.themeCreator.editorActions.buttons.preview}</button>
                                <button disabled="true" id="themeEditorActions_saveTheme" data-mode="subMenuInteraction" data-menu="themeEditor" data-action="saveTheme">${language.submenus.themeCreator.editorActions.buttons.save}</button>
                                <button disabled="true" id="themeEditorActions_cancel" data-mode="subMenuInteraction" data-menu="themeEditor" data-action="restoreTheme">${language.submenus.themeCreator.editorActions.buttons.cancel}</button>
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
                        <div class="option" style="display: flex;align-items: center;">
                            <svg style="filter: invert(var(--settings-menu-invert));" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="12" y="6" width="3" height="11" rx="1.5" fill="#222222"></rect>
                                <circle cx="13.5" cy="19.5" r="1.5" fill="#222222"></circle>
                                <circle cx="13.5" cy="13.5" r="12.25" stroke="#2F2F2F" stroke-width="2.5"></circle>
                            </svg> 
                            <p id="selectedStyleStatus" style="margin: 0 0 0 5px;">${language.submenus.themeCreator.betaStatusAlert}</p>
                        </div>
                    </div>
                </div>
            `,
            "insertContent": (theme = "customTheme1") => {
                console.log(this.themeEditor.vars.dynamicContent)
                let $container = document.querySelector(".settings-menu_category-content")
                let $fragment = document.createDocumentFragment();
                let $contentContainer = document.createElement("div");
                let inputRangeValues = {  //if the input type is range, there are their max values
                    "Global border radius": 10,
                    "Blur strenght": 40,
                    "Settings menu invert icons colour intensity": 100,
                };
                location.hash = "#/settings/appearance/theme-editor"
                $container.scroll(0, 0)
                $contentContainer.classList.add("themeEditorContent")
                this.themeEditor.vars.editedTheme = theme
                for(let key in this.config.customThemes[theme]) { //creating sub-menu content
                    let $optionContainer = document.createElement("div");
                    let $optionTitle = document.createElement("legend");
                    let $optionDesc = document.createElement("p");
                    let $input = null;

                    $optionContainer.classList.add("option")
                    $optionTitle.textContent = key
                    $optionDesc.textContent = `Current value: ${sManager.getValue("customThemes", [theme, key])}`
                    $optionContainer.appendChild($optionTitle)
                    $optionContainer.appendChild($optionDesc)
                    
                    if(/(rgb(a?)|hsl(a?)|#)/.test(sManager.getValue("customThemes", [theme, key]))) { //this "if" validates the data type to use certain input type
                        $input = `<div class="colourPicker-clickableSwatches" data-category="customThemes" data-keys='["${theme}", "${key}"]' value="${sManager.getValue("customThemes", [theme, key])}" style="background-color: ${sManager.getValue('customThemes', [theme, key])};" data-mode="subMenuInteraction" data-menu="themeEditor" data-action="showColourPicker" data-value="${sManager.getValue("customThemes", [theme, key])}"></div>`
                    } else {$input = `<input type="range" data-subSetting="true" data-mode="set" data-category="customThemes" data-keys='["${theme}", "${key}"]' min="0" max="${inputRangeValues[key]}" value="${sManager.getValue("customThemes", [theme, key])}">`}
                    $optionContainer.insertAdjacentHTML("beforeend", $input)
                    $fragment.appendChild($optionContainer)
                }
                this.themeEditor.vars.editedTheme = document.querySelector('.settings-menu .settings-menu_content .settings-menu_category-content .option-select')?.children[document.querySelector('.settings-menu .settings-menu_content .settings-menu_category-content .option-select').selectedIndex].dataset.value;
                this.themeEditor.vars.themeBackup = sManager.getValue("customThemes", [this.themeEditor.vars.editedTheme])
                this.themeEditor.vars.previousTheme = sManager.getValue("appearance", ["theme"])

                $contentContainer.appendChild($fragment)
                $container.appendChild($contentContainer)
                if(this.themeEditor.vars.previewEnabled === "true" || sManager.getValue("appearance", ["theme"]).includes("customTheme")) {
                    this.themeEditor.vars.previewEnabled = "false"
                    this.themeEditor.submenuInteractions.livePreview()
                }
            },
            "submenuInteractions": {
                "livePreview": () => {
                    if(this.themeEditor.vars.previewEnabled === "false") {
                        if(document.querySelectorAll("#theme-editor_actions button[disabled]")) document.querySelectorAll("#theme-editor_actions button[disabled]").forEach(node => node.removeAttribute("disabled"))
                        document.querySelectorAll("[data-alert]").forEach(node => node.setAttribute("data-alert", "true"))
                        this.themeEditor.vars.previewEnabled = "true"
                        
                        document.getElementById("selectedStyleStatus").textContent = `${language.submenus.themeCreator.previewAdvisorActive}`
                        document.getElementById("selectedStyleStatus").style.color = "var(--important-text-colour)"
                        
                        sManager.saveSettings("appearance", ["theme"], this.themeEditor.vars.editedTheme)
                        return refreshModules()
                    } else if(this.themeEditor.vars.previewEnabled === "true"){
                        document.querySelectorAll("[data-alert]").forEach(node => node.setAttribute("data-alert", "false"))
                        this.themeEditor.vars.previewEnabled = "false"
                        
                        document.getElementById("selectedStyleStatus").textContent = `${language.submenus.themeCreator.previewAdvisorDefault}`
                        document.getElementById("selectedStyleStatus").style.color = "var(--main-content-font)"
                        document.getElementById("themeEditorActions_preview").setAttribute("data-active", "false")
                        
                        sManager.saveSettings("appearance", ["theme"], this.themeEditor.vars.previousTheme)
                        return refreshModules()
                    }
                },
                "showThemeValue": (target) => {
                    document.querySelector(".settings-menu_category-content").removeChild(document.querySelector(".themeEditorContent"))
                    document.getElementById("themeEditorActions_preview").setAttribute("data-active", "true")
                    this.themeEditor.submenuInteractions.livePreview(document.getElementById("themeEditorActions_preview"))
                    this.themeEditor.insertContent(target.dataset.value)
                },
                "saveTheme": () => {
                    showAlert(language.alerts.saveTheme.title, language.alerts.saveTheme.desc)
                        .then(() => {
                            this.themeEditor.vars.themeBackup = null
                        })
                        .catch((err) => {return})
                },
                "restoreTheme": () => {
                    console.log(this.themeEditor.vars.editedTheme)
                    showAlert(language.alerts.restoreTheme.title, language.alerts.restoreTheme.desc)
                        .then(() => {
                            showNotification("The theme was restored", "You wont be able to restore your changes")
                            // saveSettings("customThemes", [this.themeEditor.vars.editedTheme], this.themeEditor.vars.themeBackup)
                            sManager.saveSettings("appearance", ["theme"], this.themeEditor.vars.previousTheme)
                        }) .catch((err) => {return})
                },
                "useColour": (obj)=> {
                    const target = obj[1]
                    target.style.backgroundColor = obj[0]
                    target.previousElementSibling.textContent = `Current value: ${obj[0]}`
                    target.dataset.value = obj[0]
                    sManager.saveSettings(target.dataset.category, JSON.parse(target.dataset.keys), obj[0])
                    refreshModules()
                },
                "showColourPicker": (target) => {
                    colourPicker.openMenu(target, this.themeEditor.submenuInteractions.useColour)
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
        };
        this.backgroundOptions = {
            "vars": {
                dynamicContent: true,
                currentBgType: sManager.getValue("appearance", ["background", "type"])
            },
            "html": `
                <div class="settings-menu_category-content">
                    <div class="settings-menu_content-top">
                        <div title="Back to appearance category">
                            <svg id="submenus-backButon" data-alert="false" data-mode="change-menu" data-category="appearance" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="6.28918" y="0.642029" width="2" height="7" rx="1" transform="rotate(60 6.28918 0.642029)" fill="#CFCFCF"/>
                                <rect x="7.28918" y="6.62592" width="2" height="7" rx="1" transform="rotate(120 7.28918 6.62592)" fill="#CFCFCF"/>
                            </svg>
                        </div>
                        <h5 id="category-name">${language.settings.appearance.backgrounds.submenu.title}</h5>
                        <hr>
                    </div>
                    <div class="settings-menu_category-content">
                        <div id="currentUserBg"></div>
                        <div class="option" style="background-color: transparent;">
                            <legend>${language.settings.appearance.backgrounds.submenu.bgImages}</legend>
                            <div style="display: flex; overflow-y: hidden; overflow-x: auto; grid-row: 2/3; grid-column: 1/3; margin-top: clamp(8px, 1vh, 16px); border-radius: var(--global-border-radius);">
                                <button data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-promt="true" data-promttitle="Inserta la URL de la imagen" data-promtdesc="" style="height: 100%; margin-right: 1rem;">${language.settings.appearance.backgrounds.submenu.bgImagesButton}</button>
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/1.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/1.webp">
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/2.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/2.webp">
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/3.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/3.webp">
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/4.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/4.webp">
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/5.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/5.webp">
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/6.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/6.webp">
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/7.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/7.webp">
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/8.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/8.webp">
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/9.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/9.webp">
                                <img class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundImage" data-value="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/10.webp" src="https://raw.githubusercontent.com/Nebula-mx/start-page_backgrounds/main/default-backgrounds/10.webp">
                            </div>
                        </div>
                        <div class="option" style="background-color: transparent;">
                            <legend>${language.settings.appearance.backgrounds.submenu.bgColours}</legend>
                            <div style="display: flex; overflow-y: hidden; overflow-x: auto; grid-row: 2/3; grid-column: 1/3; margin-top: clamp(8px, 1vh, 16px); border-radius: var(--global-border-radius);">
                                <button data-mode="subMenuInteraction" data-menu="backgroundOptions" data-category="appearance" data-action="showColourPicker" data-keys='["background", "value"]' data-value="rgba(255, 0, 0, 255)" data-bgtype="backgroundColor" style="height: 100%; margin-right: 1rem; ">${language.settings.appearance.backgrounds.submenu.bgColoursButton}</button>
                                <span class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundColor" data-value="#fff" style="min-width: 64px;width: 10vw;max-width: 150px; background-color: #fff; border: solid 1px var(--light-button-border);"></span>
                                <span class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundColor" data-value="#2e3440" style="min-width: 64px; width: 10vw; max-width: 150px; background-color: #2e3440;"></span>
                                <span class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundColor" data-value="#434c5e" style="min-width: 64px; width: 10vw; max-width: 150px; background-color: #434c5e;"></span>
                                <span class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundColor" data-value="#d8dee9" style="min-width: 64px; width: 10vw; max-width: 150px; background-color: #d8dee9;"></span>
                                <span class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundColor" data-value="#eceff4" style="min-width: 64px; width: 10vw; max-width: 150px; background-color: #eceff4;"></span>
                                <span class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundColor" data-value="#5e81ac" style="min-width: 64px; width: 10vw; max-width: 150px; background-color: #5e81ac;"></span>
                                <span class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundColor" data-value="#81a1c1" style="min-width: 64px; width: 10vw; max-width: 150px; background-color: #81a1c1;"></span>
                                <span class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundColor" data-value="#b48ead" style="min-width: 64px; width: 10vw; max-width: 150px; background-color: #b48ead;"></span>
                                <span class="selectableBg" data-dosubmenuinteractionfirst="true" data-menu="backgroundOptions" data-action="checkBgType" data-mode="set" data-category="appearance" data-keys='["background", "value"]' data-bgtype="backgroundColor" data-value="#ebcb8b" style="min-width: 64px; width: 10vw; max-width: 150px; background-color: #ebcb8b;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            "insertContent": () => {
                let $container = document.querySelector(".settings-menu_content")
                location.hash = "#/settings/appearance/backgrounds"
                $container.scroll(0, 0)
                if(sManager.getValue("appearance", ["background", "type"]) === "backgroundImage") {
                    document.getElementById("currentUserBg").outerHTML = `<img alt="User background" id="currentUserBg" src="${sManager.getValue("appearance", ["background", "value"])}">`
                } else {
                    document.getElementById("currentUserBg").outerHTML = `<span alt="User background" id="currentUserBg" style="width: clamp(64px, 30vw, 250px); background-color: ${sManager.getValue("appearance", ["background", "value"])};"></span>`
                }
            },
            "submenuInteractions": {
                checkBgType: (target) => {
                    if(target.dataset.bgtype !== this.backgroundOptions.vars.currentBgType) {
                        document.getElementById("root").style[this.backgroundOptions.vars.currentBgType] = null
                        this.backgroundOptions.vars.currentBgType = target.dataset.bgtype
                        sManager.config.appearance.background.type = target.dataset.bgtype
                    }
                },
                "useColour": (obj) => {
                    console.log(obj)
                    this.backgroundOptions.submenuInteractions.checkBgType(obj[1])
                    sManager.saveSettings(obj[1].dataset.category, JSON.parse(obj[1].dataset.keys), obj[0])
                    refreshModules()
                },
                "showColourPicker": (target) => {
                    colourPicker.openMenu(target, this.backgroundOptions.submenuInteractions.useColour)
                },
            }
        }
    }
    insertMenu(menuType) {
        let $contentContainer = document.querySelector(".settings-menu_content")
        $contentContainer.innerHTML = this[menuType].html
        if(this[menuType].vars.dynamicContent === true) this[menuType].insertContent()
    }
    menuInteractions(menuType, action, target) {
        if(this[menuType].submenuInteractions.hasOwnProperty(action)) this[menuType].submenuInteractions[action](target)
    }
}
export const getSubMenus = new GET_SUBMENUS_CONTENT()