import { getContent } from "../Helpers/Loader.js"
import { showNotification } from "../Helpers/showNotification.js"
import { sManager } from "./loadSettings.js"

const $temp = document.querySelector("[data-weatherState]"),
    $location = document.getElementById("weather-location")
let $weatherPopUp = undefined,
    weatherInfo = null;
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
            weatherInfo = res
            
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
class weatherPopUp{
    constructor(){
        this.apliedStatus = false
        this.$root = document.getElementById("root")
        this.weatherPopPupContainer = null
        this.menuContent =`
            <span class="weatherPopUp">
                <svg id="closeWeatherPopUp" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="17.7886" y="5.28851" width="2.71964" height="17.6777" rx="1.35982" transform="rotate(45 17.7886 5.28851)" fill="black"/>
                    <rect x="19.7117" y="17.7885" width="2.71964" height="17.6777" rx="1.35982" transform="rotate(135 19.7117 17.7885)" fill="black"/>
                </svg>
                <legend id="wPopUp-cityName">Mexico city</legend>
                <div id="wPopUp-main">
                    <img id="wStatusImg" src="App/Assets/Images/weather 1.svg">
                    <p id="wCurrentTemp">5°</p>
                    <legend>c°</legend>
                </div>
                <div id="wPopUp-footer">
                    <div id="wPopUp-footer_mainData">
                        <p id="wPopUp-footer_mainData-FL">Feels like: 4°</p>
                        <p id="wPopUp-footer_mainData-HM">Humidity: 50</p>
                    </div>
                    <hr>
                    <div id="wPopUp-footer_secondaryData">
                        <p id="wPopUp-footer_secondaryData_condition">Condition:</p>
                        <legend id="wPopUp-footer_secondaryData_conditionStatus">cloudy</legend>
                    </div>
                </div>
            </span>
        `
    }
    openMenu(){
        if(weatherInfo === null) return showNotification("Can't display weather info", "An error was occurred while trying to get the weather")
        if(this.apliedStatus === true) return
        this.$root.insertAdjacentHTML("afterbegin", this.menuContent)
        this.weatherPopPupContainer = document.querySelector(".weatherPopUp")
        this.apliedStatus = true
        
        document.getElementById("wPopUp-cityName").textContent = weatherInfo.location.name
        document.getElementById("wCurrentTemp").textContent = weatherInfo.current.temp_c
        document.getElementById("wStatusImg").src = weatherInfo.current.condition.icon
        document.getElementById("wPopUp-footer_mainData-FL").textContent = `Feels like: ${weatherInfo.current.feelslike_c}°`
        document.getElementById("wPopUp-footer_mainData-HM").textContent = `Humidity: ${weatherInfo.current.humidity}`
        
        document.getElementById("wPopUp-footer_secondaryData_conditionStatus").textContent = weatherInfo.current.condition.text
    }
    closeMenu(){
        this.$root.removeChild(this.weatherPopPupContainer)
        this.apliedStatus = false
    }
}
export const wPopUp = new weatherPopUp()