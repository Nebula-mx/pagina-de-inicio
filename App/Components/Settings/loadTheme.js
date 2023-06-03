import { sManager } from "../loadSettings.js"

class THEME_MANAGER {
    constructor(){
        this.$cssvariables = document.getElementById("css-variables")
        this.$root = document.getElementById("root")
        this.$favicon = document.getElementById("favicon")
        this.themes = null
        this.favicons = {
            "Firefox": "App/Assets/Images/Firefox.png",
            "Edg": "App/Assets/Images/Edge.png",
            "Chrome": "App/Assets/Images/Chrome.png"
        }
        this.objectsThemes = {
            "top_itemsBg": {
                "true": () => {
                    document.querySelectorAll("[data-containerBG]").forEach(el => {
                        el.style.backgroundColor = "var(--top-items-BG)"
                    })
                },
                "false": () => {
                    document.querySelectorAll("[data-containerBG]").forEach(el => {
                        el.style.backgroundColor = "transparent"
                    })
                }
            },
            "invert_top_items_colour": {
                "true": () => {
                    document.querySelectorAll("[data-containerbg] p, h2, #settings img").forEach(el => {
                        el.style.filter = "invert(100%)"
                    })
                },
                "false": () => {
                    document.querySelectorAll("[data-containerbg] p, h2, #settings img").forEach(el => {
                        el.style.filter = "invert(0)"
                    })
                }
            }
        }
    }
    async aplyTheme(){
        this.$cssvariables.innerHTML = this.themes[sManager.getValue("appearance", "theme")]
        this.$root.style.backgroundImage = `url(${sManager.getValue("appearance", "background")})`
        
        for (let obj in this.objectsThemes) {
            this.objectsThemes[obj][sManager.getValue("appearance", obj)]()
        }
        for(let fvn in this.favicons){
           if(navigator.userAgent.includes(fvn)){
               return this.$favicon.href = this.favicons[fvn]
           }
       }
    }
    startModule(){
        //this method exist because this make a call to the sManager, and this class is started before sManager so this can make an error when starting the app
        this.themes = {
            light: `
                :root{
                    --body-backgroundImage: url(${sManager.getValue("appearance", "background")});
                    --global-border-radius: 5px;
                    --blur-strenght: ${sManager.getValue("appearance", "blur")}px;
                    --top-items-BG: rgba(0, 0, 0, 0.2);
                    --top-content-weather-PopUp-BG: rgba(255, 255, 255, ${sManager.getValue("appearance", "weatherPopUpOpacity")}%);
                    --important-text-colour: rgba(191, 0, 0, 1);
                    
                    --colourPicker-topBg: #FFFFFF;
                    --colourPicker-topColor: #000;
                    --colourPicker-topButtonsBG: #F3F3F3;
                    --colourPicker-mainBg: #EEEEEE;
                    --colourPicker-spectrumSelectors-bg: #fff;
                    --colourPicker-main-fontColor: #000;
                    --colourPicker-main-formatSelectorBg: #D3D3D3;
                    --colourPicker-main-formatSelectorHoverBg: #B8B8B8;
                    --colourPicker-main-formatSelectorActiveBg: #B1B1B1;
                    --colourPicker-main-formatSelectorSelectedBg: #fff;
                    --colourPicker-main-valueName: #fff;
                    --colourPicker_mainContent-colourValue: #D3D3D3;
                    --colourPicker_mainContent-defaultColorSwatches: #D9D9D9;

                    --inputs-colour_border_colour: rgba(168, 168, 168, 1);
                                                            
                    --light-button-theme: rgb(255, 255, 255); 
                    --light-button-border: rgba(0, 0, 0, 0.15);
                    --light-button-fontColor: rgba(0, 0, 0, .75);
                    --light-button-hover: rgb(243, 243, 243);
                    --light-button-active: rgb(235, 235, 235);
        
                    --top-content-light-fontColor: #000;
                    --main-content-font: #000;
                    --main-content-light-bg: rgba(255, 255, 255, ${sManager.getValue("appearance", "mainContentBgOpacity")}%);
        
                    --main-content-light-searchBox: #ffffffb3; 
                    --main-content-light-searchBtn: #FFFFFF;
                    --main-content-light-icon-bg: rgba(255, 255, 255, 0.50);
        
                    --light-button-theme: rgb(255, 255, 255); 
                    --light-button-border: rgba(0, 0, 0, 0.15);
                    --light-button-fontColor: rgba(0, 0, 0, .75); 
                    --light-button-hover: rgb(243, 243, 243);
                    --light-button-active: rgb(235, 235, 235);

                    --alert-top-Bg-colour: rgb(255, 255, 255);
                    --alert-buttonsContainer-Bg-colour: rgb(221, 221, 221);
                    
                    --context-menu-open-btn-invert: 0%;
                    --context-menu-light: rgba(255, 255, 255, ${sManager.getValue("appearance", "shortcutsPopUpOpacity")}%);
                    --context-menu-light-li: rgba(0, 0, 0, 0);
                    --context-menu-light-li-hover: rgba(0, 0, 0, 0.10);
                    
                    --shortcut-form-bg: rgba(255, 255, 255, 1);
                    --shortcut-form-inputtext-bg: rgba(255, 255, 255, 0.87);
                    --shortcut-form-inputText-border: rgba(212, 212, 212, 0.8);
                    --shortcut-form-btn-bg: rgb(255, 255, 255);
                    --shortcut-form-btn-hover: rgb(243, 243, 243);
                    --shortcut-form-btn-active: rgb(235, 235, 235);

                    --settings-menu_link: #5f0d84;
                    --settings-menu-light-list: #EEEC;
                    --settings-menu-light-list-items: #ffffff82;
                    --settings-menu-lignt-items-hoverBg: #ffffffb3;
                    --settings-menu-light-content: #fff;
                    --settings-menu-light-options:#EEE;
                    --settings-menu-light-selects:#D9D9D9;
                    --settings-menu-details: #e3e3e3;
                    --settings-menu-active-toggle: #7C79FF;
                    --settings-menu-toggleBg: #D9D9D9;
                    --settings-menu-option-toggleCircle: #fff;
                    --settings-menu-invert: 0%;
                    --settings-menu_code: rgba(223, 223, 223, 1);
            }`,
            dark: `
                :root {
                    --body-backgroundImage: url(${sManager.getValue("appearance", "background")});
                    --global-border-radius: 5px;
                    --blur-strenght: ${sManager.getValue("appearance", "blur")}px;
                    --important-text-colour: rgba(236, 110, 110, 1);
                    
                    --colourPicker-topBg: rgba(0, 0, 0, 1);
                    --colourPicker-topColor: #fff;
                    --colourPicker-topButtonsBG: #252525;
                    --colourPicker-mainBg: #111111;
                    --colourPicker-spectrumSelectors-bg: #fff;
                    --colourPicker-main-fontColor: #fff;
                    --colourPicker-main-formatSelectorBg: #212121;
                    --colourPicker-main-formatSelectorHoverBg: #363636;
                    --colourPicker-main-formatSelectorActiveBg: rgb(37, 37, 37);
                    --colourPicker-main-formatSelectorSelectedBg: #000;
                    --colourPicker-main-valueName: #000;
                    --colourPicker_mainContent-colourValue: #212121;
                    --colourPicker_mainContent-defaultColorSwatches: #060606;
    
                    --top-content-light-fontColor: #000;
                    --top-items-BG: rgba(0, 0, 0, 0.2);
                    --top-content-weather-PopUp-BG: rgba(0, 0, 0, ${sManager.getValue("appearance", "weatherPopUpOpacity")}%);
    
                    --inputs-colour_border_colour: rgba(47, 47, 47, 1);
                    
                    --main-content-font: #fff;
                    --main-content-light-bg: rgba(0, 0, 0, ${sManager.getValue("appearance", "mainContentBgOpacity")}%);
                    --main-content-light-searchBox: rgba(21, 21, 21, 0.8);
                    --main-content-light-searchBtn: rgb(0, 0, 0);
                    --main-content-light-icon-bg: rgba(0, 0, 0, 0.6);
                    
                    --light-button-theme: rgba(39, 39, 39, 1); 
                    --light-button-border: rgba(255, 255, 255, 0.06);
                    --light-button-fontColor: #fff; 
                    --light-button-hover: rgba(55, 55, 55, 1);
                    --light-button-active: rgb(28, 28, 28);
            
                    --alert-top-Bg-colour: rgb(13, 13, 13);
                    --alert-buttonsContainer-Bg-colour: rgb(19, 19, 19);
                    
                    --context-menu-open-btn-invert: 100%;
                    --context-menu-light: rgba(16, 16, 16, ${sManager.getValue("appearance", "shortcutsPopUpOpacity")}%);
                    --context-menu-light-li: rgba(0, 0, 0, 0);
                    --context-menu-light-li-hover: #9393931c;
                    
                    --shortcut-form-bg: rgba(17, 17, 17, 1);
                    --shortcut-form-inputtext-bg: rgba(34, 34, 34, 0.87);
                    --shortcut-form-inputText-border: #2f2f2f;
                    --shortcut-form-btn-bg: rgba(34, 34, 34, 0.87);
                    --shortcut-form-btn-hover: rgb(38, 38, 38);
                    --shortcut-form-btn-active: rgb(28, 28, 28);
            
                    --settings-menu-list-border: 1px solid rgba(255, 255, 255, 0.1);
                    --settings-menu_link: #ff98d2;
                    --settings-menu-light-list: #070707c4;
                    --settings-menu-light-list-items: #28282866;
                    --settings-menu-lignt-items-hoverBg: #222;
                    --settings-menu-light-content: #000;
                    --settings-menu-light-options: #0E0E0E;
                    --settings-menu-details: rgb(6 6 6);
                    --settings-menu-light-selects: rgba(39, 39, 39, 1);
                    --settings-menu-active-toggle: #7C79FF;
                    --settings-menu-toggleBg: rgba(39, 39, 39, 1);
                    --settings-menu-option-toggleCircle: #fff;
                    --settings-menu-invert: 100%;
                    --settings-menu_code: rgba(0, 0, 0, 1);
            } `,
            "customTheme1": `
                :root {
                    --body-backgroundImage: url(${sManager.getValue("appearance", "background")});
                    --global-border-radius: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Global border radius")}px;
                    --blur-strenght: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Blur strenght")}px;
                    --important-text-colour: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Important text colour")};
                    
                    --colourPicker-topBg: rgba(0, 0, 0, 1);
                    --colourPicker-topColor: #fff;
                    --colourPicker-topButtonsBG: #252525;
                    --colourPicker-mainBg: #111111;
                    --colourPicker-spectrumSelectors-bg: #fff;
                    --colourPicker-main-fontColor: #fff;
                    --colourPicker-main-formatSelectorBg: #212121;
                    --colourPicker-main-formatSelectorHoverBg: #363636;
                    --colourPicker-main-formatSelectorActiveBg: rgb(37, 37, 37);
                    --colourPicker-main-formatSelectorSelectedBg: #000;
                    --colourPicker-main-valueName: #000;
                    --colourPicker_mainContent-colourValue: #212121;
                    --colourPicker_mainContent-defaultColorSwatches: #060606;
                    
                    --top-content-light-fontColor: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Top content font colour")};
                    --top-items-BG: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Highlight top content items bg")};
                    --top-content-weather-PopUp-BG: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Weather popUp Bg colour")};

                    --inputs-colour_border_colour: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Input type color border colour")};
                            
                    --main-content-font: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Main content font colour")};
                    --main-content-light-bg: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Main content Bg colour")};
                    --main-content-light-searchBox: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Main content Search box Bg colour")};
                    --main-content-light-searchBtn: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Main content Search btn Bg colour")};
                    --main-content-light-icon-bg: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Shortcuts Bg colour")};
                    --light-button-theme: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Buttons Bg colour")}; 
                    --light-button-border: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Buttons border colour")};
                    --light-button-fontColor: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Buttons font colour")}; 
                    --light-button-hover: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Buttons hover colour")};
                    --light-button-active: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Buttons active Bg colour")};
            
                    --alert-top-Bg-colour: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Alerts top content Bg")};
                    --alert-buttonsContainer-Bg-colour: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Alerts actions container Bg")};
                    
                    --context-menu-open-btn-invert: 100%;
                    --context-menu-light: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Context menu Bg colour")};
                    --context-menu-light-li: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Context menu items Bg colour")};
                    --context-menu-light-li-hover: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Context menu items hover colour")};
                    
                    --shortcut-form-bg: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Shortcuts form Bg colour")};
                    --shortcut-form-inputtext-bg: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Shortcuts form inputs Bg colour")};
                    --shortcut-form-inputText-border: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Shortcuts form inputs border colour")};
                    --shortcut-form-btn-bg: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Shortcuts form buttons bg")};
                    --shortcut-form-btn-hover: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Shortcuts form button hover bg")};
                    --shortcut-form-btn-active: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Shortcuts form button active bg")};
            
                    --settings-menu-list-border: 1px solid rgba(255, 255, 255, 0.1);
                    --settings-menu_link: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu links colour")};
                    --settings-menu-light-list: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu categories list Bg colour")};
                    --settings-menu-light-list-items: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu categories items Bg")};
                    --settings-menu-lignt-items-hoverBg: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu categories items hover Bg")};
                    --settings-menu-light-content: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu main content Bg")};
                    --settings-menu-light-options: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu options Bg colour")};
                    --settings-menu-details: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu details Bg colour")};
                    --settings-menu-light-selects: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu selects Bg colour")};
                    --settings-menu-active-toggle: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu active toggle Bg")};
                    --settings-menu-toggleBg: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu off toggle Bg")};
                    --settings-menu-option-toggleCircle: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu toggle circle Bg colour")};
                    --settings-menu-invert: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu invert icons colour intensity")};
                    --settings-menu_code: ${sManager.getSubObjectValue("customThemes", "customTheme1", "Settings menu code Bg colour")};
            } `,
            "customTheme2": `
                :root {
                    --body-backgroundImage: url(${sManager.getValue("appearance", "background")});
                    --global-border-radius: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Global border radius")}px;
                    --blur-strenght: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Blur strenght")}px;
                    --important-text-colour: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Important text colour")};                    
                    
                    --colourPicker-topBg: rgba(0, 0, 0, 1);
                    --colourPicker-topColor: #fff;
                    --colourPicker-topButtonsBG: #252525;
                    --colourPicker-mainBg: #111111;
                    --colourPicker-spectrumSelectors-bg: #fff;
                    --colourPicker-main-fontColor: #fff;
                    --colourPicker-main-formatSelectorBg: #212121;
                    --colourPicker-main-formatSelectorHoverBg: #363636;
                    --colourPicker-main-formatSelectorActiveBg: rgb(37, 37, 37);
                    --colourPicker-main-formatSelectorSelectedBg: #000;
                    --colourPicker-main-valueName: #000;
                    --colourPicker_mainContent-colourValue: #212121;
                    --colourPicker_mainContent-defaultColorSwatches: #060606;  
                    
                    --top-content-light-fontColor: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Top content font colour")};
                    --top-items-BG: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Highlight top content items bg")};
                    --top-content-weather-PopUp-BG: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Weather popUp Bg colour")};

                    --inputs-colour_border_colour: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Input type color border colour")};
                            
                    --main-content-font: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Main content font colour")};
                    --main-content-light-bg: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Main content Bg colour")};
                    --main-content-light-searchBox: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Main content Search box Bg colour")};
                    --main-content-light-searchBtn: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Main content Search btn Bg colour")};
                    --main-content-light-icon-bg: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Shortcuts Bg colour")};
                    --light-button-theme: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Buttons Bg colour")}; 
                    --light-button-border: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Buttons border colour")};
                    --light-button-fontColor: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Buttons font colour")}; 
                    --light-button-hover: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Buttons hover colour")};
                    --light-button-active: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Buttons active Bg colour")};
            
                    --alert-top-Bg-colour: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Alerts top content Bg")};
                    --alert-buttonsContainer-Bg-colour: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Alerts actions container Bg")};
                    
                    --context-menu-open-btn-invert: 100%;
                    --context-menu-light: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Context menu Bg colour")};
                    --context-menu-light-li: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Context menu items Bg colour")};
                    --context-menu-light-li-hover: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Context menu items hover colour")};
                    
                    --shortcut-form-bg: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Shortcuts form Bg colour")};
                    --shortcut-form-inputtext-bg: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Shortcuts form inputs Bg colour")};
                    --shortcut-form-inputText-border: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Shortcuts form inputs border colour")};
                    --shortcut-form-btn-bg: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Shortcuts form buttons bg")};
                    --shortcut-form-btn-hover: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Shortcuts form button hover bg")};
                    --shortcut-form-btn-active: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Shortcuts form button active bg")};
            
                    --settings-menu-list-border: 1px solid rgba(255, 255, 255, 0.1);
                    --settings-menu_link: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu links colour")};
                    --settings-menu-light-list: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu categories list Bg colour")};
                    --settings-menu-light-list-items: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu categories items Bg")};
                    --settings-menu-lignt-items-hoverBg: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu categories items hover Bg")};
                    --settings-menu-light-content: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu main content Bg")};
                    --settings-menu-light-options: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu options Bg colour")};
                    --settings-menu-details: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu details Bg colour")};
                    --settings-menu-light-selects: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu selects Bg colour")};
                    --settings-menu-active-toggle: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu active toggle Bg")};
                    --settings-menu-toggleBg: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu off toggle Bg")};
                    --settings-menu-option-toggleCircle: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu toggle circle Bg colour")};
                    --settings-menu-invert: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu invert icons colour intensity")};
                    --settings-menu_code: ${sManager.getSubObjectValue("customThemes", "customTheme2", "Settings menu code Bg colour")};
            } `
        }
        this.aplyTheme()
    }
}
export let themeManager = new THEME_MANAGER()
