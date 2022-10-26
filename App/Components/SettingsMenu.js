import { showNotification } from "../Helpers/showNotification.js";
import { showPromt } from "../Helpers/showPrompt.js";
import { sManager } from "./loadSettings.js";
import { getWeather } from "./Weather.js";

class SETTINGS_MENU_MANAGER {
    constructor(handler){
        this.handler = handler
        this.$root = document.getElementById("root")
        this.dynamicStyle = document.getElementById("dynamic-style")
        this.config = sManager.getFullSettings()
        this.apliedMenuStatus = false
        this.settingsContent = {
            style: `
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
                list-style: none;
                background-color: var(--settings-menu-light-list-items);
                padding: 5px 20px;
                margin-bottom: 10px;
                border-radius: 5px;
                box-shadow: 2px 2px 7px #00000026;
                cursor: pointer;
            }
            .settings-menu .settings-menu_list ul li:hover {
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
                display: flex;
                position: relative;
                flex-flow: column;
                justify-content: center;
                padding: .6em;
                margin: 1rem 0;
                border-radius: 5px;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option-select {
                display: flex;
                position: absolute;
                place-self: end;
                background-color: var(--settings-menu-light-selects);
                padding: 4px;
                border: 1px solid var(--settings-menu-light-selects);
                border-radius: 5px;
                font-family: "Montserrat", sans-serif;
                font-weight: 600;
                color: var(--main-content-light-font);
                cursor: pointer;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option legend{
                font-size: 1.2rem;
                font-weight: 500;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option p{
                margin: 0;
                opacity: 60%;
                font-size: 14px;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option .option-toggle {
                display: flex;
                position: absolute;
                place-self: end;
                align-items: center;
                width: 42px;
                height: 17px;
                padding: 4px;
                background-color: var(--settings-menu-light-option-toggleBg);
                border-radius: 20px;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option .keys-container {
                position: absolute;
                place-self: flex-end;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option .keys-container .key {
                background-color: var(--context-menu-light-li-hover);
                width: fit-content;
                padding: .2em .4em;
                border-radius: 5px;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option .option-toggle .option-toggle_circle{
                width: 17px;
                height: 17px;
                background-color: var(--settings-menu-light-option-toggleCircle);
                border-radius: 50%;
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
            .settings-menu .settings-menu_content .settings-menu_category-content .option button {
                position: absolute;
                place-self: end;
                cursor: pointer;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option code {
                background-color: var(--settings-menu-light-option-toggleBg);
                padding: 1em;
                border-radius: 5px;
                overflow: auto;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option .option-buttons {
                display: flex;
                justify-content: end;
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
                position: absolute;
                place-self: end;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option .backgrounds-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                padding: 10px 0;
            }
            .settings-menu .settings-menu_content .settings-menu_category-content .option .backgrounds-container .settings_background-img{
                border-radius: 5px;
                width: 45%;
                margin: 5px;
                cursor: pointer;
            }
            `,
            main: `
            <div class="settings-menu">
                <div class="settings-menu_list">
                    <img id="closeSettingsBtn" src="App/Assets/Images/Close btn.svg" alt="close menu" title="Close menu" width="25px" height="25px">
                    <h4>Settings</h4>
                        <ul id="settings-list" >
                            <li data-mode="change-menu" data-category="general" id="settings_general">General</li>
                            <li data-mode="change-menu" data-category="appearance" id="settings_appearance">Appereance</li>
                            <!-- <li data-mode="change-menu" data-category="keybinds" id="settings_keybinds">Keybinds</li> -->
                            <li data-mode="change-menu" data-category="about" id="settings_about">About</li>
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
                            <option data-category="general" data-preference="shortcuts_limit" data-value="8">Default (8)</option>
                            <option data-category="general" data-preference="shortcuts_limit" data-value="6">6</option>
                            <option data-category="general" data-preference="shortcuts_limit" data-value="3">3</option>
                        </select>
                    </div>
                    <div class="option">
                        <legend>Select search engine</legend>
                        <p>Change the default search engine</p>
                        <select class="option-select" name="search-engine" id="">
                            <option>--</option>
                            <option data-category="general" data-preference="search_engine" data-value="https://www.google.com/search?q=">Default (Google)</option>
                            <option data-category="general" data-preference="search_engine" data-value="https://www.bing.com/search?q=">Bing</option>
                            <option data-category="general" data-preference="search_engine" data-value="https://duckduckgo.com/?q=">Duck Duck Go</option>
                            <option data-category="general" data-preference="search_engine" data-value="https://you.com/search?q=">You search engine</option>
                        </select>
                    </div>
                    <div class="option">
                        <legend>Set weather city</legend>
                        <p>Change your preferred city to display the weather</p>
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
                        <button id="importExportConfig" data-mode="copySettings" data-setting="settings">Export</button>
                    </div>
                    <div class="option">
                        <legend>Import settings</legend>
                        <p>Import your custom settings to use</p>
                        <button id="importExportConfig" data-mode="save" data-promtTitle="Import settings" data-promtDesc="insert your settings string" data-obj="settings">Import</button>
                    </div>
                    <hr>
                    <div class="option">
                        <legend>Export shortcuts</legend>
                        <p>Export all your shortcuts</p>
                        <button id="importExportConfig" data-mode="copySettings" data-setting="shortcuts">Export</button>
                    </div>
                    <div class="option">
                        <legend>Import shortcuts</legend>
                        <p>Import shortcuts from other place</p>
                        <button id="importExportConfig" data-mode="save" data-promtTitle="Import shortcuts" data-promtDesc="insert your settings string" data-obj="shortcuts">Import</button>
                    </div>
                    <legend class="subtitle">Reset app values</legend>
                    <hr>
                    <div class="option">
                        <legend>Reset settings</legend>
                        <button data-mode="reset" data-option="settings">Reset</button>
                    </div>
                    <div class="option">
                        <legend>Delete all shortcuts</legend>
                        <button data-mode="reset" data-option="shortcuts" >Delete all</button>
                    </div>
                </div>
            </div>
            `,
            appearance: `
            <div>
                <div class="settings-menu_content-top">
                    <h5 id="category-name">Appereance</h5>
                    <hr>
                </div>
                <div class="settings-menu_category-content">
                    <div class="option">
                        <legend>Theme</legend>
                        <p>Select your favourite theme for the app</p>
                        <select class="option-select">
                            <option>--</option>
                            <option data-category="appearance" data-preference="theme" data-value="light">Light</option>
                            <option data-category="appearance" data-preference="theme" data-value="dark">Dark</option>
                        </select>
                    </div>
                    <div class="option">
                        <legend>Select background</legend>
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
                        <input data-mode="set" data-promt="true" data-promtTitle="Set custom background URL" data-promtDesc="Paste the url of your background" data-category="appearance" data-preference="background" type="button" value="Set custom background url">
                    </div>
                    <div class="option">
                        <legend>Set blur strength</legend>
                        <p>Adjust the blur to your liking</p>
                        <input data-category="appearance" data-preference="blur" id="blur-range" type="range" min="0" max="32" value="${this.config.appearance.blur}">
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
                    <p>This app still in development so features like <u><b>lang selection, custom style import, Keyblinds and other features are not avalilable yet</u></b></p>
                </div>
                <div class="option">
                    <legend>What's new?</legend>
                    <ul>
                        <li>New weather popUp that shows more info about the weather</li>
                        <li>New notitications style</li>
                        <li>Now you can chose that every seach will open in new tabs</li>
                        <li>New date format (you can change this on the appearance tab)</li>
                        <li>Added invert top content font colour feature</li>
                        <li>Added a semi-transparent background for top content items (you can find it on the appearance tab)</li>
                        <li>New Open in New Tab button on shortcuts context menu</li>
                    </ul>
                </div>
                <div class="option">
                    <legend>Designed for desktop</legend>
                    <p>The app is not designed to use it on mobile devices, full mobile support will be available in next versions</p>
                </div>
                <div class="option">
                    <legend>Your current settings</legend>
                    <code class="settingsMenu_code" >${JSON.stringify(this.config)}</code>
                </div>
                <div class="option">
                    <legend>App info:</legend>
                    <p>Version: 0.9.1 <br> Developed by: <a href="https://github.com/Nebula-mx/" >Nebula_mx</a> <br> Made with 💜 from 🇲🇽</p>
                </div>
            </div>
            `
        }
        this.menuInteractions = {
            "change-menu": (e) => {
                document.querySelector(".settings-menu_content").innerHTML = this.settingsContent[e.target.dataset.category]
            }
        }
    }
    showMenu(){
        this.dynamicStyle.innerHTML = this.settingsContent.style
        this.$root.insertAdjacentHTML("afterbegin", this.settingsContent.main)
        
        this.apliedMenuStatus = true
        document.querySelector(".settings-menu").addEventListener("click", this.handler)
    }
}
function settingsMenuInteractionsHandler(e){
    if(settingsMenuManager.menuInteractions[e.target.dataset.mode]){
        settingsMenuManager.menuInteractions[e.target.dataset.mode](e)
    } else {console.error("jajaja eso no existe pa")}
}
export const settingsMenuManager = new SETTINGS_MENU_MANAGER(settingsMenuInteractionsHandler)
// let apliedMenuStatus = {
//     aplied: false
// }

// const settingsMenuActions = {
//     "change-menu": (target) => location.hash = `#/settings/${target.dataset.category}`,
//     "set": async (target) => {
//         let value; 
//         if(target.dataset.preference === "autoSet-weather_city") {
//             getWeather("auto")
//             return
//         }
//         if(target.dataset.promt === "true") {
//             value = await showPromt({title: target.dataset.promttitle, desc:target.dataset.promtdesc, placeholder: sManager.this.config[target.dataset.category][target.dataset.preference]})
//         }
//         sManager.saveSettings(target.dataset.category, target.dataset.preference, (parseInt(target.value) || target.dataset.value || value))

//     },
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
