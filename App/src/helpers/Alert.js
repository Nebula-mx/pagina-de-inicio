class ALERT {
    constructor(interactionsManager){
        this.interactionsManager = interactionsManager;
        this.lang = null;
        this.openedMenu = false;
        this.actions = {
            "close": () => {
                this.openedMenu = false;
                document.getElementById("promptStyle").outerHTML = null;
                document.getElementById("root").removeChild(document.getElementById("promptContainer"));
            },
            "validateAction": (target) => {
                console.log(target)
            }
        }
    };
    openMenu({lang, title, desc}){
        this.lang = lang;
        const html = `
            <div id="promptContainer">
                <form id="prompt">
                    <div id="prompt_Top">
                        <h2>${title}</h2>
                        <legend>${desc}</legend>
                    </div>
                    <div id="prompt_Bottom">
                        <input type="button" id="closePromt" data-action="validateAction" data-subaction="cancel" value="${lang.alerts.buttons.cancel}">
                        <input type="button" id="acceptPromt" data-action="validateAction" data-subaction="accept" value="${lang.alerts.buttons.okay}">
                    </div>
                </form>
            </div>`;
        const css = `
            <style id="promptStyle">
                #promptContainer {
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
                #prompt {
                    width: clamp(112px, 50dvw, 512px);
                    font-family: var(--mainFontFamily);
                }
                #prompt_Top {
                    background-color: var(--mainUIColor);
                    color: var(--bottomContent-fontColour);
                    padding: clamp(4px, 2vw, 12px);
                    border-radius: var(--globalBorderRadius) var(--globalBorderRadius) 0 0;
                    display: flex;
                    flex-direction: column;
                }
                #prompt_Top h2 {
                    text-align: center;
                    font-weight: 500;
                    font-size: clamp(0px, 3vw, 24px);
                }
                #prompt_Top legend {
                    text-align: center;
                    font-weight: 500;
                }
                #prompt_Bottom {
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    background-color: var(--seccondaryUIColor);
                    padding: clamp(4px, 2vw, 12px);
                    border-radius: 0 0 var(--globalBorderRadius) var(--globalBorderRadius);
                }
                #prompt_Bottom input[type="button"] {
                    width: 49%;
                    padding: clamp(1px, 1vw, 8px);
                    border-radius: var(--globalBorderRadius);
                    font-family: var(--mainFontFamily);
                    font-weight: 600;
                    background-color: var(--mainUIColor);
                    border: var(--shortcuts-shortcutPromptButtonsBorder);
                    cursor: pointer;
                    color: var(--bottomContent-fontColour);
                    font-size: clamp(0px, 2vw, 12px);
                }
                #prompt_Bottom input[type="button"]:hover {
                    background-color: var(--shortcuts-shortcutPromptButtonsHoverBg);
                }
                #prompt_Bottom input[type="button"]:active {
                    background-color: var(--shortcuts-shortcutPromptButtonsActiveBg);
                    border: var(--shortcuts-shortcutPromptButtonsActiveBorder);
                }
            </style>
        `;
        this.openedMenu = true;
        document.getElementById("root").insertAdjacentHTML("afterbegin", html);
        document.querySelector("head").insertAdjacentHTML("beforeend", css);
        return new Promise((resolve, reject) => {
            resolve(() => {
                document.getElementById("acceptPrompt").addEventListener("click", () => {
                    this.actions.close();
                    return {res: true}
                });
            });
            reject(() => document.getElementById("closePrompt").addEventListener("click", () => {
                this.actions.close();
                return {res: true}
            }));
        })
    };
};
function interactionsManager(e) {
    if(alert.actions[e.target.dataset.action]){
        alert.actions[e.target.dataset.action](e.target);
    }
};
export const alert = new ALERT(interactionsManager);