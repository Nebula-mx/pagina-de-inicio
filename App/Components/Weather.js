import { getContent } from "../Helpers/Loader.js"
import { config } from "./loadSettings.js"

const $weather = document.querySelector("[data-weatherState]")
export async function getWeather(){
    getContent({
        url: `https://api.weatherapi.com/v1/current.json?key=b406c89026bf4209b5511231222906&q=${config.general.weather_city}&aqi=no`,
        successFn: async(json) => {
            // console.log(json)
            let res = await json.json()
            $weather.textContent = `${res.current.temp_c}° At ${res.location.name}`
        },
        errorFn: (err) => {
            $weather.textContent = "weather is not availabe :("
            console.log(err)
        }
    })
}
