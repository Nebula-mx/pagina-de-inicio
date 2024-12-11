class SHORTCUT_PROMPT{
    constructor(interactionsManager){
        this.interactionsManager = interactionsManager;
        this.openedMenu = false;
        this.mode = null;
        this.actions = {
            closeMenu: () => {
                this.openedMenu = false;
                document.getElementById("shortcutFormStyle").outerHTML = null;
                document.getElementById("shortcutFormContainer").removeEventListener("click", this.interactionsManager);
                document.getElementById("root").removeChild(document.getElementById("shortcutFormContainer"));
            },
            applyEdit: async(id, name, url, element) => {
                const shortcutsManager = ((await import("./shortcutsManager.js")).shortcuts_manager);
                shortcutsManager.editShortcut(id, name, url);
                element.querySelector("img").src = `https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${url}`;
                element.querySelector("legend").textContent = name;
                this.actions.closeMenu();
            },
            SaveChanges: async () => {
                const url = document.getElementById("SF_Top-url").value;
                const name = document.getElementById("SF_Top-name").value;
                if(!/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)){
                    this.errorAnimation(document.getElementById("SF_Top-url"));
                    return;
                } else if(name.length === 0 || name.length >= 15){
                    this.errorAnimation(document.getElementById("SF_Top-name"));
                    return;
                }
                if(this.mode === 1){
                    this.actions.applyEdit(this.currentShortcut.parentNode.dataset.shortcutid, name, url, this.currentShortcut);
                } else if(this.mode === 0){
                    const shortcutsManager = ((await import("./shortcutsManager.js")).shortcuts_manager);
                    shortcutsManager.creaetShortcut({name: name, url: url});
                    return this.actions.closeMenu();
                }
            }
        };
    };
    errorAnimation(target){
        const steps = [5, -10, 10, -10, 0];
        let step = 0;
        target.style.outline = "1px solid red";
        function anim(){
            target.style.transform = `translate(${steps[step]}px)`;
            step++;
            if(step === steps.length){
                clearInterval(timer);
                step = 0;
                return;
            }
        }
        let timer = setInterval(anim, 15);
    };
    openMenu({lang, mode, currentShortcut, title, URLplaceholder, NamePlaceholder}){
        const html = `
            <div id="shortcutFormContainer">
                <form id="shortcutForm">
                    <div id="SF_Top">
                        <h2>${title}</h2>
                        <input type="text" id="SF_Top-url" placeholder="${URLplaceholder}" autocomplete="off" tab-index="1" value="${(mode===0) ? "" : URLplaceholder}">
                        <input type="text" id="SF_Top-name" placeholder="${NamePlaceholder}" autocomplete="off" tab-index="2" value="${(mode===0) ? "" : NamePlaceholder}">
                    </div>
                    <div id="SF_Bottom">
                        <input type="button" class="button" style="width:49%" data-action="closeMenu" value="${lang.prompts.shortcuts.cancel}">
                        <input type="button" class="button" style="width:49%" data-action="SaveChanges" value="${lang.prompts.shortcuts.save}">
                    </div>
                </form>
            </div>`;
        const css = `
            <style id="shortcutFormStyle">
                #shortcutFormContainer {
                    background-color: rgba(0, 0, 0, 0.40);
                    display: flex;
                    position: absolute;
                    width: 100dvw;
                    height: 100dvh;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                    backdrop-filter: blur(var(--globalBlurValue));
                    font-family: var(--mainFontFamily);
                }
                #shortcutForm {
                    width: clamp(112px, 50dvw, 512px);
                    font-family: var(--mainFontFamily);
                }
                #SF_Top {
                    background-color: var(--mainUIColor);
                    color: var(--bottomContent-fontColour);
                    padding: clamp(4px, 2vw, 12px);
                    border-radius: var(--globalBorderRadius) var(--globalBorderRadius) 0 0;
                    display: flex;
                    flex-direction: column;
                }
                #SF_Top h2 {
                    text-align: center;
                    font-weight: 500;
                    font-size: clamp(0px, 3vw, 24px);
                }
                #SF_Top input[type="text"]{
                    position: relative;
                    background-color: var(--shortcuts-shortcutPromptInputBg);
                    margin-bottom: 6px;
                    padding: clamp(1px, 1vw, 10px) clamp(1px, 1vw, 15px);
                    border: var(--shortcuts-shortcutPromptInputBorder);
                    border-radius: var(--globalBorderRadius);
                    font-family: "Montserrat", sans-serif;
                    color: var(--main-content-font);
                    width: 80%;
                    align-self: center;
                    outline: none;
                    font-size: clamp(0px, 2vw, 12px);
                }
                #SF_Top input[type="text"]:hover {
                    border: var(--shortcuts-shortcutPromptInputHoverBorder);
                }
                #SF_Top input[type="text"]:focus {
                    outline: var(--shortcuts-shortcutPromptInputFocusOutline);
                    border: var(--shortcuts-shortcutPromptInputFocusBorder);
                }
                #SF_Bottom {
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    background-color: var(--seccondaryUIColor);
                    padding: clamp(4px, 2vw, 12px);
                    border-radius: 0 0 var(--globalBorderRadius) var(--globalBorderRadius);
                }
            </style>
        `;
        this.openedMenu = true;
        this.mode = mode;
        this.currentShortcut = currentShortcut;
        document.getElementById("root").insertAdjacentHTML("afterbegin", html);
        document.querySelector("head").insertAdjacentHTML("beforeend", css);
        document.getElementById("shortcutFormContainer").addEventListener("click", this.interactionsManager);
    }
}
function interactionsManager(e) {
    if(shortcutPrompt.actions[e.target.dataset.action]){
        shortcutPrompt.actions[e.target.dataset.action](e.target);
    }
};
export const shortcutPrompt = new SHORTCUT_PROMPT(interactionsManager)