import { errorAnimShake } from "../Helpers/Animations.js";
import { getContent } from "../Helpers/Loader.js";
import { config } from "./loadSettings.js";

const $root = document.getElementById("root"),
    $dynamicStyle = document.getElementById("dynamic-style"),
    $favourites = document.querySelector(".favourites");
    
let $form,
    $editTarget = null;
    
export function ShortcutForm(saveBtnID, editTarget){
    getContent({
        url: "App/Views/addShortcutForm.html",
        successFn: async(res) => {
            let formStyle = await fetch("./App/Assets/Styles/css/shortcut-form.css")
            let html = await res.text()
            $dynamicStyle.innerHTML = await formStyle.text()
            $root.insertAdjacentHTML("afterbegin", html)
            $form = document.getElementById("shortcut-form")

            $form.querySelector("#saveBtn").setAttribute("id", saveBtnID)
            $editTarget = editTarget
        },
        errorFn: (err) => console.log(err)
    })
}

export function closeShortcutForm(){
    $root.removeChild($form)
    $dynamicStyle.innerHTML = null
}
export async function saveForm(mode) {
    //mode and editTarget are only for edit-shortcut mode

    //form validations
    if(!$form.url.value) {
        errorAnimShake($form.url, ['5px', '-5px', '5px', '-5px', '5px', '0'], 15)
        return
    }
    if(!/^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/.test($form.url.value)) {
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
    closeShortcutForm()

    localStorage.setItem("shortcuts", JSON.stringify(shortcuts))
    localStorage.setItem("shortcutsNumber", shortcuts.length)
    if(shortcuts.length === config.general.shortcuts_limit) {
        document.getElementById("add-shortcut").style.display = "none"
    }
    return
}