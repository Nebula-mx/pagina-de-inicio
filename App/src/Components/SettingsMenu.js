import { sManager } from "../../settingsManager.js";
import { refreshModules } from "./App.js";
import { showAlert } from "../Helpers/showAlert.js";
import { showNotification } from "../Helpers/showNotification.js";
import { showPromt } from "../Helpers/showPrompt.js";
import { getWeather } from "./Weather.js";
import { colourPicker } from "../Helpers/colourPicker.js";
const lang = sManager.getValue("general", "lang");
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
        this.menuContent = {
            style: `
                a {
                    color: var(--settings-menu_link);
                }
                .settings-menu {
                    display: flex;
                    justify-content: center;
                    position: absolute;
                    place-self: center;
                    width: 80%;
                    height: 400px;
                    z-index: 500;
                    filter: drop-shadow(6px 6px 5px rgba(0, 0, 0, 0.2));
                    color: var(--main-content-font);
                    z-index: 11;
                }
                .settings-menu .settings-menu_list {
                    background-color: var(--settings-menu-light-list);
                    padding: clamp(min(10px), 3vw, max(26px));
                    border: var(--settings-menu-list-border);
                    border-radius: 10px 0 0 10px;
                    width: clamp(min(42px), 30%, max(258px));
                    height: 100%;
                }
                .settings-menu .settings-menu_list #closeSettingsBtn {
                    display: flex;
                    position: absolute;
                    place-self: baseline;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                    filter: invert(var(--settings-menu-invert));
                }
                .settings-menu .settings-menu_list h4{
                    font-size: 1.5rem;
                    margin: 0;
                    text-align: center;
                }
                .settings-menu .settings-menu_list ul {
                    padding: 0;
                }
                .settings-menu .settings-menu_list ul > li {
                    background-color: var(--settings-menu-light-list-items);
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    padding: 5px 10px;
                    border-radius: var(--global-border-radius);
                    box-shadow: 2px 2px 7px #00000026;
                    list-style: none;
                    cursor: pointer;
                }
                .settings-menu .settings-menu_list ul > li svg {
                    width: 18px;
                    height: 18px;
                    margin-right: 5px;
                    filter: invert(var(--settings-menu-invert));
                }
                .settings-menu .settings-menu_list ul li:hover {
                    background-color: var(--settings-menu-lignt-items-hoverBg);
                    box-shadow: 2px 2px 7px #00000045;
                }
                .settings-menu .settings-menu_content {
                    display: flex;
                    flex-flow: column;
                    background-color: var(--settings-menu-light-content);
                    width: clamp(min(196px), 100vw, max(720px));
                    padding: clamp(min(10px), 3vw, max(26px));
                    border-radius: 0 10px 10px 0;
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hiden;
                }
                .settings-menu .settings-menu_content .settings-menu_content-top h5{
                    text-align: center;
                    font-size: clamp(min(.3rem), 4vw, max(1.6rem));
                    margin: 0;
                }
                .settings-menu .settings-menu_content .settings-menu_content-top hr{
                    opacity: 20%;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content p,
                .settings-menu .settings-menu_content .settings-menu_category-content legend {
                    font-size: clamp(.5rem, 3vw, 1.2rem);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content ol {
                    margin: 0;
                    padding-left: clamp(0.2rem, 3vw, 1.4rem);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content ol>li::marker {
                    font-size: clamp(.5rem, 3vw, 1.2rem);
                }
                .settings-menu .settings-menu_content img {
                    width: clamp(10px, 80%, 500px);
                    border-radius: var(--global-border-radius);
                    margin: 10px 10%;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option {
                    background-color: var(--settings-menu-light-options);
                    position: relative;
                    display: grid;
                    grid-template-rows: repeat(4, auto);
                    grid-template-columns: 75% 25%;
                    padding: .6em;
                    margin: 1rem 0;
                    border-radius: var(--global-border-radius);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option-select {
                    grid-row: 1/3;
                    grid-column: 2/3;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option legend{
                    grid-row: 1/2;
                    grid-column: 1/2;
                    font-size: clamp(min(.5rem), 4vw, max(1.3rem));
                    font-weight: 500;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option p{
                    grid-row: 2/3;
                    grid-column: 1/2;
                    margin: 0 0 0 2px;
                    opacity: 60%;
                    font-size: clamp(min(4px), 3vw, max(15px));
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .full-space {
                    font-size: clamp(min(.5em), 4vw, max(1.1em));
                    grid-column: 1/3;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option button {
                    grid-row: 1/3;
                    grid-column: 2/3;
                    place-self: end;
                    align-self: center;
                    cursor: pointer;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-buttons {
                    display: flex;
                    grid-row: 3/4;
                    grid-column: 1/3;
                    justify-content: end;
                    margin-top: 5px;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .keys-container {
                    grid-row:3/4;
                    grid-column: 1/3;
                    place-self: flex-end;
                    margin-top: var(--global-border-radius);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .keys-container .key {
                    background-color: var(--context-menu-light-li-hover);
                    width: fit-content;
                    padding: .2em .4em;
                    border-radius: var(--global-border-radius);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option code {
                    background-color: var(--settings-menu_code);
                    padding: 1em;
                    border-radius: var(--global-border-radius);
                    overflow: auto;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-toggle {
                    display: flex;
                    grid-column: 2/3;
                    grid-row: 1/3;
                    place-self: end;
                    align-self: center;
                    align-items: center;
                    width: 42px;
                    height: 17px;
                    padding: 4px;
                    background-color: var(--settings-menu-toggleBg);
                    border-radius: 20px;
                    cursor: pointer;
                    transition: ease-in-out 0.5s;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-toggle[data-active="true"]{
                    background-color: var(--settings-menu-active-toggle);
                    justify-content: end;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .colourPicker-clickableSwatches {
                    grid-row: 1/3;
                    grid-column: 2/3;
                }
                .toggle-active {
                    justify-content: end;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-toggle .option-toggle_circle{
                    width: 17px;
                    height: 17px;
                    background-color: var(--settings-menu-option-toggleCircle);
                    border-radius: 50%;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-buttons > input[type="button"] {
                    margin: 0 0 0 5px;
                    cursor: pointer;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option button:hover {
                    background-color: var(--light-button-hover);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option button:active {
                    background-color: var(--light-button-active);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option input[type="range"]{
                    grid-column: 2/3;
                    grid-row: 1/3;
                    place-self: center;
                    width: 80%;
                }
                .settings-menu .settings-menu_content .settings-menu_content-top #submenus-backButon {
                    position: relative;
                    width: clamp(11px, 4vw, 20px);
                    height: clamp(12px, 4vw, 21px);
                    cursor: pointer;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option #user-currentBG {
                    grid-column: 1/3;
                    grid-row: 2/3;
                    width: 40%;
                    margin: 12px;
                    height: fit-content;
                    place-self: center;
                    align-self: center;
                    border-radius: var(--global-border-radius);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option #backgroundsSummary {
                    grid-column: 1/3;
                    grid-row: 3/4;
                    margin-bottom: 12px;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .backgrounds-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 10px 0;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option #setCustomBGurl {
                    grid-column: 1/2;
                    grid-row: 4/5;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .backgrounds-container .settings_background-img{
                    border-radius: var(--global-border-radius);
                    width: 45%;
                    margin: 5px;
                    cursor: pointer;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .subtitle {
                    font-size: clamp(min(.8rem), 3vw, max(1.2rem));
                    font-weight: 600;
                    margin: 1em 0;
                    text-align: center;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content hr {
                    opacity: 30%;
                    width: 80%;
                }

                .settings-menu .settings-menu_content .settings-menu_category-content #theme-editor_selectedTheme * {
                    margin-right: 10px;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .theme-editor_actions {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .theme-editor_actions  #theme-editor_selectedTheme {
                    display: flex;
                    align-items: center;
                    color: var(--main-content-font);
                }
            `,
            main: `
            <div class="settings-menu">
                <div class="settings-menu_list">
                    <img data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" id="closeSettingsBtn" src="App/Assets/Images/Close btn.svg" data-mode="close-menu" alt="close menu" title="Close menu" width="25px" height="25px">
                    <h4>${language.settings.title}</h4>
                    <ul id="settings-list" >
                        <li data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" data-mode="change-menu" data-category="general" id="settings_general"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13" cy="13" r="7.5" stroke="#2F2F2F" stroke-width="5"/>
                            <path d="M10.5234 0.510996C10.5674 0.217284 10.8197 0 11.1167 0H14.8833C15.1803 0 15.4326 0.217284 15.4766 0.510996L15.8966 3.311C15.9511 3.67376 15.6701 4 15.3033 4H10.6967C10.3299 4 10.0489 3.67376 10.1034 3.311L10.5234 0.510996Z" fill="#2F2F2F"/>
                            <path d="M15.4766 25.489C15.4326 25.7827 15.1803 26 14.8833 26L11.1167 26C10.8197 26 10.5674 25.7827 10.5234 25.489L10.1034 22.689C10.0489 22.3262 10.3299 22 10.6967 22L15.3033 22C15.6701 22 15.9511 22.3262 15.8966 22.689L15.4766 25.489Z" fill="#2F2F2F"/>
                            <path d="M22.5774 4.61065C22.8538 4.50195 23.1682 4.61181 23.3167 4.86902L25.1999 8.13097C25.3484 8.38818 25.2864 8.71532 25.0541 8.90033L22.8392 10.6641C22.5523 10.8926 22.1293 10.8124 21.9458 10.4947L19.6426 6.50529C19.4591 6.18761 19.6012 5.78118 19.9426 5.64692L22.5774 4.61065Z" fill="#2F2F2F"/>
                            <path d="M3.42256 21.3894C3.14617 21.4981 2.83184 21.3882 2.68334 21.131L0.800056 17.869C0.651557 17.6118 0.713577 17.2847 0.94591 17.0997L3.16078 15.3359C3.44774 15.1074 3.87075 15.1876 4.05416 15.5053L6.35744 19.4947C6.54086 19.8124 6.3988 20.2188 6.05743 20.3531L3.42256 21.3894Z" fill="#2F2F2F"/>
                            <path d="M25.0541 17.0996C25.2864 17.2846 25.3484 17.6118 25.1999 17.869L23.3167 21.1309C23.1682 21.3881 22.8538 21.498 22.5774 21.3893L19.9426 20.353C19.6012 20.2188 19.4591 19.8123 19.6426 19.4947L21.9458 15.5053C22.1293 15.1876 22.5523 15.1074 22.8392 15.3359L25.0541 17.0996Z" fill="#2F2F2F"/>
                            <path d="M0.94591 8.90038C0.713576 8.71537 0.651557 8.38822 0.800056 8.13101L2.68334 4.86906C2.83184 4.61186 3.14617 4.50199 3.42256 4.61069L6.05743 5.64696C6.3988 5.78122 6.54086 6.18766 6.35745 6.50533L4.05416 10.4947C3.87075 10.8124 3.44774 10.8926 3.16078 10.6641L0.94591 8.90038Z" fill="#2F2F2F"/>
                        </svg><legend class="settings-menu_list-legend">${language.settings.general.title}</legend></li>
                        <li data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" data-mode="change-menu" data-category="appearance" id="settings_appearance"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.1924 3.80761C20.9852 2.60045 19.5521 1.64288 17.9749 0.989565C16.3976 0.336254 14.7072 -2.8491e-07 13 0C11.2928 2.84911e-07 9.60235 0.336256 8.02511 0.989567C6.44788 1.64288 5.01477 2.60045 3.80761 3.80761C2.60045 5.01478 1.64288 6.44788 0.989565 8.02512C0.336254 9.60235 -3.59534e-07 11.2928 0 13C3.59534e-07 14.7072 0.336256 16.3977 0.989567 17.9749C1.64288 19.5521 2.60045 20.9852 3.80761 22.1924L13 13L22.1924 3.80761Z" fill="#2F2F2F"/>
                            <mask id="path-2-inside-1_415_44" fill="white">
                                <path d="M3.80761 22.1924C5.01478 23.3995 6.44788 24.3571 8.02512 25.0104C9.60235 25.6637 11.2928 26 13 26C14.7072 26 16.3977 25.6637 17.9749 25.0104C19.5521 24.3571 20.9852 23.3995 22.1924 22.1924C23.3996 20.9852 24.3571 19.5521 25.0104 17.9749C25.6637 16.3976 26 14.7072 26 13C26 11.2928 25.6637 9.60235 25.0104 8.02511C24.3571 6.44788 23.3995 5.01477 22.1924 3.80761L13 13L3.80761 22.1924Z"/>
                            </mask>
                            <path d="M3.80761 22.1924C5.01478 23.3995 6.44788 24.3571 8.02512 25.0104C9.60235 25.6637 11.2928 26 13 26C14.7072 26 16.3977 25.6637 17.9749 25.0104C19.5521 24.3571 20.9852 23.3995 22.1924 22.1924C23.3996 20.9852 24.3571 19.5521 25.0104 17.9749C25.6637 16.3976 26 14.7072 26 13C26 11.2928 25.6637 9.60235 25.0104 8.02511C24.3571 6.44788 23.3995 5.01477 22.1924 3.80761L13 13L3.80761 22.1924Z" fill="white" stroke="#2F2F2F" stroke-width="0.2" mask="url(#path-2-inside-1_415_44)"/>
                        </svg><legend class="settings-menu_list-legend">${language.settings.appearance.title}</legend></li>
                        <li style="display: none;" data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" style="display: innerit;" data-mode="change-menu" data-category="keybinds" id="settings_keybinds"><svg width="37" height="22" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="35" height="20" rx="1" stroke="#2F2F2F" stroke-width="2" stroke-linejoin="round"/>
                            <rect x="8" y="14" width="21" height="4" rx="1" fill="#222222"/>
                            <rect x="30" y="14" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="27" y="9" width="7" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="27" y="4" width="7" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="3" y="14" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="9" y="4" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="15" y="4" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="21" y="4" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="22" y="9" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="17" y="9" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="11" y="9" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="3" y="9" width="6" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="3" y="4" width="4" height="4" rx="1" fill="#2F2F2F"/>
                        </svg><legend class="settings-menu_list-legend">Keybinds</legend></li>
                        <li data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" data-mode="change-menu" data-category="about" id="settings_about"><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="12" y="6" width="3" height="11" rx="1.5" fill="#222222"/>
                            <circle cx="13.5" cy="19.5" r="1.5" fill="#222222"/>
                            <circle cx="13.5" cy="13.5" r="12.25" stroke="#2F2F2F" stroke-width="2.5"/>
                        </svg><legend class="settings-menu_list-legend">${language.settings.about.title}</legend></li>
                    </ul>
                </div>
                    <div class="settings-menu_content">
            </div>
            `,
            general: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">${language.settings.general.categories.general}</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                    <div class="option">
                        <legend>${language.settings.general.shortcutsLimit.legend}</legend>
                        <p>${language.settings.general.shortcutsLimit.p}</p>
                        <select class="option-select" name="shortcuts" id="">
                            <option>--</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="8">${language.commonWords.default} (8)</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="6">6</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="3">3</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="0">${language.commonWords.clean} (0)</option>
                        </select>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.searchEngine.legend}</legend>
                        <p>${language.settings.general.searchEngine.p}</p>
                        <select class="option-select" name="search-engine" id="">
                            <option>--</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://www.google.com/search?q=">${language.commonWords.default} (Google)</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://www.bing.com/search?q=">Bing</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://duckduckgo.com/?q=">Duck Duck Go</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://you.com/search?q=">You search engine</option>
                        </select>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.searchInNewTab.legend}</legend>
                        <p>${language.settings.general.searchInNewTab.p}</p>
                        <div class="option-toggle" data-mode="toggle" data-active="${sManager.getValue("general", "open_search_in_newTab")}" data-category="general" data-preference="open_search_in_newTab" data-activevalue="true" data-offValue="false">
                            <div class="option-toggle_circle" data-mode="toggle"></div>
                        </div>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.weatherCity.legend}</legend>
                        <p class="full-space">${language.settings.general.weatherCity.p}</p>
                        <div class="option-buttons">
                            <input type="button" data-mode="set" data-promt="true" data-promtTitle="${language.prompts.weather.title}" data-promtDesc="${language.prompts.weather.desc}" data-category="general" data-preference="weather_city" value="${language.settings.general.weatherCity.manualSetButton}">
                            <input type="button" data-mode="set" data-category="general" data-preference="autoSet-weather_city" value="${language.settings.general.weatherCity.autoSetButton}">
                        </div>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.appLanguage.legend}</legend>
                        <p>${language.settings.general.appLanguage.p}</p>
                        <select class="option-select" name="app-lang" id="">
                            <option>--</option>
                            <option data-category="general" data-mode="set" data-preference="lang" data-value="en">${language.commonWords.default} (English)</option>
                            <option data-category="general" data-mode="set" data-preference="lang" data-value="es">Spanish (Español)</option>
                        </select>
                    </div>
                    <legend class="subtitle">${language.settings.general.categories.extra}</legend>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.exportSettings.legend}</legend>
                        <p>${language.settings.general.exportSettings.p}</p>
                        <button id="importExportConfig" data-mode="exportSettings" data-obj="settings">${language.settings.general.exportSettings.button}</button>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.exportShortcuts.legend}</legend>
                        <p>${language.settings.general.exportShortcuts.p}</p>
                        <button id="importExportConfig" data-mode="exportSettings" data-obj="shortcuts">${language.settings.general.exportShortcuts.button}</button>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.importSettings.legend}</legend>
                        <p>${language.settings.general.importSettings.p}</p>
                        <button id="importExportConfig" data-mode="importSettings" data-promtTitle="${language.prompts.importSettings.title}" data-promtDesc="${language.prompts.importSettings.desc}" data-obj="settings" data-placeholder="Ex: {General: {}, Appearance: {}}">${language.settings.general.importSettings.button}</button>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.importShortcuts.legend}</legend>
                        <p>${language.settings.general.importShortcuts.p}</p>
                        <button id="importExportConfig" data-mode="importSettings" data-promtTitle="${language.prompts.importShortcuts.title}" data-promtDesc="${language.prompts.importShortcuts.desc}" data-placeholder="Ex: [{id: 1}, {id: 2}...]" data-obj="shortcuts">${language.settings.general.importShortcuts.button}</button>
                    </div>
                    <legend class="subtitle">${language.settings.general.categories.resetAppValues}</legend>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.resetSettings.legend}</legend>
                        <button data-mode="reset" data-obj="settings">${language.settings.general.resetSettings.button}</button>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.deleteShortcuts.legend}</legend>
                        <button data-mode="reset" data-obj="shortcuts" >${language.settings.general.deleteShortcuts.button}</button>
                    </div>
                </div>
            </div>
            `,
            appearance: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">${language.settings.appearance.categories.appearance}</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                    <div class="option">
                        <legend>${language.settings.appearance.theme.legend}</legend>
                        <p>${language.settings.appearance.theme.p}</p>
                        <select class="option-select">
                            <option>--</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="light">${language.settings.appearance.theme.select.light}</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="dark">${language.settings.appearance.theme.select.dark}</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="customTheme1">${language.settings.appearance.theme.select.custom1}</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="customTheme2">${language.settings.appearance.theme.select.custom2}</option>
                        </select>
                    </div>
                    <div class="option">
                        <legend>${language.settings.appearance.backgrounds.legend}</legend>
                        <img id="user-currentBG" src="${sManager.getValue("appearance", "background")}">
                        <details id="backgroundsSummary">
                            <summary>${language.settings.appearance.backgrounds.summary}</summary>
                            <div class="backgrounds-container">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/1.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/1.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/2.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/2.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/3.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/3.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/4.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/4.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/5.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/5.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/6.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/6.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/7.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/7.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/8.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/8.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/9.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/9.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/10.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/10.webp">
                            </div>
                        </details>
                        <input id="setCustomBGurl" data-mode="set" data-promt="true" data-promtTitle="${language.prompts.background.title}" data-promtDesc="${language.prompts.background.desc}" data-category="appearance" data-preference="background" type="button" value="${language.settings.appearance.backgrounds.button}">
                    </div>
                    <div class="option">
                        <legend>${language.settings.appearance.blurStrenght.legend}</legend>
                        <p>${language.settings.appearance.blurStrenght.p}</p>
                        <input data-mode="set" data-category="appearance" data-preference="blur" id="blur-range" type="range" min="0" max="32" value="${sManager.getValue("appearance", "blur")}">
                    </div>
                    <details>
                        <summary>${language.settings.appearance.relatedOptions.summary}</summary>
                        <div class="option">
                            <legend>${language.settings.appearance.relatedOptions.content.contextMenu.legend}</legend>
                            <p>${language.settings.appearance.relatedOptions.content.contextMenu.p}</p>
                            <input data-mode="set" data-category="appearance" data-preference="shortcutsPopUpOpacity" id="blur-range" type="range" min="0" max="100" value="${sManager.getValue("appearance", "shortcutsPopUpOpacity")}">
                        </div>
                        <div class="option">
                            <legend>${language.settings.appearance.relatedOptions.content.favouritesContent.legend}</legend>
                            <p>${language.settings.appearance.relatedOptions.content.favouritesContent.p}</p>
                            <input data-mode="set" data-category="appearance" data-preference="mainContentBgOpacity" id="blur-range" type="range" min="0" max="100" value="${sManager.getValue("appearance", "mainContentBgOpacity")}">
                        </div><div class="option">
                            <legend>${language.settings.appearance.relatedOptions.content.weatherPopUp.legend}</legend>
                            <p>${language.settings.appearance.relatedOptions.content.weatherPopUp.p}</p>
                            <input data-mode="set" data-category="appearance" data-preference="weatherPopUpOpacity" id="blur-range" type="range" min="0" max="100" value="${sManager.getValue("appearance", "weatherPopUpOpacity")}">
                        </div>
                    </details>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.appearance.dateFormat.legend}</legend>
                        <p>${language.settings.appearance.dateFormat.p}</p>
                        <select class="option-select" name="date-format" id="">
                            <option>--</option>
                            <option data-mode="set" data-category="appearance" data-preference="dateFormat" data-value="normalDate">${language.settings.appearance.dateFormat.select.dmy}</option>
                            <option data-mode="set" data-category="appearance" data-preference="dateFormat" data-value="fullDate">${language.settings.appearance.dateFormat.select.fulldate}</option>
                        </select>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.appearance.highlightTopContentItems.legend}</legend>
                        <p>${language.settings.appearance.highlightTopContentItems.p}</p>
                        <div class="option-toggle" data-mode="toggle" data-active="${sManager.getValue("appearance", "top_itemsBg")}" data-category="appearance" data-preference="top_itemsBg" data-activevalue="true" data-offValue="false">
                            <div class="option-toggle_circle" data-mode="toggle"></div>
                        </div>
                    </div>
                    <div class="option">
                        <legend>${language.settings.appearance.invertFontColour.legend}</legend>
                        <p>${language.settings.appearance.invertFontColour.p}</p>
                        <div class="option-toggle" data-mode="toggle" data-active="${sManager.getValue("appearance", "invert_top_items_colour")}" data-category="appearance" data-preference="invert_top_items_colour" data-activevalue="true" data-offValue="false">
                            <div class="option-toggle_circle" data-mode="toggle"></div>
                        </div>
                    </div>
                    <legend class="subtitle">${language.settings.appearance.categories.advancedOptions}</legend>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.appearance.customTheme.legend}</legend>
                        <p>${language.settings.appearance.customTheme.p}</p>
                        <button data-mode="createSubMenu" data-typeOfMenu="customizeTheme" data-parentMenu="appearance">${language.settings.appearance.customTheme.button}</button>
                    </div>
                </div>
            </div>
            `,
            keybinds: `
                <div>
                    <div class="settings-menu_content-top">
                        <h5 id="category-name">Keybinds</h5>
                        <hr>
                    </div>
                    <div class="settings-menu_category-content">
                        <div class="option">
                            <legend>Create shortcut</legend>
                            <p class="full-space">Create a new shortcut</p>
                            <div class="keys-container"><span class="key">Shift</span> + <span class="key">n</span></div>
                        </div>
                        <div class="option">
                            <legend>Change app theme</legend>
                            <p class="full-space">Toggle between light and dark themes</p>
                            <div class="keys-container"><span class="key">Ctrl</span> + <span class="key">c</span> + <span class="key">t</span></div>
                        </div>
                        <div class="option">
                            <legend>Open shortcut in current tab</legend>
                            <p class="full-space">Open a shortcut using the current tab</p>
                            <div class="keys-container"><span class="key">Shift</span> + <span class="key">number</span></div>
                        </div>
                        <div class="option">
                            <legend>Open shortcut in a new tab</legend>
                            <p class="full-space">Open a shortcut using a new tab</p>
                            <div class="keys-container"><span class="key">Ctrl</span> + <span class="key">Shift</span> + <span class="key">number</span></div>
                        </div>
                    </div>
                </div>
            `,
            about: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">${language.settings.about.categories.about}</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                    <div class="option">
                        <legend>${language.settings.about.missingFeatures.legend}</legend>
                        <p class="full-space">${language.settings.about.missingFeatures.p}</u></b></p>
                    </div>
                    <div class="option">
                        <legend>${language.settings.about.whatsNew.legend}</legend>
                        <ul class="full-space">
                            ${language.settings.about.whatsNew.list}                           
                        </ul>
                    </div>
                    <div class="option">
                        <legend>${language.settings.about.currentSettings.legend}</legend>
                        <code class="full-space settingsMenu_code">${JSON.stringify(this.config.general)}\n${JSON.stringify(this.config.appearance)}</code>
                    </div>
                    <div class="option">
                        <legend>${language.settings.about.appInfo.legend}</legend>
                        <p>${language.settings.about.appInfo.version}</p>
                    </div>
                </div>
            </div>
            `
        }
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
                        inputRangeValues = { //if the input tyoe is range, there are their max values
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
                            $optionDesc.textContent = `Current value: ${sManager.getSubObjectValue("customThemes", theme, key)}`
                            $optionContainer.appendChild($optionTitle)
                            $optionContainer.appendChild($optionDesc)
                            
                            if(/(rgb(a?)|hsl(a?)|#)/.test(sManager.getSubObjectValue("customThemes", theme, key))) { //this if validates the data type to use certain input type
                                $input = `<div class="colourPicker-clickableSwatches" data-category="customThemes" data-subObj="${theme}" data-preference="${key}" value="${sManager.getSubObjectValue("customThemes", theme, key)}" style="background-color: ${sManager.getSubObjectValue('customThemes', theme, key)};" data-mode="subMenuInteraction" data-menu="customizeTheme" data-action="showColourPicker" data-value="${sManager.getSubObjectValue("customThemes", theme, key)}"></div>`
                            } else {$input = `<input type="range" data-subSetting="true" data-mode="set" data-category="customThemes" data-subObj="${theme}" data-preference="${key}" min="0" max="${inputRangeValues[key]}" value="${sManager.getSubObjectValue("customThemes", theme, key)}">`}
                            $optionContainer.insertAdjacentHTML("beforeend", $input)
                            $fragment.appendChild($optionContainer)
                    }
                    $contentContainer.appendChild($fragment)
                    $container.appendChild($contentContainer)
                    this.subMenus.customizeTheme.previousTheme = sManager.getValue("appearance", "theme")
                    if(this.subMenus.customizeTheme.previewEnabled === "true" || sManager.getValue("appearance", "theme").includes("customTheme")) {
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
                            
                            return sManager.saveSettings("appearance", "theme", this.subMenus.customizeTheme.editedTheme)                       
                        } else if(this.subMenus.customizeTheme.previewEnabled === "true"){
                            document.querySelectorAll("[data-alert]").forEach(node => node.setAttribute("data-alert", "false"))
                            this.subMenus.customizeTheme.previewEnabled = "false"
                            
                            document.getElementById("selectedStyleStatus").textContent = `${language.submenus.themeCreator.previewAdvisorDefault}`
                            document.getElementById("selectedStyleStatus").style.color = "var(--main-content-font)"
                            document.getElementById("themeEditorActions_preview").setAttribute("data-active", "false")
                            
                            sManager.saveSettings("appearance", "theme", this.subMenus.customizeTheme.previousTheme)
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
                                sManager.saveSettings("customThemes", "customTheme1", this.subMenus.customizeTheme.themeBackup)
                                sManager.saveSettings("appearance", "theme", this.subMenus.customizeTheme.previousTheme)                    
                            }) .catch((err) => {return})
                    },
                    "useColour": (obj)=> {
                        let target = obj[1]
                        target.style.backgroundColor = obj[0]
                        target.previousElementSibling.textContent = `Current value: ${obj[0]}`
                        target.dataset.value = obj[0]
                        sManager.saveSettings([target.dataset.category, target.dataset.subobj], target.dataset.preference, obj[0])
                    },
                    "showColourPicker": (target) => {
                        colourPicker.openMenu(target, this.subMenus.customizeTheme.submenuInteractions.useColour)
                    },
                    "openGuide": () => {
                        let $container = document.querySelector(".settings-menu_content"),
                            $content = `
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
                    let target = document.getElementById("closeSettingsBtn")
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
                let value; 
                if(target.dataset.subsetting === "true") return sManager.saveSettings([target.dataset.category, target.dataset.subobj], target.dataset.preference, target.value)
                if(target.dataset.preference === "autoSet-weather_city") return getWeather("auto")
                if(target.dataset.promt === "true") value = await showPromt({title: target.dataset.promttitle, desc:target.dataset.promtdesc, placeholder: sManager.getValue(target.dataset.category, target.dataset.preference) || target.dataset.placeholder})
                sManager.saveSettings(target.dataset.category, target.dataset.preference, parseInt(target.value) || value || target.dataset.value || target.value)
                refreshModules()
                this.updateMenusContent()
            },
            "toggle": (target) => {
                let toggleElement = target
                if(target.dataset.active === "false") {
                    if(target.classList.contains("option-toggle_circle")){
                        toggleElement = target.parentNode;
                    }
                    toggleElement.firstElementChild.dataset.active = "true";
                    toggleElement.dataset.active = "true";

                    sManager.saveSettings(toggleElement.dataset.category, toggleElement.dataset.preference, toggleElement.dataset.activevalue);
                    refreshModules()
                    this.updateMenusContent()                    
                    return;
                }
                if(target.dataset.active === "true") {
                    if(target.classList.contains("option-toggle_circle")){
                        toggleElement = target.parentNode;
                    }
                    toggleElement.firstElementChild.dataset.active = "false";
                    toggleElement.dataset.active = "false";

                    sManager.saveSettings(toggleElement.dataset.category, toggleElement.dataset.preference, toggleElement.dataset.offvalue);
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
            "exportSettings": (target) => {
                sManager.exportSettings(target.dataset.obj)
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
        this.menuContent = {
            style: `
                a {
                    color: var(--settings-menu_link);
                }
                .settings-menu {
                    display: flex;
                    justify-content: center;
                    position: absolute;
                    place-self: center;
                    width: 80%;
                    height: 400px;
                    z-index: 500;
                    filter: drop-shadow(6px 6px 5px rgba(0, 0, 0, 0.2));
                    color: var(--main-content-font);
                    z-index: 11;
                }
                .settings-menu .settings-menu_list {
                    background-color: var(--settings-menu-light-list);
                    padding: clamp(min(10px), 3vw, max(26px));
                    border: var(--settings-menu-list-border);
                    border-radius: 10px 0 0 10px;
                    width: clamp(min(42px), 30%, max(258px));
                    height: 100%;
                }
                .settings-menu .settings-menu_list #closeSettingsBtn {
                    display: flex;
                    position: absolute;
                    place-self: baseline;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                    filter: invert(var(--settings-menu-invert));
                }
                .settings-menu .settings-menu_list h4{
                    font-size: 1.5rem;
                    margin: 0;
                    text-align: center;
                }
                .settings-menu .settings-menu_list ul {
                    padding: 0;
                }
                .settings-menu .settings-menu_list ul > li {
                    background-color: var(--settings-menu-light-list-items);
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    padding: 5px 10px;
                    border-radius: var(--global-border-radius);
                    box-shadow: 2px 2px 7px #00000026;
                    list-style: none;
                    cursor: pointer;
                }
                .settings-menu .settings-menu_list ul > li svg {
                    width: 18px;
                    height: 18px;
                    margin-right: 5px;
                    filter: invert(var(--settings-menu-invert));
                }
                .settings-menu .settings-menu_list ul li:hover {
                    background-color: var(--settings-menu-lignt-items-hoverBg);
                    box-shadow: 2px 2px 7px #00000045;
                }
                .settings-menu .settings-menu_content {
                    display: flex;
                    flex-flow: column;
                    background-color: var(--settings-menu-light-content);
                    width: clamp(min(196px), 100vw, max(720px));
                    padding: clamp(min(10px), 3vw, max(26px));
                    border-radius: 0 10px 10px 0;
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hiden;
                }
                .settings-menu .settings-menu_content .settings-menu_content-top h5{
                    text-align: center;
                    font-size: clamp(min(.3rem), 4vw, max(1.6rem));
                    margin: 0;
                }
                .settings-menu .settings-menu_content .settings-menu_content-top hr{
                    opacity: 20%;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content p,
                .settings-menu .settings-menu_content .settings-menu_category-content legend {
                    font-size: clamp(.5rem, 3vw, 1.2rem);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content ol {
                    margin: 0;
                    padding-left: clamp(0.2rem, 3vw, 1.4rem);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content ol>li::marker {
                    font-size: clamp(.5rem, 3vw, 1.2rem);
                }
                .settings-menu .settings-menu_content img {
                    width: clamp(10px, 80%, 500px);
                    border-radius: var(--global-border-radius);
                    margin: 10px 10%;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option {
                    background-color: var(--settings-menu-light-options);
                    position: relative;
                    display: grid;
                    grid-template-rows: repeat(4, auto);
                    grid-template-columns: 75% 25%;
                    padding: .6em;
                    margin: 1rem 0;
                    border-radius: var(--global-border-radius);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option-select {
                    grid-row: 1/3;
                    grid-column: 2/3;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option legend{
                    grid-row: 1/2;
                    grid-column: 1/2;
                    font-size: clamp(min(.5rem), 4vw, max(1.3rem));
                    font-weight: 500;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option p{
                    grid-row: 2/3;
                    grid-column: 1/2;
                    margin: 0 0 0 2px;
                    opacity: 60%;
                    font-size: clamp(min(4px), 3vw, max(15px));
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .full-space {
                    font-size: clamp(min(.5em), 4vw, max(1.1em));
                    grid-column: 1/3;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option button {
                    grid-row: 1/3;
                    grid-column: 2/3;
                    place-self: end;
                    align-self: center;
                    cursor: pointer;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-buttons {
                    display: flex;
                    grid-row: 3/4;
                    grid-column: 1/3;
                    justify-content: end;
                    margin-top: 5px;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .keys-container {
                    grid-row:3/4;
                    grid-column: 1/3;
                    place-self: flex-end;
                    margin-top: var(--global-border-radius);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .keys-container .key {
                    background-color: var(--context-menu-light-li-hover);
                    width: fit-content;
                    padding: .2em .4em;
                    border-radius: var(--global-border-radius);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option code {
                    background-color: var(--settings-menu_code);
                    padding: 1em;
                    border-radius: var(--global-border-radius);
                    overflow: auto;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-toggle {
                    display: flex;
                    grid-column: 2/3;
                    grid-row: 1/3;
                    place-self: end;
                    align-self: center;
                    align-items: center;
                    width: 42px;
                    height: 17px;
                    padding: 4px;
                    background-color: var(--settings-menu-toggleBg);
                    border-radius: 20px;
                    cursor: pointer;
                    transition: ease-in-out 0.5s;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-toggle[data-active="true"]{
                    background-color: var(--settings-menu-active-toggle);
                    justify-content: end;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .colourPicker-clickableSwatches {
                    grid-row: 1/3;
                    grid-column: 2/3;
                }
                .toggle-active {
                    justify-content: end;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-toggle .option-toggle_circle{
                    width: 17px;
                    height: 17px;
                    background-color: var(--settings-menu-option-toggleCircle);
                    border-radius: 50%;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .option-buttons > input[type="button"] {
                    margin: 0 0 0 5px;
                    cursor: pointer;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option button:hover {
                    background-color: var(--light-button-hover);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option button:active {
                    background-color: var(--light-button-active);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option input[type="range"]{
                    grid-column: 2/3;
                    grid-row: 1/3;
                    place-self: center;
                    width: 80%;
                }
                .settings-menu .settings-menu_content .settings-menu_content-top #submenus-backButon {
                    position: relative;
                    width: clamp(11px, 4vw, 20px);
                    height: clamp(12px, 4vw, 21px);
                    cursor: pointer;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option #user-currentBG {
                    grid-column: 1/3;
                    grid-row: 2/3;
                    width: 40%;
                    margin: 12px;
                    height: fit-content;
                    place-self: center;
                    align-self: center;
                    border-radius: var(--global-border-radius);
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option #backgroundsSummary {
                    grid-column: 1/3;
                    grid-row: 3/4;
                    margin-bottom: 12px;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .backgrounds-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 10px 0;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option #setCustomBGurl {
                    grid-column: 1/2;
                    grid-row: 4/5;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .option .backgrounds-container .settings_background-img{
                    border-radius: var(--global-border-radius);
                    width: 45%;
                    margin: 5px;
                    cursor: pointer;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .subtitle {
                    font-size: clamp(min(.8rem), 3vw, max(1.2rem));
                    font-weight: 600;
                    margin: 1em 0;
                    text-align: center;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content hr {
                    opacity: 30%;
                    width: 80%;
                }

                .settings-menu .settings-menu_content .settings-menu_category-content #theme-editor_selectedTheme * {
                    margin-right: 10px;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .theme-editor_actions {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
                .settings-menu .settings-menu_content .settings-menu_category-content .theme-editor_actions  #theme-editor_selectedTheme {
                    display: flex;
                    align-items: center;
                    color: var(--main-content-font);
                }
            `,
            main: `
            <div class="settings-menu">
                <div class="settings-menu_list">
                    <img data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" id="closeSettingsBtn" src="App/Assets/Images/Close btn.svg" data-mode="close-menu" alt="close menu" title="Close menu" width="25px" height="25px">
                    <h4>${language.settings.title}</h4>
                    <ul id="settings-list" >
                        <li data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" data-mode="change-menu" data-category="general" id="settings_general"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13" cy="13" r="7.5" stroke="#2F2F2F" stroke-width="5"/>
                            <path d="M10.5234 0.510996C10.5674 0.217284 10.8197 0 11.1167 0H14.8833C15.1803 0 15.4326 0.217284 15.4766 0.510996L15.8966 3.311C15.9511 3.67376 15.6701 4 15.3033 4H10.6967C10.3299 4 10.0489 3.67376 10.1034 3.311L10.5234 0.510996Z" fill="#2F2F2F"/>
                            <path d="M15.4766 25.489C15.4326 25.7827 15.1803 26 14.8833 26L11.1167 26C10.8197 26 10.5674 25.7827 10.5234 25.489L10.1034 22.689C10.0489 22.3262 10.3299 22 10.6967 22L15.3033 22C15.6701 22 15.9511 22.3262 15.8966 22.689L15.4766 25.489Z" fill="#2F2F2F"/>
                            <path d="M22.5774 4.61065C22.8538 4.50195 23.1682 4.61181 23.3167 4.86902L25.1999 8.13097C25.3484 8.38818 25.2864 8.71532 25.0541 8.90033L22.8392 10.6641C22.5523 10.8926 22.1293 10.8124 21.9458 10.4947L19.6426 6.50529C19.4591 6.18761 19.6012 5.78118 19.9426 5.64692L22.5774 4.61065Z" fill="#2F2F2F"/>
                            <path d="M3.42256 21.3894C3.14617 21.4981 2.83184 21.3882 2.68334 21.131L0.800056 17.869C0.651557 17.6118 0.713577 17.2847 0.94591 17.0997L3.16078 15.3359C3.44774 15.1074 3.87075 15.1876 4.05416 15.5053L6.35744 19.4947C6.54086 19.8124 6.3988 20.2188 6.05743 20.3531L3.42256 21.3894Z" fill="#2F2F2F"/>
                            <path d="M25.0541 17.0996C25.2864 17.2846 25.3484 17.6118 25.1999 17.869L23.3167 21.1309C23.1682 21.3881 22.8538 21.498 22.5774 21.3893L19.9426 20.353C19.6012 20.2188 19.4591 19.8123 19.6426 19.4947L21.9458 15.5053C22.1293 15.1876 22.5523 15.1074 22.8392 15.3359L25.0541 17.0996Z" fill="#2F2F2F"/>
                            <path d="M0.94591 8.90038C0.713576 8.71537 0.651557 8.38822 0.800056 8.13101L2.68334 4.86906C2.83184 4.61186 3.14617 4.50199 3.42256 4.61069L6.05743 5.64696C6.3988 5.78122 6.54086 6.18766 6.35745 6.50533L4.05416 10.4947C3.87075 10.8124 3.44774 10.8926 3.16078 10.6641L0.94591 8.90038Z" fill="#2F2F2F"/>
                        </svg><legend class="settings-menu_list-legend">${language.settings.general.title}</legend></li>
                        <li data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" data-mode="change-menu" data-category="appearance" id="settings_appearance"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.1924 3.80761C20.9852 2.60045 19.5521 1.64288 17.9749 0.989565C16.3976 0.336254 14.7072 -2.8491e-07 13 0C11.2928 2.84911e-07 9.60235 0.336256 8.02511 0.989567C6.44788 1.64288 5.01477 2.60045 3.80761 3.80761C2.60045 5.01478 1.64288 6.44788 0.989565 8.02512C0.336254 9.60235 -3.59534e-07 11.2928 0 13C3.59534e-07 14.7072 0.336256 16.3977 0.989567 17.9749C1.64288 19.5521 2.60045 20.9852 3.80761 22.1924L13 13L22.1924 3.80761Z" fill="#2F2F2F"/>
                            <mask id="path-2-inside-1_415_44" fill="white">
                                <path d="M3.80761 22.1924C5.01478 23.3995 6.44788 24.3571 8.02512 25.0104C9.60235 25.6637 11.2928 26 13 26C14.7072 26 16.3977 25.6637 17.9749 25.0104C19.5521 24.3571 20.9852 23.3995 22.1924 22.1924C23.3996 20.9852 24.3571 19.5521 25.0104 17.9749C25.6637 16.3976 26 14.7072 26 13C26 11.2928 25.6637 9.60235 25.0104 8.02511C24.3571 6.44788 23.3995 5.01477 22.1924 3.80761L13 13L3.80761 22.1924Z"/>
                            </mask>
                            <path d="M3.80761 22.1924C5.01478 23.3995 6.44788 24.3571 8.02512 25.0104C9.60235 25.6637 11.2928 26 13 26C14.7072 26 16.3977 25.6637 17.9749 25.0104C19.5521 24.3571 20.9852 23.3995 22.1924 22.1924C23.3996 20.9852 24.3571 19.5521 25.0104 17.9749C25.6637 16.3976 26 14.7072 26 13C26 11.2928 25.6637 9.60235 25.0104 8.02511C24.3571 6.44788 23.3995 5.01477 22.1924 3.80761L13 13L3.80761 22.1924Z" fill="white" stroke="#2F2F2F" stroke-width="0.2" mask="url(#path-2-inside-1_415_44)"/>
                        </svg><legend class="settings-menu_list-legend">${language.settings.appearance.title}</legend></li>
                        <li style="display: none;" data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" style="display: innerit;" data-mode="change-menu" data-category="keybinds" id="settings_keybinds"><svg width="37" height="22" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="35" height="20" rx="1" stroke="#2F2F2F" stroke-width="2" stroke-linejoin="round"/>
                            <rect x="8" y="14" width="21" height="4" rx="1" fill="#222222"/>
                            <rect x="30" y="14" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="27" y="9" width="7" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="27" y="4" width="7" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="3" y="14" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="9" y="4" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="15" y="4" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="21" y="4" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="22" y="9" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="17" y="9" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="11" y="9" width="4" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="3" y="9" width="6" height="4" rx="1" fill="#2F2F2F"/>
                            <rect x="3" y="4" width="4" height="4" rx="1" fill="#2F2F2F"/>
                        </svg><legend class="settings-menu_list-legend">Keybinds</legend></li>
                        <li data-alert="false" data-alerttitle="${language.alerts.themeEditorAlerts.title}" data-alertdesc="${language.alerts.themeEditorAlerts.desc}" data-mode="change-menu" data-category="about" id="settings_about"><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="12" y="6" width="3" height="11" rx="1.5" fill="#222222"/>
                            <circle cx="13.5" cy="19.5" r="1.5" fill="#222222"/>
                            <circle cx="13.5" cy="13.5" r="12.25" stroke="#2F2F2F" stroke-width="2.5"/>
                        </svg><legend class="settings-menu_list-legend">${language.settings.about.title}</legend></li>
                    </ul>
                </div>
                    <div class="settings-menu_content">
            </div>
            `,
            general: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">${language.settings.general.categories.general}</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                    <div class="option">
                        <legend>${language.settings.general.shortcutsLimit.legend}</legend>
                        <p>${language.settings.general.shortcutsLimit.p}</p>
                        <select class="option-select" name="shortcuts" id="">
                            <option>--</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="8">${language.commonWords.default} (8)</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="6">6</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="3">3</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="0">${language.commonWords.clean} (0)</option>
                        </select>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.searchEngine.legend}</legend>
                        <p>${language.settings.general.searchEngine.p}</p>
                        <select class="option-select" name="search-engine" id="">
                            <option>--</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://www.google.com/search?q=">${language.commonWords.default} (Google)</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://www.bing.com/search?q=">Bing</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://duckduckgo.com/?q=">Duck Duck Go</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://you.com/search?q=">You search engine</option>
                        </select>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.searchInNewTab.legend}</legend>
                        <p>${language.settings.general.searchInNewTab.p}</p>
                        <div class="option-toggle" data-mode="toggle" data-active="${sManager.getValue("general", "open_search_in_newTab")}" data-category="general" data-preference="open_search_in_newTab" data-activevalue="true" data-offValue="false">
                            <div class="option-toggle_circle" data-mode="toggle"></div>
                        </div>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.weatherCity.legend}</legend>
                        <p class="full-space">${language.settings.general.weatherCity.p}</p>
                        <div class="option-buttons">
                            <input type="button" data-mode="set" data-promt="true" data-promtTitle="${language.prompts.weather.title}" data-promtDesc="${language.prompts.weather.desc}" data-category="general" data-preference="weather_city" value="${language.settings.general.weatherCity.manualSetButton}">
                            <input type="button" data-mode="set" data-category="general" data-preference="autoSet-weather_city" value="${language.settings.general.weatherCity.autoSetButton}">
                        </div>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.appLanguage.legend}</legend>
                        <p>${language.settings.general.appLanguage.p}</p>
                        <select class="option-select" name="app-lang" id="">
                            <option>--</option>
                            <option data-category="general" data-mode="set" data-preference="lang" data-value="en">${language.commonWords.default} (English)</option>
                            <option data-category="general" data-mode="set" data-preference="lang" data-value="es">Spanish (Español)</option>
                        </select>
                    </div>
                    <legend class="subtitle">${language.settings.general.categories.extra}</legend>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.exportSettings.legend}</legend>
                        <p>${language.settings.general.exportSettings.p}</p>
                        <button id="importExportConfig" data-mode="exportSettings" data-obj="settings">${language.settings.general.exportSettings.button}</button>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.exportShortcuts.legend}</legend>
                        <p>${language.settings.general.exportShortcuts.p}</p>
                        <button id="importExportConfig" data-mode="exportSettings" data-obj="shortcuts">${language.settings.general.exportShortcuts.button}</button>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.importSettings.legend}</legend>
                        <p>${language.settings.general.importSettings.p}</p>
                        <button id="importExportConfig" data-mode="importSettings" data-promtTitle="${language.prompts.importSettings.title}" data-promtDesc="${language.prompts.importSettings.desc}" data-obj="settings" data-placeholder="Ex: {General: {}, Appearance: {}}">${language.settings.general.importSettings.button}</button>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.importShortcuts.legend}</legend>
                        <p>${language.settings.general.importShortcuts.p}</p>
                        <button id="importExportConfig" data-mode="importSettings" data-promtTitle="${language.prompts.importShortcuts.title}" data-promtDesc="${language.prompts.importShortcuts.desc}" data-placeholder="Ex: [{id: 1}, {id: 2}...]" data-obj="shortcuts">${language.settings.general.importShortcuts.button}</button>
                    </div>
                    <legend class="subtitle">${language.settings.general.categories.resetAppValues}</legend>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.general.resetSettings.legend}</legend>
                        <button data-mode="reset" data-obj="settings">${language.settings.general.resetSettings.button}</button>
                    </div>
                    <div class="option">
                        <legend>${language.settings.general.deleteShortcuts.legend}</legend>
                        <button data-mode="reset" data-obj="shortcuts" >${language.settings.general.deleteShortcuts.button}</button>
                    </div>
                </div>
            </div>
            `,
            appearance: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">${language.settings.appearance.categories.appearance}</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                    <div class="option">
                        <legend>${language.settings.appearance.theme.legend}</legend>
                        <p>${language.settings.appearance.theme.p}</p>
                        <select class="option-select">
                            <option>--</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="light">${language.settings.appearance.theme.select.light}</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="dark">${language.settings.appearance.theme.select.dark}</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="customTheme1">${language.settings.appearance.theme.select.custom1}</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="customTheme2">${language.settings.appearance.theme.select.custom2}</option>
                        </select>
                    </div>
                    <div class="option">
                        <legend>${language.settings.appearance.backgrounds.legend}</legend>
                        <img id="user-currentBG" src="${sManager.getValue("appearance", "background")}">
                        <details id="backgroundsSummary">
                            <summary>${language.settings.appearance.backgrounds.summary}</summary>
                            <div class="backgrounds-container">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/1.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/1.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/2.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/2.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/3.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/3.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/4.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/4.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/5.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/5.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/6.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/6.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/7.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/7.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/8.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/8.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/9.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/9.webp">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/10.webp" class="settings_background-img" src="App/Assets/Images/Backgrounds/10.webp">
                            </div>
                        </details>
                        <input id="setCustomBGurl" data-mode="set" data-promt="true" data-promtTitle="${language.prompts.background.title}" data-promtDesc="${language.prompts.background.desc}" data-category="appearance" data-preference="background" type="button" value="${language.settings.appearance.backgrounds.button}">
                    </div>
                    <div class="option">
                        <legend>${language.settings.appearance.blurStrenght.legend}</legend>
                        <p>${language.settings.appearance.blurStrenght.p}</p>
                        <input data-mode="set" data-category="appearance" data-preference="blur" id="blur-range" type="range" min="0" max="32" value="${sManager.getValue("appearance", "blur")}">
                    </div>
                    <details>
                        <summary>${language.settings.appearance.relatedOptions.summary}</summary>
                        <div class="option">
                            <legend>${language.settings.appearance.relatedOptions.content.contextMenu.legend}</legend>
                            <p>${language.settings.appearance.relatedOptions.content.contextMenu.p}</p>
                            <input data-mode="set" data-category="appearance" data-preference="shortcutsPopUpOpacity" id="blur-range" type="range" min="0" max="100" value="${sManager.getValue("appearance", "shortcutsPopUpOpacity")}">
                        </div>
                        <div class="option">
                            <legend>${language.settings.appearance.relatedOptions.content.favouritesContent.legend}</legend>
                            <p>${language.settings.appearance.relatedOptions.content.favouritesContent.p}</p>
                            <input data-mode="set" data-category="appearance" data-preference="mainContentBgOpacity" id="blur-range" type="range" min="0" max="100" value="${sManager.getValue("appearance", "mainContentBgOpacity")}">
                        </div><div class="option">
                            <legend>${language.settings.appearance.relatedOptions.content.weatherPopUp.legend}</legend>
                            <p>${language.settings.appearance.relatedOptions.content.weatherPopUp.p}</p>
                            <input data-mode="set" data-category="appearance" data-preference="weatherPopUpOpacity" id="blur-range" type="range" min="0" max="100" value="${sManager.getValue("appearance", "weatherPopUpOpacity")}">
                        </div>
                    </details>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.appearance.dateFormat.legend}</legend>
                        <p>${language.settings.appearance.dateFormat.p}</p>
                        <select class="option-select" name="date-format" id="">
                            <option>--</option>
                            <option data-mode="set" data-category="appearance" data-preference="dateFormat" data-value="normalDate">D/M/Y</option>
                            <option data-mode="set" data-category="appearance" data-preference="dateFormat" data-value="fullDate">Day of week, Day of month, month, Year</option>
                        </select>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.appearance.highlightTopContentItems.legend}</legend>
                        <p>${language.settings.appearance.highlightTopContentItems.p}</p>
                        <div class="option-toggle" data-mode="toggle" data-active="${sManager.getValue("appearance", "top_itemsBg")}" data-category="appearance" data-preference="top_itemsBg" data-activevalue="true" data-offValue="false">
                            <div class="option-toggle_circle" data-mode="toggle"></div>
                        </div>
                    </div>
                    <div class="option">
                        <legend>${language.settings.appearance.invertFontColour.legend}</legend>
                        <p>${language.settings.appearance.invertFontColour.p}</p>
                        <div class="option-toggle" data-mode="toggle" data-active="${sManager.getValue("appearance", "invert_top_items_colour")}" data-category="appearance" data-preference="invert_top_items_colour" data-activevalue="true" data-offValue="false">
                            <div class="option-toggle_circle" data-mode="toggle"></div>
                        </div>
                    </div>
                    <legend class="subtitle">${language.settings.appearance.categories.advancedOptions}</legend>
                    <hr>
                    <div class="option">
                        <legend>${language.settings.appearance.customTheme.legend}</legend>
                        <p>${language.settings.appearance.customTheme.p}</p>
                        <button data-mode="createSubMenu" data-typeOfMenu="customizeTheme" data-parentMenu="appearance">${language.settings.appearance.customTheme.button}</button>
                    </div>
                </div>
            </div>
            `,
            keybinds: `
                <div>
                    <div class="settings-menu_content-top">
                        <h5 id="category-name">Keybinds</h5>
                        <hr>
                    </div>
                    <div class="settings-menu_category-content">
                        <div class="option">
                            <legend>Create shortcut</legend>
                            <p class="full-space">Create a new shortcut</p>
                            <div class="keys-container"><span class="key">Shift</span> + <span class="key">n</span></div>
                        </div>
                        <div class="option">
                            <legend>Change app theme</legend>
                            <p class="full-space">Toggle between light and dark themes</p>
                            <div class="keys-container"><span class="key">Ctrl</span> + <span class="key">c</span> + <span class="key">t</span></div>
                        </div>
                        <div class="option">
                            <legend>Open shortcut in current tab</legend>
                            <p class="full-space">Open a shortcut using the current tab</p>
                            <div class="keys-container"><span class="key">Shift</span> + <span class="key">number</span></div>
                        </div>
                        <div class="option">
                            <legend>Open shortcut in a new tab</legend>
                            <p class="full-space">Open a shortcut using a new tab</p>
                            <div class="keys-container"><span class="key">Ctrl</span> + <span class="key">Shift</span> + <span class="key">number</span></div>
                        </div>
                    </div>
                </div>
            `,
            about: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">${language.settings.about.categories.about}</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                    <div class="option">
                        <legend>${language.settings.about.missingFeatures.legend}</legend>
                        <p class="full-space">${language.settings.about.missingFeatures.p}</u></b></p>
                    </div>
                    <div class="option">
                        <legend>${language.settings.about.whatsNew.legend}</legend>
                        <ul class="full-space">
                            ${language.settings.about.whatsNew.list}                           
                        </ul>
                    </div>
                    <div class="option">
                        <legend>${language.settings.about.currentSettings.legend}</legend>
                        <code class="full-space settingsMenu_code">${JSON.stringify(this.config.general)}\n${JSON.stringify(this.config.appearance)}</code>
                    </div>
                    <div class="option">
                        <legend>${language.settings.about.appInfo.legend}</legend>
                        <p>${language.settings.about.appInfo.version}</p>
                    </div>
                </div>
            </div>
            `
        }
    }
    async showMenu(){
        if(this.apliedMenuStatus === true) return
        this.dynamicStyle.innerHTML = this.menuContent.style
        this.$root.insertAdjacentHTML("afterbegin", this.menuContent.main)
        document.querySelector(".top-bg").style.display = "block"
        
        this.apliedMenuStatus = true
        openedMenu = true
        document.querySelector(".settings-menu").addEventListener("click", this.ClickHandler)
        document.querySelector(".settings-menu").addEventListener("change", this.SelectHandler)
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
