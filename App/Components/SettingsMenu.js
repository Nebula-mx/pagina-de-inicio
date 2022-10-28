import { showNotification } from "../Helpers/showNotification.js";
import { showPromt } from "../Helpers/showPrompt.js";
import { sManager } from "./loadSettings.js";
import { getWeather } from "./Weather.js";

if(localStorage.getItem("updated_settings") === "false") sManager.updateSettings()
class SETTINGS_MENU_MANAGER {
    constructor(clickHandler, SelectHandler){
        this.config = sManager.getFullSettings() || sManager.defaultSettings
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
                /* padding: 26px 0 26px 26px; */
                padding: 26px;
                border-radius: 10px 0 0 10px;
                width: 30%;
                min-width: 163px;
                max-width: 238px;
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
                border-radius: 5px;
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
                width: 70%;
                min-width: 400px;
                max-width: 720px;
                padding: 26px;
                border-radius: 0 10px 10px 0;
                height: 100%;
                overflow-y: auto;
            }
            .settings-menu .settings-menu_content .settings-menu_content-top h5{
                text-align: center;
                font-size: 1.5rem;
                margin: 0;
            }
            .settings-menu .settings-menu_content .settings-menu_content-top hr{
                opacity: 20%;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option {
                background-color: var(--settings-menu-light-options);
                position: relative;
                display: grid;
                grid-template-rows: repeat(4, auto);
                grid-template-columns: 75% 25%;
                padding: .6em;
                margin: 1rem 0;
                border-radius: 5px;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option-select {
                background-color: var(--settings-menu-light-selects);
                grid-row: 1/3;
                grid-column: 2/3;
                width: auto;
                height: fit-content;
                align-self: center;
                padding: 4px;
                border-radius: 5px;
                font-family: "Montserrat", sans-serif;
                font-weight: 600;
                border: 1px solid var(--settings-menu-light-selects);
                color: var(--main-content-light-font);
                cursor: pointer;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option legend{
                grid-row: 1/2;
                grid-column: 1/2;
                font-size: 1.2rem;
                font-weight: 500;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option p{
                grid-row: 2/3;
                grid-column: 1/2;
                margin: 0 0 0 2px;
                opacity: 60%;
                font-size: 14px;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option .full-space {
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
                position: absolute;
                place-self: flex-end;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option .keys-container .key {
                background-color: var(--context-menu-light-li-hover);
                width: fit-content;
                padding: .2em .4em;
                border-radius: 5px;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option code {
                background-color: var(--settings-menu-light-option-toggleBg);
                padding: 1em;
                border-radius: 5px;
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
            .settings-menu .settings-menu_content .settings-menu_category-content .option #user-currentBG {
                grid-column: 1/3;
                grid-row: 2/3;
                width: 40%;
                margin: 12px;
                height: fit-content;
                place-self: center;
                align-self: center;
                border-radius: 5px;
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
                border-radius: 5px;
                width: 45%;
                margin: 5px;
                cursor: pointer;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .subtitle {
                font-size: 1.2rem;
                font-weight: 600;
                margin: 1em 0;
                text-align: center;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content hr {
                opacity: 30%;
                width: 80%;
            }
            `,
            main: `
            <div class="settings-menu">
                <div class="settings-menu_list">
                    <img id="closeSettingsBtn" src="App/Assets/Images/Close btn.svg" data-mode="close-menu" alt="close menu" title="Close menu" width="25px" height="25px">
                    <h4>Settings</h4>
                        <ul id="settings-list" >
                            <li data-mode="change-menu" data-category="general" id="settings_general"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13" cy="13" r="7.5" stroke="#2F2F2F" stroke-width="5"/>
                                <path d="M10.5234 0.510996C10.5674 0.217284 10.8197 0 11.1167 0H14.8833C15.1803 0 15.4326 0.217284 15.4766 0.510996L15.8966 3.311C15.9511 3.67376 15.6701 4 15.3033 4H10.6967C10.3299 4 10.0489 3.67376 10.1034 3.311L10.5234 0.510996Z" fill="#2F2F2F"/>
                                <path d="M15.4766 25.489C15.4326 25.7827 15.1803 26 14.8833 26L11.1167 26C10.8197 26 10.5674 25.7827 10.5234 25.489L10.1034 22.689C10.0489 22.3262 10.3299 22 10.6967 22L15.3033 22C15.6701 22 15.9511 22.3262 15.8966 22.689L15.4766 25.489Z" fill="#2F2F2F"/>
                                <path d="M22.5774 4.61065C22.8538 4.50195 23.1682 4.61181 23.3167 4.86902L25.1999 8.13097C25.3484 8.38818 25.2864 8.71532 25.0541 8.90033L22.8392 10.6641C22.5523 10.8926 22.1293 10.8124 21.9458 10.4947L19.6426 6.50529C19.4591 6.18761 19.6012 5.78118 19.9426 5.64692L22.5774 4.61065Z" fill="#2F2F2F"/>
                                <path d="M3.42256 21.3894C3.14617 21.4981 2.83184 21.3882 2.68334 21.131L0.800056 17.869C0.651557 17.6118 0.713577 17.2847 0.94591 17.0997L3.16078 15.3359C3.44774 15.1074 3.87075 15.1876 4.05416 15.5053L6.35744 19.4947C6.54086 19.8124 6.3988 20.2188 6.05743 20.3531L3.42256 21.3894Z" fill="#2F2F2F"/>
                                <path d="M25.0541 17.0996C25.2864 17.2846 25.3484 17.6118 25.1999 17.869L23.3167 21.1309C23.1682 21.3881 22.8538 21.498 22.5774 21.3893L19.9426 20.353C19.6012 20.2188 19.4591 19.8123 19.6426 19.4947L21.9458 15.5053C22.1293 15.1876 22.5523 15.1074 22.8392 15.3359L25.0541 17.0996Z" fill="#2F2F2F"/>
                                <path d="M0.94591 8.90038C0.713576 8.71537 0.651557 8.38822 0.800056 8.13101L2.68334 4.86906C2.83184 4.61186 3.14617 4.50199 3.42256 4.61069L6.05743 5.64696C6.3988 5.78122 6.54086 6.18766 6.35745 6.50533L4.05416 10.4947C3.87075 10.8124 3.44774 10.8926 3.16078 10.6641L0.94591 8.90038Z" fill="#2F2F2F"/>
                            </svg>General</li>
                            <li data-mode="change-menu" data-category="appearance" id="settings_appearance"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.1924 3.80761C20.9852 2.60045 19.5521 1.64288 17.9749 0.989565C16.3976 0.336254 14.7072 -2.8491e-07 13 0C11.2928 2.84911e-07 9.60235 0.336256 8.02511 0.989567C6.44788 1.64288 5.01477 2.60045 3.80761 3.80761C2.60045 5.01478 1.64288 6.44788 0.989565 8.02512C0.336254 9.60235 -3.59534e-07 11.2928 0 13C3.59534e-07 14.7072 0.336256 16.3977 0.989567 17.9749C1.64288 19.5521 2.60045 20.9852 3.80761 22.1924L13 13L22.1924 3.80761Z" fill="#2F2F2F"/>
                                <mask id="path-2-inside-1_415_44" fill="white">
                                    <path d="M3.80761 22.1924C5.01478 23.3995 6.44788 24.3571 8.02512 25.0104C9.60235 25.6637 11.2928 26 13 26C14.7072 26 16.3977 25.6637 17.9749 25.0104C19.5521 24.3571 20.9852 23.3995 22.1924 22.1924C23.3996 20.9852 24.3571 19.5521 25.0104 17.9749C25.6637 16.3976 26 14.7072 26 13C26 11.2928 25.6637 9.60235 25.0104 8.02511C24.3571 6.44788 23.3995 5.01477 22.1924 3.80761L13 13L3.80761 22.1924Z"/>
                                </mask>
                                <path d="M3.80761 22.1924C5.01478 23.3995 6.44788 24.3571 8.02512 25.0104C9.60235 25.6637 11.2928 26 13 26C14.7072 26 16.3977 25.6637 17.9749 25.0104C19.5521 24.3571 20.9852 23.3995 22.1924 22.1924C23.3996 20.9852 24.3571 19.5521 25.0104 17.9749C25.6637 16.3976 26 14.7072 26 13C26 11.2928 25.6637 9.60235 25.0104 8.02511C24.3571 6.44788 23.3995 5.01477 22.1924 3.80761L13 13L3.80761 22.1924Z" fill="white" stroke="#2F2F2F" stroke-width="0.2" mask="url(#path-2-inside-1_415_44)"/>
                            </svg>Appearance</li>
                            <li style="display: none;" data-mode="change-menu" data-category="keybinds" id="settings_keybinds">Keybinds</li>
                            <li data-mode="change-menu" data-category="about" id="settings_about"><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="12" y="6" width="3" height="11" rx="1.5" fill="#222222"/>
                                <circle cx="13.5" cy="19.5" r="1.5" fill="#222222"/>
                                <circle cx="13.5" cy="13.5" r="12.25" stroke="#2F2F2F" stroke-width="2.5"/>
                            </svg>About</li>
                        </ul>
                    </div>
                    <div class="settings-menu_content">
                </div>
            </div>
            `,
            general: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">General</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                    <div class="option">
                        <legend>Change shortcuts limit</legend>
                        <select class="option-select" name="shortcuts" id="">
                            <option>--</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="8">Default (8)</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="6">6</option>
                            <option data-mode="set" data-category="general" data-preference="shortcuts_limit" data-value="3">3</option>
                        </select>
                    </div>
                    <div class="option">
                        <legend>Select search engine</legend>
                        <p>Change the default search engine</p>
                        <select class="option-select" name="search-engine" id="">
                            <option>--</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://www.google.com/search?q=">Default (Google)</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://www.bing.com/search?q=">Bing</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://duckduckgo.com/?q=">Duck Duck Go</option>
                            <option data-mode="set" data-category="general" data-preference="search_engine" data-value="https://you.com/search?q=">You search engine</option>
                        </select>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>Open seach on NewTab</legend>
                        <p>Make every seach you made open in new tabs</p>
                        <div class="option-toggle" data-mode="toggle" data-active="${this.config.general.open_search_in_newTab}" data-category="general" data-preference="open_search_in_newTab" data-activevalue="true" data-offValue="false">
                            <div class="option-toggle_circle" data-mode="toggle"></div>
                        </div>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>Set weather city</legend>
                        <p class="full-space">Change your preferred city to display the weather</p>
                        <div class="option-buttons">
                            <input type="button" data-mode="set" data-promt="true" data-promtTitle="Write the name of your city" data-promtDesc=" " data-category="general" data-preference="weather_city" value="Manual Set">
                            <input type="button" data-mode="set" data-category="general" data-preference="autoSet-weather_city" value="Auto Set">
                        </div>
                    </div>
                    <div class="option">
                        <legend>Change app language</legend>
                        <p>Chose your prefered lang to use</p>
                        <select class="option-select" name="app-lang" id="">
                            <option>--</option>
                            <option data-category="general" data-preference="lang" data-value="en">Default (English)</option>
                        </select>
                    </div>
                    <legend class="subtitle">Extra</legend>
                    <hr>
                    <div class="option">
                        <legend>Export settings</legend>
                        <p>Export your settings to use them in another browser</p>
                        <button id="importExportConfig" data-mode="exportSettings" data-obj="settings">Export</button>
                    </div>
                    <div class="option">
                        <legend>Import settings</legend>
                        <p>Import your custom settings to use</p>
                        <button id="importExportConfig" data-mode="importSettings" data-promtTitle="Import settings" data-promtDesc="insert your settings string" data-obj="settings">Import</button>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>Export shortcuts</legend>
                        <p>Export all your shortcuts</p>
                        <button id="importExportConfig" data-mode="exportSettings" data-obj="shortcuts">Export</button>
                    </div>
                    <div class="option">
                        <legend>Import shortcuts</legend>
                        <p>Import shortcuts from other place</p>
                        <button id="importExportConfig" data-mode="importSettings" data-promtTitle="Import shortcuts" data-promtDesc="insert your settings string" data-placeholder="Ex: {config, appearance}" data-obj="shortcuts">Import</button>
                    </div>
                    <legend class="subtitle">Reset app values</legend>
                    <hr>
                    <div class="option">
                        <legend>Reset settings</legend>
                        <button data-mode="reset" data-obj="settings">Reset</button>
                    </div>
                    <div class="option">
                        <legend>Delete all shortcuts</legend>
                        <button data-mode="reset" data-obj="shortcuts" >Delete all</button>
                    </div>
                </div>
            </div>
            `,
            appearance: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">Appearance</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                    <div class="option">
                        <legend>Theme</legend>
                        <p>Select your favourite theme for the app</p>
                        <select class="option-select">
                            <option>--</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="light">Light</option>
                            <option data-mode="set" data-category="appearance" data-preference="theme" data-value="dark">Dark</option>
                        </select>
                    </div>
                    <div class="option">
                        <legend>Current background:</legend>
                        <img id="user-currentBG" src="${this.config.appearance.background}">
                        <details id="backgroundsSummary">
                            <summary>More backgrounds</summary>
                            <div class="backgrounds-container">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/2.jpeg" class="settings_background-img" src="App/Assets/Images/Backgrounds/2.jpeg">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/1.jpg" class="settings_background-img" src="App/Assets/Images/Backgrounds/1.jpg">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/3.jpg" class="settings_background-img" src="App/Assets/Images/Backgrounds/3.jpg">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/4.png" class="settings_background-img" src="App/Assets/Images/Backgrounds/4.png">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/5.jpg" class="settings_background-img" src="App/Assets/Images/Backgrounds/5.jpg">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/6.jpg" class="settings_background-img" src="App/Assets/Images/Backgrounds/6.jpg">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/7.jpg" class="settings_background-img" src="App/Assets/Images/Backgrounds/7.jpg">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/8.jpg" class="settings_background-img" src="App/Assets/Images/Backgrounds/8.jpg">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/9.jpg" class="settings_background-img" src="App/Assets/Images/Backgrounds/9.jpg">
                                <img data-mode="set" data-category="appearance" data-preference="background" data-value="App/Assets/Images/Backgrounds/10.jpg" class="settings_background-img" src="App/Assets/Images/Backgrounds/10.jpg">
                            </div>
                        </details>
                        <input id="setCustomBGurl" data-mode="set" data-promt="true" data-promtTitle="Set custom background URL" data-promtDesc="Paste the url of your background" data-category="appearance" data-preference="background" type="button" value="Set custom background url">
                    </div>
                    <div class="option">
                        <legend>Set blur strength</legend>
                        <p>Adjust the blur to your liking</p>
                        <input data-mode="set" data-category="appearance" data-preference="blur" id="blur-range" type="range" min="0" max="32" value="${this.config.appearance.blur}">
                    </div>
                    <hr>
                    <div class="option">
                        <legend>Change date format</legend>
                        <p>Select a diferent format to display the date</p>
                        <select class="option-select" name="date-format" id="">
                            <option>--</option>
                            <option data-mode="set" data-category="appearance" data-preference="dateFormat" data-value="normalDate">D/M/Y</option>
                            <option data-mode="set" data-category="appearance" data-preference="dateFormat" data-value="fullDate">Day of week, Day of month, month, Year</option>
                        </select>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>Highligh top content items</legend>
                        <p>Add an transparent background to the top content items (Weather, Settings button, Hour)</p>
                        <div class="option-toggle" data-mode="toggle" data-active="${this.config.appearance.top_itemsBg}" data-category="appearance" data-preference="top_itemsBg" data-activevalue="true" data-offValue="false">
                            <div class="option-toggle_circle" data-mode="toggle"></div>
                        </div>
                    </div>
                    <div class="option">
                        <legend>Invert top content font colour</legend>
                        <p>If your background doesn't matches width the font colour, you can invert the colour</p>
                        <div class="option-toggle" data-mode="toggle" data-active="${this.config.appearance.invert_top_items_colour}" data-category="appearance" data-preference="invert_top_items_colour" data-activevalue="true" data-offValue="false">
                            <div class="option-toggle_circle" data-mode="toggle"></div>
                        </div>
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
                            <legend>Close menu</legend>
                            <div class="keys-container"><span class="key">Esc</span></div>
                        </div>
                    </div>
                </div>
            `,
            about: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">About</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                <div class="option">
                    <legend>Missing features</legend>
                    <p class="full-space">This app still in development so features like <u><b>lang selection, custom style import, Keyblinds and other features are not avalilable yet</u></b></p>
                </div>
                <div class="option">
                    <legend>What's new?</legend>
                    <ul class="full-space">
                        <li>New weather popUp that shows you more info about the weather</li>
                        <li>Now you can chose that every search will open in new tabs</li>
                        <li>New appearance tab style</li>
                        <li>You can chose between two date formats</li>
                        <li>New highlight top content feature</li>
                        <li>New Invert top content font colour feature</li>
                    </ul>
                </div>
                <div class="option">
                    <legend>Designed for desktop</legend>
                    <p class="full-space">The app is not designed to use it on mobile devices, full mobile support will be available in next versions</p>
                </div>
                <div class="option">
                    <legend>Your current settings</legend>
                    <code class="full-space settingsMenu_code" >${JSON.stringify(this.config)}</code>
                </div>
                <div class="option">
                    <legend>App info:</legend>
                    <p>Version: 0.9.2.1 <br> Developed by: <a href="https://github.com/Nebula-mx/" >Nebula_mx</a> <br> Made with 💜 from 🇲🇽</p>
                </div>
            </div>
            `
        }
        this.menuInteractions = {
            "close-menu": () => {
                location.hash = "#/"
                document.querySelector(".settings-menu").removeEventListener("click", this.handler)
                this.dynamicStyle.innerHTML = null
                this.$root.removeChild(document.querySelector(".settings-menu"))
                document.querySelector(".top-bg").style.display = "none"
                
                this.apliedMenuStatus = false
            },
            "change-menu": (target) => {
                location.hash = `#/settings/${target.dataset.category}`
            },
            "set": async (target) => {
                let value; 
                if(target.dataset.preference === "autoSet-weather_city") {
                    getWeather("auto")
                    return
                }
                if(target.dataset.promt === "true") {
                    value = await showPromt({title: target.dataset.promttitle, desc:target.dataset.promtdesc, placeholder: target.dataset.placeholder || sManager.getValue(target.dataset.category, target.dataset.preference)})
                }
                sManager.saveSettings(target.dataset.category, target.dataset.preference, (parseInt(target.value) || target.dataset.value || value))
       
            },
            "toggle": (target) => {
                let toggleElement = target
                if(target.dataset.active === "false") {
                    if(target.classList.contains("option-toggle_circle")){
                        toggleElement = target.parentNode;
                    }
                    toggleElement.firstElementChild.dataset.active = "true";
                    toggleElement.style.justifyContent = "end";
                    toggleElement.style.backgroundColor = "var(--settings-menu-active-toggle)"
                    toggleElement.dataset.active = "true";

                    sManager.saveSettings(toggleElement.dataset.category, toggleElement.dataset.preference, toggleElement.dataset.activevalue);
                    return;
                }
                if(target.dataset.active === "true") {
                    if(target.classList.contains("option-toggle_circle")){
                        toggleElement = target.parentNode;
                    }
                    toggleElement.firstElementChild.dataset.active = "false";
                    toggleElement.style.justifyContent = "start";
                    toggleElement.style.backgroundColor = "var(--settings-menu-toggleBg)";
                    toggleElement.dataset.active = "false";

                    sManager.saveSettings(toggleElement.dataset.category, toggleElement.dataset.preference, toggleElement.dataset.offvalue);
                
                    return;
                }
                    
            },
            "exportSettings": (target) => {
                sManager.exportSettings(target.dataset.obj)
            },
            "importSettings": async (target) => {
                let str = await showPromt({title: `Insert your ${target.dataset.obj} string`, desc: "", placeholder: localStorage.getItem(target.dataset.obj)})
                sManager.importSettings(target.dataset.obj, str)
            },
            "reset": (target) => {
                sManager.resetValue(target.dataset.obj)
            }
        }
    }
    showMenu(){
        this.dynamicStyle.innerHTML = this.menuContent.style
        this.$root.insertAdjacentHTML("afterbegin", this.menuContent.main)
        document.querySelector(".top-bg").style.display = "block"
        
        this.apliedMenuStatus = true
        document.querySelector(".settings-menu").addEventListener("click", this.ClickHandler)
        document.querySelector(".settings-menu").addEventListener("change", this.SelectHandler)
    }
    showCategory(cat){
        document.querySelector(".settings-menu_content").innerHTML = null
        document.querySelector(".settings-menu_content").innerHTML = this.menuContent[cat]
    }
}
function settingsMenuInteractionsHandler(e){
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
// let apliedMenuStatus = {
//     aplied: false
// }

// const settingsMenuActions = {
//     "change-menu": (target) => location.hash = `#/settings/${target.dataset.category}`,
     
//     "toggle": (target) => {
//         let toggleElement = target
//         if(target.dataset.active === "false") {
//             if(target.classList.contains("option-toggle_circle")){
//                 toggleElement = target.parentNode
//             }
//             toggleElement.firstElementChild.dataset.active = "true"
//             toggleElement.classList.add("toggle-active")
//             toggleElement.dataset.active = "true"

//             sManager.saveSettings(toggleElement.dataset.category, toggleElement.dataset.preference, toggleElement.dataset.activevalue)
//             return
//         }
//         if(target.dataset.active === "true") {
//             if(target.classList.contains("option-toggle_circle")){
//                 toggleElement = target.parentNode
//             }
//             toggleElement.firstElementChild.dataset.active = "false"
//             toggleElement.classList.remove("toggle-active")
//             toggleElement.dataset.active = "false"

//             sManager.saveSettings(toggleElement.dataset.category, toggleElement.dataset.preference, toggleElement.dataset.offvalue)
    
//             return
//         }
//     },
//     "copySettings": (target) => {
//         sManager.exportSettings(target.dataset.setting)
//     },
//     "import":async (target) => {
//         let this.config = await showPromt({title: target.dataset.promttitle, desc: target.dataset.promtdesc, placeholder: target.dataset.promtex})
//         sManager.importSettings(target.dataset.obj, this.config)
//     },
//     "reset": (target) => {
//         localStorage.removeItem(target.dataset.option)
//         showNotification("Your settings have been reset", "The app will reload in 3 seconds")
//         setTimeout(() => location.reload(), 3100)
//     }
// }
// const settingsMenuInteractionsHandler = (e) => {
//     if(settingsMenuActions.hasOwnProperty(e.target.dataset.mode)){
//         settingsMenuActions[e.target.dataset.mode](e.target)
//         return
//     }
// }

// const settingsMenuSelectHandler = (e) => {
//     if(e.target.type === "range") {
//         settingsMenuActions.set(e.target)
//         return
//     }
//     if(e.target.type === "select-one"){
//         settingsMenuActions.set(e.target.children[e.target.selectedIndex])
//     }
//     return
// }
// export function openSettingsMenu() {
//     if(apliedMenuStatus.aplied === true) return

//     $dynamicStyle.innerHTML = settingsContent.style
//     $root.insertAdjacentHTML("afterbegin", settingsContent.main)
//     document.querySelector(".top-bg").style.display = "block"
//     apliedMenuStatus.aplied = true

//     this.config = sManager.getFullSettings()
//     document.querySelector(".settings-menu").addEventListener("click", settingsMenuInteractionsHandler)
//     document.querySelector(".settings-menu").addEventListener("change", settingsMenuSelectHandler)
// }

// export function closeSettingsMenu() {
//     apliedMenuStatus.aplied = false

//     $dynamicStyle.innerHTML = null
//     $root.removeChild($root.querySelector(".settings-menu"))
//     document.querySelector(".top-bg").style.display = "none"
//     document.removeEventListener("click", settingsMenuInteractionsHandler)
//     document.removeEventListener("change", settingsMenuSelectHandler)

//     location.hash = "#/"
// }

// export function loadSettingsContent(content) {
//     document.querySelector(".settings-menu_content").innerHTML = null
//     document.querySelector(".settings-menu_content").insertAdjacentHTML("beforeend", content)
// }
