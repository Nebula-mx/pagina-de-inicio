import { clock } from "./dateAndHour.js";
import { settingsManager } from "../settingsManager.js";
import { shortcuts_manager } from "./shortcuts/shortcutsManager.js";
import { themeManager } from "./themes/themeManager.js";
import { weather } from "./weather.js";
import { interactions } from "./interactions.js";
import { search } from "./search.js";

const lang = settingsManager.getValue("general", ["lang"])
const language = (await import(`../lang/${lang}.js`)).default

class MAIN_VIEW {
    constructor() {
        this.config = settingsManager.getFullSettings();
    }
    loadComponents(){ 
        console.log(this.config);
        themeManager.startModule(this.config);
        weather.startModule({config: settingsManager, lang: language});
        clock.startModule(this.config, language);
        shortcuts_manager.testShortcutsStatus({shortcutsObj: JSON.parse(localStorage.getItem("shortcuts")), shortcutsLenght: parseInt(settingsManager.getValue("general", ["shortcuts_limit"])), lang: language});
        interactions.startModule(language, this.config);
        search.startModule({config: this.config, lang: language});
    }
}
export const mainView = new MAIN_VIEW();