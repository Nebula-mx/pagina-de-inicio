import { contextMenu } from "./shortcuts/contextMenu.js";
class INTERACTIONS {
    constructor(clicksManager){
        this.lang = null;
        this.config = null;
        this.clicksManager = clicksManager;
        this.actions = {
            1: (target) => {
                location.href = target.dataset.url;
            },
            2: (target) => {
                contextMenu.insertMenu(target, this.lang)
            },
            3: async (target) => {
                document.getElementById("root").style.cursor = "progress";
                let shortcutPrompt = (await import("./shortcuts/editShortcutPrompt.js")).shortcutPrompt;
                document.getElementById("root").style.cursor = "auto";
                shortcutPrompt.openMenu({lang: this.lang ,mode: 0, currentShortcut: null, title: this.lang.prompts.shortcuts.createTitle, URLplaceholder: this.lang.prompts.shortcuts.urlPlaceHolder, NamePlaceholder: this.lang.prompts.shortcuts.namePlaceHolder})
            },
            4: (target) => {
                let searchBox = document.getElementById("searchBox").children[0];
                let value = searchBox.value;
                console.log(value);
                window.location.assign(this.config.general.search_engine.baseURL + `${value}`);
            }
        }
    };
    startModule(lang, config){
        document.addEventListener("click", this.clicksManager)
        this.lang = lang;
        this.config = config;
    }
};
function clicksManager(e){
    console.log(e.target.dataset)
    e.preventDefault();
    if(interactions.actions[parseInt(e.target.dataset.action)]){
        interactions.actions[parseInt(e.target.dataset.action)](e.target)
    }
};
export const interactions = new INTERACTIONS(clicksManager);