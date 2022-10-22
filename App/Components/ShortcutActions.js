let $menu;
const status = {
    aplied: false,
    target: null
}

export function closeMenu(listener){
    if(listener) {
        if(listener.target.matches(".context-menu")) return
        document.removeEventListener("click", closeMenu)
    }
    status.aplied = false
    status.target.children[0].removeChild(status.target.children[0].querySelector(".context-menu"))
}

export function showActions(e){
    const html = `
    <span class="context-menu">
            <ul id="context-menu_content">
                <li id="context-menu_newTab">Open in new tab</li>
                <li id="context-menu_editBtn">Edit shortcut</li>
                <li id="context-menu_deleteBtn">Delete shortcut</li>
            </ul>
            <hr>
            <ul>
                <li id="context-menu_closeBtn">Close</li>
            </ul>
        </span>
    `,
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
}