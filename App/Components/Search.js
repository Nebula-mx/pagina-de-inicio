import { sManager } from "./loadSettings.js";

export function Search(){
    const $form = document.querySelector(".search-form");

    (sManager.config.general.open_search_in_newTab === "true") 
        ? window.open(`${sManager.config.general.search_engine}${$form.search.value}`) 
        : location.href = `${sManager.config.general.search_engine}${$form.search.value}`;
}