import { config } from "./loadSettings.js"

export function Search(){
    const $form = document.querySelector(".search-form")

    window.open(`${config.general.search_engine}${$form.search.value}`)
}