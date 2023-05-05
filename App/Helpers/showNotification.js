const $root = document.getElementById("root")

export function showNotification(title, desc) {
    let html = `
        <span class="notification">
            <legend id="notification-title">${title}</legend>
            <p id="notification-desc">${desc}</p>
        </span>
    `
    $root.insertAdjacentHTML("afterbegin", html)

    setTimeout(() => {
        $root.removeChild($root.querySelector(".notification"))
    }, 3000)
}