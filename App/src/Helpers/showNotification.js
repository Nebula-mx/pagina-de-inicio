const $root = document.getElementById("root")
let apliedContent = false

export function showNotification(title, desc) {
    if(apliedContent === true) {
        $root.removeChild($root.querySelector(".notification"))
        apliedContent = false
    }
    let html = `
        <span class="notification">
            <legend id="notification-title">${title}</legend>
            <p id="notification-desc">${desc}</p>
        </span>
    `
    $root.insertAdjacentHTML("afterbegin", html)
    apliedContent = true
    setTimeout(() => {
        $root.removeChild($root.querySelector(".notification"))
        apliedContent = false        
    }, 5000)
}