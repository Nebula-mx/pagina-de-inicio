import { sManager } from "../../settingsManager.js"
const lang = sManager.getValue("general", ["lang"]);
const language = (await import(`../lang/${lang}.js`)).default;

export function Clock(){
    let previousHour,
        previousDate,
        staticDate = new Date;
        
    const dateFormats = {
        "normalDate": `${staticDate.getDate()}/${staticDate.getMonth() +1}/${staticDate.getFullYear()}`,
        "fullDate": `${language.daysOfWeek[staticDate.getDay()]}, ${language.months[staticDate.getMonth()]} ${staticDate.getDate()} ${language.commonWords.of} ${staticDate.getFullYear()}`
    }
    const $clock = document.querySelector("[data-hour]"),
        $date = document.querySelector("[data-date]");
    const clock = () => {
        const hour = new Date()
        if(hour.getMinutes() === previousHour) return
        $clock.textContent = `${hour.getHours()}:${(hour.getMinutes().toString().length !== 1) ? hour.getMinutes()  : "0".concat(hour.getMinutes()) }`
        previousHour = hour.getMinutes()
    }

    if(sManager.getValue("appearance", ["mainPageItems", "dateAndHour", "displayOn"]) !== false) {
        setInterval(clock, 1000)
        setInterval( ()=> {
            let date = new Date()
            if(previousDate === staticDate.getDate()) return
            $date.textContent = dateFormats[sManager.getValue("appearance", ["dateFormat"])]
            previousDate = date.getDate()
        }, 1000)
    }
}