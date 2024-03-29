import { sManager } from "../../settingsManager.js"

class THEME_MANAGER {
    constructor(){
        this.$cssvariables = document.getElementById("css-variables")
        this.$root = document.getElementById("root")
        this.$favicon = document.getElementById("favicon")
        this.themes = null
        this.favicons = {
            "Firefox": "App/Assets/Images/Firefox.webp",
            "Edg": "App/Assets/Images/Edge.webp",
            "Chrome": "App/Assets/Images/Chrome.webp"
        },
        this.bgTypes = {
            "backgroundImage": (value) => `url(${value})`,
            "backgroundColor": (value) => value
        }
    }
    aplyMainPageItemsValues(){
        let mpiObj = sManager.getValue("appearance", ["mainPageItems"]);
        for(let obj in mpiObj){
            const currentObj = mpiObj[obj];
            for(let prop in currentObj){
                if(prop === "id" || prop === "activeModule" || prop === "displayOn" || prop === "topPercentage" || prop === "containerOpacity" || prop === "blurActive") continue;
                if(typeof(currentObj[prop]) === "object"){
                    const subProp = currentObj[prop]
                    for(let key in subProp){
                        if(key === "id" || key === "activeModule" || key === "displayOn" || key === "topPercentage" || key === "containerOpacity" || key === "blurActive") continue;
                        if(document.querySelectorAll(subProp.id) instanceof NodeList && document.querySelectorAll(subProp.id).length >= 3){
                            document.querySelectorAll(subProp.id).forEach(el => el.style[key] = subProp[key])
                            continue;
                        }               
                        if(document.querySelector(subProp.id))document.querySelector(subProp.id).style[key] = subProp[key]
                    }
                    continue;
                }
                if(document.querySelector(currentObj.id))document.querySelector(currentObj.id).style[prop] = currentObj[prop]
            }
        }
        mpiObj = null;
    }
    aplyTheme(){
        let bgObj = sManager.getValue("appearance", ["background"])
        this.$root.style[bgObj.type] = this.bgTypes[bgObj.type](bgObj.value)
        this.$cssvariables.innerHTML = this.themes[sManager.getValue("appearance", ["theme"])];
        this.aplyMainPageItemsValues()
        this.themes = null;
        bgObj = null;
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
    }
    startModule(){
        this.themes = {
            light: `
                :root{
                    --body-backgroundBlur: ${sManager.getValue("appearance", ["backgroundBlur"])}px;
                    --body-gridValues: ${sManager.getValue("appearance", ["mainPageItems", "contentRatio", "topPercentaje"])}dvh ${100 - parseInt(sManager.getValue("appearance", ["mainPageItems", "contentRatio", "topPercentaje"]))}dvh;
                    --blur-strenght: ${sManager.getValue("appearance", ["blur"])}px;
                    --global-border-radius: 5px;
                    --top-items-BG: ${sManager.getValue("appearance", ["top_itemsBg", "value"])};
                    --top-content-weather-PopUp-BG: rgba(255, 255, 255, ${sManager.getValue("appearance", ["weatherPopUpOpacity"])}%);
                    --important-text-colour: rgba(191, 0, 0, 1);
                    
                    --window-titleBar-bg: rgba(255, 255, 255, 64%);
                    --window-titleBar-title: rgba(0, 0, 0, 255);
                    --window-content-bg: rgba(255, 255, 255, 255);
                    --window-content-title: rgba(0, 0, 0, 255);
                    
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
                    --input-bgColour: rgba(255, 255, 255, 255);
                                                            
                    --light-button-theme: rgb(255, 255, 255); 
                    --light-button-border: rgba(0, 0, 0, 0.15);
                    --light-button-fontColor: rgba(0, 0, 0, .75);
                    --light-button-hover: rgb(243, 243, 243);
                    --light-button-active: rgb(235, 235, 235);
        
                    --top-content-light-fontColor: #000;
                    --top-content-invert: ${sManager.getValue("appearance", ["invert_top_items_colour", "value"])};
                    --main-content-font: #000;
                    --main-content-light-bg: rgba(255, 255, 255, ${sManager.getValue("appearance", ["mainPageItems", "mainContent", "container", "containerOpacity"])});
                    
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
                    --context-menu-light: rgba(255, 255, 255, ${sManager.getValue("appearance", ["shortcutsPopUpOpacity"])}%);
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
                    --settings-menu-indicator: #cecece;
            }`,
            dark: `
                :root {
                    --body-backgroundBlur: ${sManager.getValue("appearance", ["backgroundBlur"])}px;
                    --body-gridValues: ${sManager.getValue("appearance", ["mainPageItems", "contentRatio", "topPercentaje"])}dvh ${100 - parseInt(sManager.getValue("appearance", ["mainPageItems", "contentRatio", "topPercentaje"]))}dvh;
                    --blur-strenght: ${sManager.getValue("appearance", ["blur"])}px;
                    --global-border-radius: 5px;
                    --important-text-colour: rgba(236, 110, 110, 1);
                    
                    --window-titleBar-bg: rgba(0, 0, 0, 64%);
                    --window-titleBar-title: rgba(255, 255, 255, 255);
                    --window-content-bg: rgba(0, 0, 0, 255);
                    --window-content-title: rgba(255, 255, 255, 255);
                    
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
                    --top-items-BG: ${sManager.getValue("appearance", ["top_itemsBg", "value"])};
                    --top-content-weather-PopUp-BG: rgba(0, 0, 0, ${sManager.getValue("appearance", ["weatherPopUpOpacity"])}%);
                    --top-content-invert: ${sManager.getValue("appearance", ["invert_top_items_colour", "value"])};
    
                    --inputs-colour_border_colour: rgba(47, 47, 47, 1);
                    --input-bgColour: rgba(45, 45, 45, 255);
                    
                    --main-content-font: #fff;
                    --main-content-light-bg: rgba(0, 0, 0, ${sManager.getValue("appearance", ["mainPageItems", "mainContent", "container", "containerOpacity"])});
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
                    --context-menu-light: rgba(16, 16, 16, ${sManager.getValue("appearance", ["shortcutsPopUpOpacity"])}%);
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
                    --settings-menu-indicator: #3e3e3e;
            } `,
            "customTheme1": `
                :root {
                    --body-backgroundBlur: ${sManager.getValue("appearance", ["backgroundBlur"])}px;
                    --body-gridValues: ${sManager.getValue("appearance", ["mainPageItems", "contentRatio", "topPercentaje"])}dvh ${100 - parseInt(sManager.getValue("appearance", ["mainPageItems", "contentRatio", "topPercentaje"]))}dvh;
                    --blur-strenght: ${sManager.getValue("customThemes", ["customTheme1", "Blur strenght"])}px;
                    --important-text-colour: ${sManager.getValue("customThemes", ["customTheme1", "Important text colour"])};
                    --global-border-radius: ${sManager.getValue("customThemes", ["customTheme1", "Global border radius"])}px;
                    
                    --window-titleBar-bg: rgba(0, 0, 0, 64%);
                    --window-titleBar-title: rgba(255, 255, 255, 255);
                    --window-content-bg: rgba(0, 0, 0, 255);
                    --window-content-title: rgba(255, 255, 255, 255);
                    
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
                    
                    --top-content-light-fontColor: ${sManager.getValue("customThemes", ["customTheme1", "Top content font colour"])};
                    --top-items-BG: ${sManager.getValue("customThemes", ["customTheme1", "Highlight top content items bg"])};
                    --top-content-weather-PopUp-BG: ${sManager.getValue("customThemes", ["customTheme1", "Weather popUp Bg colour"])};
                    --top-content-invert: ${sManager.getValue("appearance", ["invert_top_items_colour", "value"])};

                    --inputs-colour_border_colour: ${sManager.getValue("customThemes", ["customTheme1", "Input type color border colour"])};
                    --input-bgColour: rgba(45, 45, 45, 255);
                            
                    --main-content-font: ${sManager.getValue("customThemes", ["customTheme1", "Main content font colour"])};
                    --main-content-light-bg: ${sManager.getValue("customThemes", ["customTheme1", "Main content Bg colour"])};
                    --main-content-light-searchBox: ${sManager.getValue("customThemes", ["customTheme1", "Main content Search box Bg colour"])};
                    --main-content-light-searchBtn: ${sManager.getValue("customThemes", ["customTheme1", "Main content Search btn Bg colour"])};
                    --main-content-light-icon-bg: ${sManager.getValue("customThemes", ["customTheme1", "Shortcuts Bg colour"])};
                    --light-button-theme: ${sManager.getValue("customThemes", ["customTheme1", "Buttons Bg colour"])}; 
                    --light-button-border: ${sManager.getValue("customThemes", ["customTheme1", "Buttons border colour"])};
                    --light-button-fontColor: ${sManager.getValue("customThemes", ["customTheme1", "Buttons font colour"])}; 
                    --light-button-hover: ${sManager.getValue("customThemes", ["customTheme1", "Buttons hover colour"])};
                    --light-button-active: ${sManager.getValue("customThemes", ["customTheme1", "Buttons active Bg colour"])};
            
                    --alert-top-Bg-colour: ${sManager.getValue("customThemes", ["customTheme1", "Alerts top content Bg"])};
                    --alert-buttonsContainer-Bg-colour: ${sManager.getValue("customThemes", ["customTheme1", "Alerts actions container Bg"])};
                    
                    --context-menu-open-btn-invert: 100%;
                    --context-menu-light: ${sManager.getValue("customThemes", ["customTheme1", "Context menu Bg colour"])};
                    --context-menu-light-li: ${sManager.getValue("customThemes", ["customTheme1", "Context menu items Bg colour"])};
                    --context-menu-light-li-hover: ${sManager.getValue("customThemes", ["customTheme1", "Context menu items hover colour"])};
                    
                    --shortcut-form-bg: ${sManager.getValue("customThemes", ["customTheme1", "Shortcuts form Bg colour"])};
                    --shortcut-form-inputtext-bg: ${sManager.getValue("customThemes", ["customTheme1", "Shortcuts form inputs Bg colour"])};
                    --shortcut-form-inputText-border: ${sManager.getValue("customThemes", ["customTheme1", "Shortcuts form inputs border colour"])};
                    --shortcut-form-btn-bg: ${sManager.getValue("customThemes", ["customTheme1", "Shortcuts form buttons bg"])};
                    --shortcut-form-btn-hover: ${sManager.getValue("customThemes", ["customTheme1", "Shortcuts form button hover bg"])};
                    --shortcut-form-btn-active: ${sManager.getValue("customThemes", ["customTheme1", "Shortcuts form button active bg"])};
            
                    --settings-menu-list-border: 1px solid rgba(255, 255, 255, 0.1);
                    --settings-menu_link: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu links colour"])};
                    --settings-menu-light-list: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu categories list Bg colour"])};
                    --settings-menu-light-list-items: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu categories items Bg"])};
                    --settings-menu-lignt-items-hoverBg: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu categories items hover Bg"])};
                    --settings-menu-light-content: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu main content Bg"])};
                    --settings-menu-light-options: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu options Bg colour"])};
                    --settings-menu-details: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu details Bg colour"])};
                    --settings-menu-light-selects: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu selects Bg colour"])};
                    --settings-menu-active-toggle: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu active toggle Bg"])};
                    --settings-menu-toggleBg: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu off toggle Bg"])};
                    --settings-menu-option-toggleCircle: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu toggle circle Bg colour"])};
                    --settings-menu-invert: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu invert icons colour intensity"])};
                    --settings-menu_code: ${sManager.getValue("customThemes", ["customTheme1", "Settings menu code Bg colour"])};
                    --settings-menu-indicator: #3e3e3e;
            } `,
            "customTheme2": `
                :root {
                    --body-backgroundBlur: ${sManager.getValue("appearance", ["backgroundBlur"])}px;
                    --body-gridValues: ${sManager.getValue("appearance", ["mainPageItems", "contentRatio", "topPercentaje"])}dvh ${100 - parseInt(sManager.getValue("appearance", ["mainPageItems", "contentRatio", "topPercentaje"]))}dvh;
                    --blur-strenght: ${sManager.getValue("customThemes", ["customTheme2", "Blur strenght"])}px;
                    --global-border-radius: ${sManager.getValue("customThemes", ["customTheme2", "Global border radius"])}px;
                    --important-text-colour: ${sManager.getValue("customThemes", ["customTheme2", "Important text colour"])};                    
                    
                    --window-titleBar-bg: rgba(0, 0, 0, 64%);
                    --window-titleBar-title: rgba(255, 255, 255, 255);
                    --window-content-bg: rgba(0, 0, 0, 255);
                    --window-content-title: rgba(255, 255, 255, 255);
                    
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
                    
                    --top-content-light-fontColor: ${sManager.getValue("customThemes", ["customTheme2", "Top content font colour"])};
                    --top-items-BG: ${sManager.getValue("customThemes", ["customTheme2", "Highlight top content items bg"])};
                    --top-content-weather-PopUp-BG: ${sManager.getValue("customThemes", ["customTheme2", "Weather popUp Bg colour"])};
                    --top-content-invert: ${sManager.getValue("appearance", ["invert_top_items_colour", "value"])};

                    --inputs-colour_border_colour: ${sManager.getValue("customThemes", ["customTheme2", "Input type color border colour"])};
                    --input-bgColour: rgba(45, 45, 45, 255);
                            
                    --main-content-font: ${sManager.getValue("customThemes", ["customTheme2", "Main content font colour"])};
                    --main-content-light-bg: ${sManager.getValue("customThemes", ["customTheme2", "Main content Bg colour"])};
                    --main-content-light-searchBox: ${sManager.getValue("customThemes", ["customTheme2", "Main content Search box Bg colour"])};
                    --main-content-light-searchBtn: ${sManager.getValue("customThemes", ["customTheme2", "Main content Search btn Bg colour"])};
                    --main-content-light-icon-bg: ${sManager.getValue("customThemes", ["customTheme2", "Shortcuts Bg colour"])};
                    --light-button-theme: ${sManager.getValue("customThemes", ["customTheme2", "Buttons Bg colour"])}; 
                    --light-button-border: ${sManager.getValue("customThemes", ["customTheme2", "Buttons border colour"])};
                    --light-button-fontColor: ${sManager.getValue("customThemes", ["customTheme2", "Buttons font colour"])}; 
                    --light-button-hover: ${sManager.getValue("customThemes", ["customTheme2", "Buttons hover colour"])};
                    --light-button-active: ${sManager.getValue("customThemes", ["customTheme2", "Buttons active Bg colour"])};
            
                    --alert-top-Bg-colour: ${sManager.getValue("customThemes", ["customTheme2", "Alerts top content Bg"])};
                    --alert-buttonsContainer-Bg-colour: ${sManager.getValue("customThemes", ["customTheme2", "Alerts actions container Bg"])};
                    
                    --context-menu-open-btn-invert: 100%;
                    --context-menu-light: ${sManager.getValue("customThemes", ["customTheme2", "Context menu Bg colour"])};
                    --context-menu-light-li: ${sManager.getValue("customThemes", ["customTheme2", "Context menu items Bg colour"])};
                    --context-menu-light-li-hover: ${sManager.getValue("customThemes", ["customTheme2", "Context menu items hover colour"])};
                    
                    --shortcut-form-bg: ${sManager.getValue("customThemes", ["customTheme2", "Shortcuts form Bg colour"])};
                    --shortcut-form-inputtext-bg: ${sManager.getValue("customThemes", ["customTheme2", "Shortcuts form inputs Bg colour"])};
                    --shortcut-form-inputText-border: ${sManager.getValue("customThemes", ["customTheme2", "Shortcuts form inputs border colour"])};
                    --shortcut-form-btn-bg: ${sManager.getValue("customThemes", ["customTheme2", "Shortcuts form buttons bg"])};
                    --shortcut-form-btn-hover: ${sManager.getValue("customThemes", ["customTheme2", "Shortcuts form button hover bg"])};
                    --shortcut-form-btn-active: ${sManager.getValue("customThemes", ["customTheme2", "Shortcuts form button active bg"])};
            
                    --settings-menu-list-border: 1px solid rgba(255, 255, 255, 0.1);
                    --settings-menu_link: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu links colour"])};
                    --settings-menu-light-list: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu categories list Bg colour"])};
                    --settings-menu-light-list-items: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu categories items Bg"])};
                    --settings-menu-lignt-items-hoverBg: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu categories items hover Bg"])};
                    --settings-menu-light-content: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu main content Bg"])};
                    --settings-menu-light-options: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu options Bg colour"])};
                    --settings-menu-details: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu details Bg colour"])};
                    --settings-menu-light-selects: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu selects Bg colour"])};
                    --settings-menu-active-toggle: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu active toggle Bg"])};
                    --settings-menu-toggleBg: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu off toggle Bg"])};
                    --settings-menu-option-toggleCircle: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu toggle circle Bg colour"])};
                    --settings-menu-invert: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu invert icons colour intensity"])};
                    --settings-menu_code: ${sManager.getValue("customThemes", ["customTheme2", "Settings menu code Bg colour"])};
                    --settings-menu-indicator: #3e3e3e;
            } `
        }
        this.aplyTheme();
    }
}
export let themeManager = new THEME_MANAGER()
