import { sManager } from "./loadSettings.js";

export function Clock(){
    let staticDate = new Date
    const dateData = {
        daysOfWeek: {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday"
        },
        months: {
            0: "January",
            1: "February",
            2: "March",
            3: "Aplil",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        }
    }
    const dateFormats = {
        "normalDate": `${staticDate.getDate()}/${staticDate.getMonth()}/${staticDate.getFullYear()}`,
        "fullDate": `${dateData.daysOfWeek[staticDate.getDay()]}, ${dateData.months[staticDate.getMonth()]} ${staticDate.getDate()} of ${staticDate.getFullYear()}`
    }
    const $clock = document.querySelector("[data-hour]"),
        $date = document.querySelector("[data-date]");
    const clock = () => {
        const hour = new Date()
        $clock.textContent = `${hour.getHours()}:${(hour.getMinutes().toString().length !== 1) ? hour.getMinutes()  : "0".concat(hour.getMinutes()) } `
    }

    setInterval(clock, 1000)
    setInterval( ()=> {
        let date = new Date
        $date.textContent = dateFormats[sManager.getValue("appearance", "dateFormat")]
    }, 1000)
}