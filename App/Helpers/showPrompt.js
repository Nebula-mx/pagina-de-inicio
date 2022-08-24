import { errorAnimShake } from "./Animations.js"

export let promtTarget;


export function closePromt() {    
    document.querySelector(".top-bg").style.zIndex = 10
    document.getElementById("root").removeChild(document.querySelector(".promt"))
}

export function showPromt(title, desc) {
    console.log(title, desc)

    const html = `
    <span class="promt">
        <legend>${title}</legend>
        <p>${desc}</p>
        <input id="promt-input" type="text" name="" id="" placeholder="something">
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