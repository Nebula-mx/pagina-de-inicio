import { getContent } from "../Helpers/Loader.js";

let $menu;
const status = {
    aplied: false,
    target: null
}
export function closeMenu(listener){
    if(listener) {
        if(listener.target.matches(".context-menu") || listener.target.matches("#context-menu_deleteBtn")) return
        document.removeEventListener("click", closeMenu)
    }
    status.aplied = false
    status.target.children[0].removeChild(status.target.children[0].querySelector(".context-menu"))
}
export function showActions(e){
    getContent({
        url: "App/Views/contextMenu.html",
        fetchOptions: {
            method: "GET"
        },
        successFn: (async(res) => {
            const html = await res.text(),
                parentElement = e.parentNode;
            
            if(status.aplied === true) {
                if(status.target !== parentElement.parentNode) closeMenu()
                if(status.target === parentElement.parentNode) return
                
                $menu = status.target.children[0].querySelector(".context-menu")
            }
            
            status.aplied = true
            status.target = parentElement.parentNode
            parentElement.insertAdjacentHTML("afterbegin",  html)

            document.addEventListener("click", closeMenu)
        }),
        errorFn: (err => console.log(err))
    })
}