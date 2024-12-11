import { search } from "./search.js";
import { contextMenu } from "./shortcuts/contextMenu.js";
import { openWeatherPopup } from "./weatherPopup.js";
class INTERACTIONS {
    constructor(clicksManager){
        this.lang = null;
        this.config = null;
        this.clicksManager = clicksManager;
        this.actions = {
          1: (e) => {
            location.href = e.target.dataset.url;
          },
          2: (e) => {
            contextMenu.insertMenu(e.target, this.lang)
          },
          3: async () => {
            document.getElementById("root").style.cursor = "progress";
            let shortcutPrompt = (await import("./shortcuts/editShortcutPrompt.js")).shortcutPrompt;
            document.getElementById("root").style.cursor = "auto";
            shortcutPrompt.openMenu({lang: this.lang ,mode: 0, currentShortcut: null, title: this.lang.prompts.shortcuts.createTitle, URLplaceholder: this.lang.prompts.shortcuts.urlPlaceHolder, NamePlaceholder: this.lang.prompts.shortcuts.namePlaceHolder})
          },
          4: () => {
            let searchBox = document.getElementById("searchBox").children[0];
            let value = searchBox.value;
            search.searchAction(value);   
          },
          5: (e) => {
            openWeatherPopup({config: this.config, lang: this.lang, event: e})
          },
          6: async(e) => {
            document.getElementById("root").style.cursor = "progress";
            let settingsMenu = (await import("./settingsMenu.js"));
            document.getElementById("root").style.cursor = "auto";
            settingsMenu.openMenu({lang: this.lang, config: this.config})
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
        interactions.actions[parseInt(e.target.dataset.action)](e)
    }
};
export const interactions = new INTERACTIONS(clicksManager);