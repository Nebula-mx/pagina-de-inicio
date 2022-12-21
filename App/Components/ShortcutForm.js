import { errorAnimShake } from "../Helpers/Animations.js";
import { sManager } from "./loadSettings.js";

const $root = document.getElementById("root"),
    $dynamicStyle = document.getElementById("dynamic-style"),
    $favourites = document.querySelector(".favourites");
    
let $form,
    $editTarget = null;
    
export function ShortcutForm(saveBtnID, editTarget, title){
    if($favourites.childElementCount-2 === sManager.getValue("general", "shortcuts_limit") && !editTarget) return
    const formStyle = `
        .top-bg {
            display: block;
        }
        #shortcutPrompTitle {
            text-align: center;
            font-size: 20px;
            margin-bottom: 8px;
            color: var(--main-content-font);
        }
        #shortcut-form {
            background-color: var(--shortcut-form-bg);
            position: fixed;
            display: flex;
            flex-direction: column;
            place-self: center;
            border-radius: var(--global-border-radius);
            padding: 1.7rem;
            width: 50%;
            max-width: 375px;
            z-index: 11;
        }
        #shortcut-form input[type="text"]{
            background-color: var(--shortcut-form-inputtext-bg);
            margin-bottom: 6px;
            padding: 10px 15px;
            border: solid 2px var(--shortcut-form-inputText-border);
            outline: none;
            border-radius: var(--global-border-radius);
            font-family: "Montserrat", sans-serif;
            color: var(--main-content-font);
        }
        #shortcut-form input[type="text"]:focus {
            border: solid 2px rgb(157, 219, 255);
        }
        #shortcut-form .shortcut-form_btns {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        #shortcut-form .shortcut-form_btns > input[type="button"]{
            font-family: "Montserrat", sans-serif;
            background-color: var(--shortcut-form-btn-bg);
            border: solid 1px var(--light-button-border);
            box-shadow: 0px 1px rgba(0, 0, 0, .10);
            border-radius: var(--global-border-radius);
            padding: 0.5em .8em;
            width: 48%;
            color: var(--main-content-font);
        }
        #shortcut-form .shortcut-form_btns > input[type="button"]:hover {
            background-color: var(--shortcut-form-btn-hover);
        }
        #shortcut-form .shortcut-form_btns > input[type="button"]:active {
            background-color: var(--shortcut-form-btn-active);
        }
    `
    const html = `
        <form id="shortcut-form">
            <legend id="shortcutPrompTitle">${title}</legend>
            <input type="text" name="url" placeholder="Insert page url...">
            <input type="text" name="title" placeholder="Type page name...">
            <div class="shortcut-form_btns">
                <input id="closeSFBtn" type="button" value="cancel">
                <input id="saveSFBtn" type="button" value="Save & exit">
            </div>
        </form>
    `
    $dynamicStyle.innerHTML = formStyle
    $root.insertAdjacentHTML("afterbegin", html)
    $form = document.getElementById("shortcut-form")
    document.querySelector(".top-bg").style.display ="block"

    $form.querySelector("#saveSFBtn").setAttribute("id", saveBtnID)
    $editTarget = editTarget
}

export function closeShortcutForm(){
    $root.removeChild($form)
    $dynamicStyle.innerHTML = null
    document.querySelector(".top-bg").style.display ="none"
}
export async function saveForm(mode) {
    //mode and editTarget are only for edit-shortcut mode

    //form validations
    if(!$form.url.value) {
        errorAnimShake($form.url, ['5px', '-5px', '5px', '-5px', '5px', '0'], 15)
        return
    }
    if(!/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test($form.url.value)) {
        errorAnimShake($form.url, ['5px', '-5px', '5px', '-5px', '5px', '0'], 15)
        return
    }
    if(!$form.title.value) {
        errorAnimShake($form.title, ['5px', '-5px', '5px', '-5px', '5px', '0'], 15)
        return
    }

    //declarating variables after valitations
    const shortcuts = JSON.parse(localStorage.getItem("shortcuts")),
        prevPosition = shortcuts.length,
        $template = document.getElementById("shotcuts-template").content;

    //if mode value is equal to "edit" edit mode is started
    if(mode === "edit") {
        let position = parseInt($editTarget.getAttribute("data-id"))

        shortcuts[position] = {
            id: position,
            title: $form.title.value,
            url: $form.url.value
        }
        $editTarget.querySelector(".shortcut_main-content").setAttribute("data-url", shortcuts[position].url)
        $editTarget.querySelector("[data-AppImg]").src = `https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${shortcuts[position].url}`
        $editTarget.querySelector("[data-AppName]").textContent = shortcuts[position].title
        
        closeShortcutForm()

        localStorage.setItem("shortcuts", JSON.stringify(shortcuts))
        return
    }

    //create shortcut mode
    shortcuts[prevPosition] = {
        id: prevPosition,
        title: $form.title.value,
        url: $form.url.value
    }

    $template.querySelector(".shortcut").setAttribute("data-ID", prevPosition)
    $template.querySelector(".shortcut_main-content").setAttribute("data-url", shortcuts[prevPosition].url)
    $template.querySelector("[data-AppImg]").src = `https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${shortcuts[prevPosition].url}`
    $template.querySelector("[data-AppName]").textContent = shortcuts[prevPosition].title

    let $clone = document.importNode($template, true)
    $favourites.append($clone)
    
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts))
    localStorage.setItem("shortcutsNumber", shortcuts.length)
    if(shortcuts.length === sManager.getValue("general", "shortcuts_limit")) {
        document.getElementById("add-shortcut").style.display = "none"
    }
    closeShortcutForm()
    return
}
export function ajustShortcutsLenght() {
    const shortcuts = JSON.parse(localStorage.getItem("shortcuts"))

    let shortcutsLenght = $favourites.childElementCount -2,
        shortcutsLimit = parseInt(sManager.getValue("general", "shortcuts_limit")),
        diference = shortcutsLenght - shortcutsLimit;

    if(shortcutsLenght > shortcutsLimit) {
        while(diference !== 0 && diference >= 0) {
            $favourites.removeChild($favourites.lastElementChild)
            shortcuts.pop()
            diference--
        }
        document.getElementById("add-shortcut").style.display = "none"
        localStorage.setItem("shortcuts", JSON.stringify(shortcuts))
        localStorage.setItem("shortcutsNumber", shortcuts.length)
    }
    if(shortcutsLenght === shortcutsLimit && document.getElementById("add-shortcut").getAttribute("style") === "display: flex;") {
        document.getElementById("add-shortcut").style.display = "none"
    }
    if(shortcutsLenght < shortcutsLimit && document.getElementById("add-shortcut").getAttribute("style") === "display: none;") {
        document.getElementById("add-shortcut").style.display = "flex"
    }
}