import { getContent } from "../Helpers/Loader.js"
import { showNotification } from "../Helpers/showNotification.js"
import { sManager } from "./loadSettings.js"

const $temp = document.querySelector("[data-weatherState]"),
    $location = document.getElementById("weather-location");

export let weatherData;
export async function getWeather(mode) {
    if(mode === "auto") {
        showNotification("This may take a few minutes...", "We use High accuracy mode to get your position.")
        navigator.geolocation.getCurrentPosition((async (pos) => {
            let { latitude, longitude } = await pos.coords

            sManager.config.general.weather_city = `${await latitude} ${await longitude}`

            localStorage.setItem("settings", JSON.stringify(sManager.config))
            showNotification("New location was set!", "Your new location will be used to display the weather.")
            getWeather()
        }), (() => {
            showNotification("We can't get you current position", "Try to use Manual Set option instead")
        }), {
            enableHighAccuracy: true,
            timeout: 120000
        })
    }
    getContent({
        url: `https://api.weatherapi.com/v1/current.json?key=b406c89026bf4209b5511231222906&q=${sManager.config.general.weather_city}&aqi=no`,
        successFn: async (json) => {
            let res = await json.json()
            weatherData = res
            
            document.querySelector(".weatherImg").src = res.current.condition.icon
            $temp.textContent = `${res.current.temp_c}°`
            $location.textContent = `At ${res.location.name}`
        },
        errorFn: (err) => {
            $temp.textContent = "weather is not availabe"
            $temp.title = "Press CTRL + SHIFT + I, and then open the console to see where is the problem"
            $location.textContent = null
            console.log(err)
        }
    })
    return
}
