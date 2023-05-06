import { errorAnimShake } from "./Animations.js"

export let promtTarget;
export const promtRegEx = {
    "Import settings": null
}

export function closePromt(hideTopBg) {
    if(hideTopBg === true) document.querySelector(".top-bg").style.display = "none"
    document.querySelector(".top-bg").style.zIndex = 10
    document.getElementById("root").removeChild(document.querySelector(".promt"))
}

export function showPromt(config = {title, desc, placeholder}) {
    const html = `
        <span class="promt">
            <legend>${config.title}</legend>
            <p>${config.desc}</p>
            <input id="promt-input" type="text" placeholder="${config.placeholder}">
            <div class="buttons">
                <button id="closePrompt">Cancel</button>
                <button id="savePromt">Done</button>
            </div>
        </span>
    `
    document.querySelector(".top-bg").style.zIndex = 12
    document.getElementById("root").insertAdjacentHTML("afterbegin", html)

    return new Promise((resolve) => {
        document.getElementById("savePromt").onclick = () => {
            resolve (document.getElementById("promt-input").value)
            closePromt()
        }
    })
}