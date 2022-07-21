import { getContent } from "../Helpers/Loader.js"

const $weather = document.querySelector("[data-weatherState]")
export async function getWeather(){
    getContent({
        url: "http://api.weatherapi.com/v1/current.json?key=b406c89026bf4209b5511231222906&q=Mexico City&aqi=no",
        fetchOptions: {
            method: "GET"
        },
        successFn: async(json) => {
            // console.log(json)
            let res = await json.json()
            $weather.textContent = `${res.current.temp_c}° At ${res.location.name}`
        },
        errorFn: (err) => {
            console.log(err)
        }
    })
}