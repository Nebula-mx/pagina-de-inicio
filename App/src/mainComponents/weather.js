import { getContent } from "../helpers/Loader.js"
import { showNotification } from "../helpers/showNotification.js"

class WEATHER {
    constructor(){
        this.$temp = document.getElementById("currentTemp");
        this.$location = document.getElementById("currentLocation");
        this.weatherData = null;
    }
    getPosition(config, lang) {
        showNotification(lang.notifications.info.gettingLocation.title, lang.notifications.info.gettingLocation.desc)
        navigator.geolocation.getCurrentPosition(async (pos) => {
            let {latitude, longitude} = await pos.coords

            config.saveSettings("general", ["weather_city"], `${await latitude} ${await longitude}`)
            showNotification(lang.notifications.info.newLocationSet.title, lang.notifications.info.newLocationSet.desc)
            this.getWeather(config.getValue("general", ["weather_city"]), lang)
        }, () => {
            showNotification(lang.notifications.errors.cannotGetPosition.title, lang.notifications.errors.cannotGetPosition.errors)
        }, {
            enableHighAccuracy: true,
            timeout: 120000
        })
    }
    getWeather(position, language){
        getContent({
            url: `https://api.weatherapi.com/v1/current.json?key=b406c89026bf4209b5511231222906&q=${position}&aqi=no`,
            successFn: async (json) => {
                let res = await json.json();
                this.weatherData = res;
                
                document.getElementById("weatherImg").src = res.current.condition.icon;
                this.$temp.textContent = `${res.current.temp_c}°`;
                this.$location.textContent = `${language.commonWords.at} ${res.location.name}`;
            },
            errorFn: (err) => {
                this.$temp.textContent = "weather is not availabe";
                this.$temp.title = "Press CTRL + SHIFT + I, and then open the console to see where is the problem";
                this.$location.textContent = null;
                console.log(err);
            }
        })
    }
    startModule({config, lang, mode}){
        if(config.getValue("appearance", ["mainPageItems", "weather", "activeModule"]) === false)  {document.querySelector("#topContent #weatherAndSettings #weather").style.display = "none"}
        if(mode === "auto") this.getPosition(config, lang)
        this.getWeather(config.getValue("general", ["weather_city"]), lang)
    }
}
export const weather = new WEATHER()