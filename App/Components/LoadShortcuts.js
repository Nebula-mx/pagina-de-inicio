import { config } from "./loadSettings.js";

export default function() {
    const  $favourites = document.querySelector(".favourites"),
        $template = document.getElementById("shotcuts-template").content,
        $fragment = document.createDocumentFragment();

    if(!localStorage.getItem("shortcuts")) {
        localStorage.setItem("shortcuts", "[]")
        localStorage.setItem("shortcutsNumber", 0)
        return
    }

    let shortcuts = JSON.parse(localStorage.getItem("shortcuts"))

    shortcuts.forEach((el, i) => {
        $template.querySelector(".shortcut").setAttribute("data-ID", i)
        $template.querySelector(".shortcut_main-content").setAttribute("data-url", el.url)
        $template.querySelector("[data-AppImg]").src = `https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${el.url}`
        $template.querySelector("[data-AppName]").textContent = el.title
        if(config.appereance.theme === "dark") $template.querySelector("[data-AppImg]").setAttribute("style", $template.querySelector("[data-AppImg]").dataset.theme)
    
        let $clone = document.importNode($template, true)
        $fragment.append($clone)
    })
    $favourites.append($fragment)
    if(shortcuts.length === config.general.shortcuts_limit) document.getElementById("add-shortcut").style.display = "none"
}