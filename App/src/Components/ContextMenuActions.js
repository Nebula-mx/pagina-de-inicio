import { sManager } from "../../settingsManager.js"

export function deleteShortcut(target){
    const $favourites = document.querySelector(".favourites"),
        shortcutData = JSON.parse(localStorage.getItem("shortcuts"));

    let position = parseInt(target.getAttribute("data-id")),
        $element = $favourites.children[position+2];
    
    shortcutData.splice(position, 1 )
    $favourites.removeChild($element)

    shortcutData.forEach((el, i) => {
        if(position === 0) {
            el.id = i
            const shortcuts = document.querySelectorAll("[data-id]")
            shortcuts.forEach((el, index) => {
                el.setAttribute("data-id", index)
            })
        }
        if(position !== 0){
            if(i >= position){
                const shortcuts = document.querySelectorAll("[data-id]")
                shortcuts[i].setAttribute("data-id", i)
            }
        }
    })

    if(shortcutData.length === 0) localStorage.removeItem("shortcuts")
    if($favourites.children.length === 2) localStorage.removeItem("shortcuts")
    
    localStorage.setItem("shortcuts", JSON.stringify(shortcutData))
    localStorage.setItem("shortcutsNumber", shortcutData.length)

    if(shortcutData.length < sManager.config.general.shortcuts_limit && document.getElementById("add-shortcut").getAttribute("style") === "display: none;") {
        document.getElementById("add-shortcut").style.display = "block"
    }
}