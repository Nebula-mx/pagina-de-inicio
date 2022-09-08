import { getContent } from "../Helpers/Loader.js"
import { showNotification } from "../Helpers/showNotification.js"
import { config } from "./loadSettings.js"

const $weather = document.querySelector("[data-weatherState]")

export async function getWeather(mode) {
    if(mode === "auto") {
        showNotification("This may take a few minutes...", "We use High accuracy mode to get your position.")
        navigator.geolocation.getCurrentPosition((async (pos) => {
            let { latitude, longitude } = await pos.coords
            config.general.weather_city = `${await latitude} ${await longitude}`
            localStorage.setItem("settings", JSON.stringify(config))
        }), (() => {
            showNotification("We can't get you current position", "Try to use Manual Set option instead")
        }), {
            enableHighAccuracy: true,
            timeout: 120000
        })
    }
    getContent({
        url: `https://api.weatherapi.com/v1/current.json?key=b406c89026bf4209b5511231222906&q=${config.general.weather_city}&aqi=no`,
        successFn: async (json) => {
            let res = await json.json()
            $weather.textContent = `${res.current.temp_c}° At ${res.location.name}`
        },
        errorFn: (err) => {
            $weather.textContent = "weather is not availabe :("
            console.log(err)
        }
    })
    return
}
