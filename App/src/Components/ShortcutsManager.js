import { sManager } from "../../settingsManager.js"
import { errorAnimShake } from "../Helpers/Animations.js";
import { showNotification } from "../Helpers/showNotification.js";
const lang = sManager.getValue("general", "lang");
const language = (await import(`../lang/${lang}.js`)).default;

class SHORTCUTS_MANAGER {
    constructor() {
        this.$root = document.getElementById("root")
        this.$dynamicStyle = document.getElementById("dynamic-style")
        this.shortcuts = null
        this.shortcutsContainer = document.querySelector(".shortcutsContainer")
        this.shortcutsLimit = sManager.getValue("general", "shortcuts_limit")
        this.shortcutsLenght = parseInt(localStorage.getItem("shortcutsNumber"))
        this.$shortcutTemplate = document.getElementById("shortcut-template").content        
    }
    testShortcutsLenght(){
        let newShortcutsArr = JSON.parse(localStorage.getItem("shortcuts"))
        if(newShortcutsArr === null) return
        let sLimit = parseInt(sManager.getValue("general", "shortcuts_limit"))
        let sLenght = newShortcutsArr.length
        
        if(sLenght > sLimit) {
            console.log("holis")
            while(sLenght > sLimit){
                sLenght--
                newShortcutsArr.pop()
            }
            this.shortcuts = newShortcutsArr
            localStorage.shortcuts = JSON.stringify(newShortcutsArr)
            localStorage.shortcutsNumber = newShortcutsArr.length
        }        
    }
    async loadShortcuts() {
        if(this.shortcuts === null) return
        try {
            const $fragment = document.createDocumentFragment()
            this.shortcuts.forEach((el, i) => {
                if(el.url === undefined || el.id === undefined || el.title === undefined) throw new Error(`Some values are not valid!`)

                this.$shortcutTemplate.querySelector(".shortcut").setAttribute("data-shortcutID", i)
                this.$shortcutTemplate.querySelector(".shortcut_main-content").setAttribute("data-url", el.url)
                this.$shortcutTemplate.querySelector("[data-AppImg]").src = `https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${el.url}`
                this.$shortcutTemplate.querySelector("[data-AppName]").textContent = el.title
            
                let $clone = document.importNode(this.$shortcutTemplate, true)
                $fragment.append($clone)
            });
            this.shortcutsContainer.append($fragment)
            this.shortcutsLenght = this.shortcutsContainer.children.length -1
            localStorage.setItem("shortcutsNumber", this.shortcutsLenght)
            if(this.shortcuts.length == sManager.config.general["shortcuts_limit"]) return document.getElementById("add-shortcut").style.display = "none"
        } catch (error) {
            if(error.message === "shortcutsLimitReached"){
                return //document.getElementById("add-shortcut").style.display = "none"
            }
            console.log(error)
            localStorage.setItem("shortcuts", "null")
            this.testShortcutsStatus()
        }
    }
    testShortcutsStatus() {
        try {
            if(localStorage.getItem("shortcuts") === "null" || !JSON.parse(localStorage.getItem("shortcuts")) instanceof Array) throw new Error("The shortcuts object format is not valid")
            this.shortcuts = JSON.parse(localStorage.getItem("shortcuts"))
            this.testShortcutsLenght()
            this.loadShortcuts()
        } catch (err) {
            console.info(err)
            showNotification(language.notifications.errors.corruptShortcuts.title, language.notifications.errors.corruptShortcuts.desc)
            localStorage.setItem("shortcuts", "[]")
            this.shortcuts = []
            this.shortcutsLimit = 6
            this.shortcutsLenght = 0
        }
    }
    closeShortcutPrompt() {
        this.$root.removeChild(document.getElementById("shortcut-form"))
        this.$root.querySelector(".top-bg").style.display = "none"        
        this.$dynamicStyle.innerHTML = null
    }
    openShortcutPrompt(title, pageUrlPlaceholder, pageNamePlaceholder, mode) {
        const formStyle = `
            #shortcutPrompTitle {
                text-align: center;
                font-size: 20px;
                margin-bottom: 8px;
                color: var(--main-content-font);
            }
            #shortcut-form {
                background-color: var(--shortcut-form-bg);
                position: fixed;
                display: flex;
                flex-direction: column;
                place-self: center;
                border-radius: var(--global-border-radius);
                padding: 1.7rem;
                width: 50%;
                max-width: 375px;
                z-index: 11;
            }
            #shortcut-form input[type="text"]{
                background-color: var(--shortcut-form-inputtext-bg);
                margin-bottom: 6px;
                padding: 10px 15px;
                border: solid 2px var(--shortcut-form-inputText-border);
                outline: none;
                border-radius: var(--global-border-radius);
                font-family: "Montserrat", sans-serif;
                color: var(--main-content-font);
            }
            #shortcut-form input[type="text"]:focus {
                border: solid 2px rgb(157, 219, 255);
            }
            #shortcut-form .shortcut-form_btns {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
            }
            #shortcut-form .shortcut-form_btns > input[type="button"]{
                font-family: "Montserrat", sans-serif;
                background-color: var(--shortcut-form-btn-bg);
                border: solid 1px var(--light-button-border);
                box-shadow: 0px 1px rgba(0, 0, 0, .10);
                border-radius: var(--global-border-radius);
                padding: 0.5em .8em;
                width: 48%;
                color: var(--main-content-font);
            }
            #shortcut-form .shortcut-form_btns > input[type="button"]:hover {
                background-color: var(--shortcut-form-btn-hover);
            }
            #shortcut-form .shortcut-form_btns > input[type="button"]:active {
                background-color: var(--shortcut-form-btn-active);
            }
        `
        const html = `
            <form id="shortcut-form">
                <legend id="shortcutPrompTitle">${title}</legend>
                <input id="formUrlInput" type="text" name="url" placeholder="${pageUrlPlaceholder}">
                <input id="formNameInput" type="text" name="title" placeholder="${pageNamePlaceholder}">
                <div class="shortcut-form_btns">
                    <input id="closeSFBtn" type="button" value="${language.prompts.shortcuts.cancel}">
                    <input id="saveSFBtn" type="button" value="${language.prompts.shortcuts.save}">
                </div>
            </form>
        `
        this.$dynamicStyle.innerHTML = formStyle
        this.$root.insertAdjacentHTML("afterbegin", html)
        this.$root.querySelector(".top-bg").style.display = "block"
        
        if(mode) {
            document.getElementById("formUrlInput").value = mode[0]
            document.getElementById("formNameInput").value = mode[1]
        }
        
        let saveBtn = document.getElementById("saveSFBtn"),
            closeBtn = document.getElementById("closeSFBtn");
            
        return new Promise((resolve, reject) => {
            saveBtn.addEventListener("click", (e) => {
                if(!/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(document.getElementById("formUrlInput").value)) {
                    return errorAnimShake(document.getElementById("formUrlInput"))
                }
                if(!document.getElementById("formNameInput").value) {
                    return errorAnimShake(document.getElementById("formNameInput"))
                }
                const data = {
                    url: document.getElementById("formUrlInput").value, 
                    name: document.getElementById("formNameInput").value
                }
                this.closeShortcutPrompt()
                resolve(data)
            })
            closeBtn.addEventListener("click", e => {
                this.closeShortcutPrompt()
                reject()
            })
        })
    }
    createShortcut() {
        this.openShortcutPrompt(language.prompts.shortcuts.createTitle, language.prompts.shortcuts.urlPlaceHolder, language.prompts.shortcuts.namePlaceHolder)
            .then((data) => {
                let pos = this.shortcutsLenght
                this.$shortcutTemplate.querySelector(".shortcut").setAttribute("data-shortcutID", pos)
                this.$shortcutTemplate.querySelector(".shortcut_main-content").setAttribute("data-url", data.url)
                this.$shortcutTemplate.querySelector("[data-AppImg]").src = `https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${data.url}`
                this.$shortcutTemplate.querySelector("[data-AppName]").textContent = data.name

                let $clone = document.importNode(this.$shortcutTemplate, true)
                this.shortcutsContainer.appendChild($clone)

                this.shortcutsLenght++
                this.shortcuts.push({id: pos , title: data.name, url: data.url})
                localStorage.setItem("shortcuts", JSON.stringify(this.shortcuts))
                localStorage.setItem("shortcutsNumber", pos +1)

                if(this.shortcutsLenght === this.shortcutsLimit) document.getElementById("add-shortcut").style.display = "none"
            })
            .catch(err => err)
    }
    editShortcut(target) {
        let targetId = parseInt(target.dataset.shortcutid)
        this.openShortcutPrompt(language.prompts.shortcuts.editTitle, `Previous Url: ${target.children[1].dataset.url}`, `Previous name: ${target.children[1].querySelector("legend").outerText}`, [`${target.children[1].dataset.url}`, `${target.children[1].querySelector("legend").outerText}`])
            .then(data => {
                this.shortcuts[targetId] = {
                    id: targetId,
                    title: data.name,
                    url: data.url
                }
                target.children[1].setAttribute("data-url", data.url)
                target.children[1].children[0].src = `https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${data.url}`
                target.children[1].children[1].textContent = data.name

                localStorage.setItem("shortcuts", JSON.stringify(this.shortcuts))
            })
            .catch(err => err)
    }
    deleteShortcut(target) {
        this.shortcuts.splice(parseInt(target.dataset.shortcutid), 1)
        this.shortcutsLenght--
        this.shortcutsContainer.removeChild(target)
        
        document.querySelectorAll("[data-shortcutID]").forEach((node, i) => {
            node.setAttribute("data-shortcutID", i)
            this.shortcuts[i].id = i
        })
        
        localStorage.setItem("shortcuts", JSON.stringify(this.shortcuts))
        localStorage.setItem("shortcutsNumber", this.shortcutsLenght)
        if(document.getElementById("add-shortcut").getAttribute("style") === "display: none;" && this.shortcutsLenght < this.shortcutsLimit) document.getElementById("add-shortcut").style.display = "block"
    }
}
export const shortcuts_manager = new SHORTCUTS_MANAGER()