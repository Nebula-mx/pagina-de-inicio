export function Search(){
    const $form = document.querySelector(".search-form")

    window.open(`http://google.com/search?q=${$form.search.value}`)
}