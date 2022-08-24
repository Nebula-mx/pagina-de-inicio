import { getContent } from "../Helpers/Loader.js"
import { config } from "./loadSettings.js"

const $weather = document.querySelector("[data-weatherState]")

export async function getWeather() {
    //discarted because of performance

    // if(mode === "auto") {
    //     navigator.geolocation.getCurrentPosition((async (pos) => {
    //         console.log(pos)
    //         let { latitude, longitude } = await pos.coords

    //         config.general.weather_city = `${latitude} ${longitude}`
    //         localStorage.setItem("settings", JSON.stringify(config))
    //     }))
    // }
    getContent({
        url: `http://api.weatherapi.com/v1/current.json?key=b406c89026bf4209b5511231222906&q=${config.general.weather_city}&aqi=no`,
        successFn: async (json) => {
            let res = await json.json()
            $weather.textContent = `${res.current.temp_c}° At ${res.location.name}`
        },
        errorFn: (err) => {
            $weather.textContent = "weather is not availabe :("
            console.log(err)
        }
    })
}
