import { sManager } from "../../settingsManager.js"
const lang = sManager.getValue("general", ["lang"]);
const language = (await import(`../lang/${lang}.js`)).default;

document.querySelector(".search-form").search.placeholder = `${language.search.searchUsing} ${sManager.getValue("general",["search_engine"])}`
export function Search(){
    const $form = document.querySelector(".search-form");

    (sManager.config.general.open_search_in_newTab === "true") 
        ? window.open(`${sManager.config.general.search_engine}${$form.search.value}`) 
        : location.href = `${sManager.config.general.search_engine}${$form.search.value}`;
}