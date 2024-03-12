const $root = document.getElementById("root")
let apliedContent = false

export function showNotification(title, desc) {
    if(apliedContent === true && $root.querySelector(".notification")) {
        $root.removeChild($root.querySelector(".notification"))
        apliedContent = false
        return showNotification(title, desc)
    }
    apliedContent = true
    let html = `
        <span class="notification">
            <legend id="notification-title">${title}</legend>
            <p id="notification-desc">${desc}</p>
        </span>
    `
    $root.insertAdjacentHTML("afterbegin", html)
    setTimeout(() => {
        $root.removeChild($root.querySelector(".notification"))
        apliedContent = false        
    }, 5300)
}