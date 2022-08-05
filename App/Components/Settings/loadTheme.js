import { config } from "../loadSettings.js";

export function loadTheme() {
    let theme = config.appereance.theme;

    const cssStyle = document.getElementById("css-variables");

    const cssVariables = {
        light: `
        :root{
            --blur-strenght: ${config.appereance.blur}px;

            --light-button-theme: rgb(255, 255, 255); 
            --light-button-border: rgba(0, 0, 0, 0.15);
            --light-button-fontColor: rgba(0, 0, 0, .75);
            --light-button-hover: rgb(243, 243, 243);
            --light-button-active: rgb(235, 235, 235);
            
            --top-content-light-fontColor: #000;
            --main-content-font: #000;
            --main-content-light-bg: rgba(255, 255, 255, .60);
            
            --main-content-light-searchBox: #ffffffd6; 
            --main-content-light-searchBtn: #FFFFFF;
            --main-content-light-icon-bg: rgba(255, 255, 255, 0.50);
            
            --light-button-theme: rgb(255, 255, 255); 
            --light-button-border: rgba(0, 0, 0, 0.15);
            --light-button-fontColor: rgba(0, 0, 0, .75); 
            --light-button-hover: rgb(243, 243, 243);
            --light-button-active: rgb(235, 235, 235);


            --context-menu-open-btn-invert: 0%;
            --context-menu-light: rgb(255, 255, 255); 
            --context-menu-light-li: rgb(255, 255, 255);
            --context-menu-light-li-hover: rgba(0, 0, 0, 0.10);

            --shortcut-form-bg: rgba(255, 255, 255, .90);
            --shortcut-form-inputtext-bg: rgba(255, 255, 255, 0.87);
            --shortcut-form-inputText-border: rgba(212, 212, 212, 0.8);
            --shortcut-form-btn-bg: rgb(255, 255, 255);
            --shortcut-form-btn-hover: rgb(243, 243, 243);
            --shortcut-form-btn-active: rgb(235, 235, 235);

            --settings-menu-light-list: #EEE;
            --settings-menu-light-list-items: #fff;
            --settings-menu-light-content: #fff;
            --settings-menu-light-options:#EEE;
            --settings-menu-light-selects:#D9D9D9;
            --settings-menu-light-option-toggleBg:#D9D9D9;
            --settings-menu-light-option-toggleCircle:#fff;
            --settings-menu-invert: 0%;
        }
        `,
        dark: `
        :root {
            --blur-strenght: ${config.appereance.blur}px;

            --top-content-light-fontColor: #fff;
            --main-content-font: #fff;
            --main-content-light-bg: rgba(0, 0, 0, 0.65); 
            --main-content-light-searchBox: rgba(21, 21, 21, 0.8);
            --main-content-light-searchBtn: rgb(0, 0, 0);
            --main-content-light-icon-bg: rgba(0, 0, 0, 0.6);

            --light-button-theme: rgba(39, 39, 39, 1); 
            --light-button-border: rgba(0, 0, 0, 0.15);
            --light-button-fontColor: #fff; 
            --light-button-hover: #373737;
            --light-button-active: rgb(28, 28, 28);
            
            --context-menu-open-btn-invert: 100%;
            --context-menu-light: #101010;
            --context-menu-light-li: #222222;
            --context-menu-light-li-hover: #1d1d1d;

            --shortcut-form-bg: rgba(17, 17, 17, 0.9);
            --shortcut-form-inputtext-bg: rgba(34, 34, 34, 0.87);
            --shortcut-form-inputText-border: #2f2f2f;
            --shortcut-form-btn-bg: rgba(34, 34, 34, 0.87);
            --shortcut-form-btn-hover: rgb(38, 38, 38);
            --shortcut-form-btn-active: rgb(28, 28, 28);
            
            --settings-menu-light-list: #070707;
            --settings-menu-light-list-items: #0e0e0e;
            --settings-menu-light-items: #0E0E0E; 
            --settings-menu-light-content: #000;
            --settings-menu-light-options: #0E0E0E;
            --settings-menu-light-selects: rgba(39, 39, 39, 1); 
            --settings-menu-light-toggleBg: rgba(39, 39, 39, 1);
            --settings-menu-invert: 100%;
        }
        `
    };
    
    document.querySelector("body").style.backgroundImage = `url(${config.appereance.background})`

    if(theme === "light") {
        cssStyle.innerHTML = cssVariables.light
    }  else {
        cssStyle.innerHTML = cssVariables.dark
    };
}