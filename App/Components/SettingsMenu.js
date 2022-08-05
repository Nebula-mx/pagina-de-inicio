import { config } from "./loadSettings.js";
import { loadTheme } from "./Settings/loadTheme.js";
import { ajustShortcutsLenght } from "./ShortcutForm.js";
import { getWeather } from "./Weather.js";

const $root = document.getElementById("root"),
    $dynamicStyle = document.getElementById("dynamic-style");


export const settingsContent = {
    style: `
    .settings-menu {
        display: flex;
        /*justify-content: center;*/
        position: absolute;
        place-self: center;
        width: 80%;
        height: 400px;
        z-index: 500;
        filter: drop-shadow(6px 6px 5px rgba(0, 0, 0, 0.2));
        color: var(--main-content-font);
    }
    .settings-menu #closeSettingsBtn {
        display: flex;
        position: absolute;
        place-self: baseline;
        width: 25px;
        height: 25px;
        padding: 1rem;
        filter: invert(var(--settings-menu-invert));
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
        margin-bottom: 1rem;
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
    }
    `,
    main: `
    <div class="settings-menu">
    <img id="closeSettingsBtn" src="App/Assets/Images/Close btn.svg" alt="close menu" title="Close menu" width="25px" height="25px">
        <div class="settings-menu_list">
            <h4>Settings</h4>
            <ul id="settings-list" >
                <li data-category="general" id="settings_general">General</li>
                <li data-category="appereance" id="settings_appereance">Appereance</li>
                <li data-category="about" id="settings_about">About</li>
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
                    <option data-category="general" data-preference="search_engine" data-value="https://www.google.com/search?q">Default (Google)</option>
                    <option data-category="general" data-preference="search_engine" data-value="https://www.bing.com/search?q">Bing</option>}
                    <option data-category="general" data-preference="search_engine" data-value="https://duckduckgo.com/?q">Duck Duck Go</option>
                </select>
            </div>
            <div class="option">
                <legend>Set weather city</legend>
                <p>Change your preferred city to display the weather</p>
                <button data-category="general" data-preference="weather_city">Set</button>
            </div>
            <div class="option">
                <legend>Change app language</legend>
                <p>Chose your prefered lang to use</p>
                <select class="option-select" name="app-lang" id="">
                    <option>--</option>
                    <option data-category="general" data-preference="lang" data-value="en">Default (English)</option>
                </select>
            </div>
        </div>
    </div>
    `,
    appereance: `
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
                    <option data-category="appereance" data-preference="theme" data-value="light" >Light</option>
                    <option data-category="appereance" data-preference="theme" data-value="dark" >Dark</option>
                </select>
            </div>
            <div class="option">
                <legend>Select background</legend>
                <div class="backgrounds-container">
                    <img data-category="appereance" data-preference="background" class="settings_background-img" src="App/Assets/Images/Backgrounds/1.jpg">
                    <img data-category="appereance" data-preference="background" class="settings_background-img" src="App/Assets/Images/Backgrounds/2.jpeg">
                    <img data-category="appereance" data-preference="background" class="settings_background-img" src="App/Assets/Images/Backgrounds/3.jpg">
                    <img data-category="appereance" data-preference="background" class="settings_background-img" src="App/Assets/Images/Backgrounds/4.png">
                    <img data-category="appereance" data-preference="background" class="settings_background-img" src="App/Assets/Images/Backgrounds/5.jpg">
                    <img data-category="appereance" data-preference="background" class="settings_background-img" src="App/Assets/Images/Backgrounds/6.jpg">
                    <img data-category="appereance" data-preference="background" class="settings_background-img" src="App/Assets/Images/Backgrounds/7.jpg">
                    <img data-category="appereance" data-preference="background" class="settings_background-img" src="App/Assets/Images/Backgrounds/8.jpg">
                    <img data-category="appereance" data-preference="background" class="settings_background-img" src="App/Assets/Images/Backgrounds/9.jpg">
                </div>
                <input data-category="appereance" data-preference="background" type="button" value="Set custom background url">
            </div>
            <div class="option">
                <legend>Set blur strength</legend>
                <p>Adjust the blur to your liking <br> <u><b>This effect isn't supported on Firefox</b></u></p>
                <input data-category="appereance" data-preference="blur" id="blur-range" type="range" min="0" max="32" value="${config.appereance.blur}">
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
            <p>This app still in development so features like <u><b>lang selection, shortcuts import, custom style import and another features are not avalilable</u></b></p>
        </div>
        <div class="option">
            <legend>Designed for desktop</legend>
            <p>The app is not designed to use it on mobile devices, full mobile suppor will be available in next versions</p>
        </div>
    </div>
    `

}

let apliedMenuStatus = {
    aplied: false
}

export function openSettingsMenu() {
    if(apliedMenuStatus.aplied === true) return

    $dynamicStyle.innerHTML = settingsContent.style
    $root.insertAdjacentHTML("afterbegin", settingsContent.main)
    document.querySelector(".top-bg").style.display = "block"
    apliedMenuStatus.aplied = true
}

export function closeSettingsMenu() {
    apliedMenuStatus.aplied = false

    $dynamicStyle.innerHTML = null
    $root.removeChild($root.querySelector(".settings-menu"))
    document.querySelector(".top-bg").style.display = "none"
    document.removeEventListener("change", document)

    location.hash = "#/"
}

export function loadSettingsContent(content) {
    document.querySelector(".settings-menu_content").innerHTML = null
    document.querySelector(".settings-menu_content").insertAdjacentHTML("beforeend", content)
}

export function setSetting(target) {
     if(target.dataset.category === "general") {
        if(target.dataset.preference === "shortcuts_limit") {
            config.general.shortcuts_limit = parseInt(target.dataset.value)
            ajustShortcutsLenght()
        }
        if(target.dataset.preference === "search_engine") {
            config.general.search_engine = target.dataset.value
        }
        if(target.dataset.preference === "weather_city") {
            let city = prompt("Write the name of your city")
            if(!city) return
            config.general.weather_city = city
            getWeather()
        }
    }
    if(target.dataset.category === "appereance") {
        if(target.dataset.preference === "theme") {
            config.appereance.theme = target.dataset.value
            loadTheme()
        }
        if(target.dataset.preference === "background") {
            config.appereance.background = target.getAttribute("src")
            loadTheme()
        }
        if(target.dataset.preference === "background" && target.tagName === "INPUT") {
            let background = prompt("insert background url")
            if(!background) {return} else {config.appereance.background = background}
            loadTheme()
        }
        if(target.dataset.preference === "blur") {
            config.appereance.blur = parseInt(target.value)
            loadTheme()
        }

    }
    localStorage.setItem("settings", JSON.stringify(config))
}