class CLOCK {
    constructor() {
        this.language = null;
        this.staticDate = new Date();
        this.previousDate = null;
        this.previousHour = null;
        this.dateFormats = null
        this.$clock = null;
        this.$date = null;
    }
    clock() {
        const hour = new Date()
        this.$clock = document.querySelector("#topContent #dateAndHour #hour");
        if(hour.getMinutes() === this.previousHour) return
        this.$clock.textContent = `${hour.getHours()}:${(hour.getMinutes().toString().length !== 1) ? hour.getMinutes()  : "0".concat(hour.getMinutes()) }`
        this.previousHour = hour.getMinutes()
    }
    date(config) {
        const date = new Date()
        this.staticDate = new Date();
        this.$date = document.querySelector("#topContent #dateAndHour #date");
        if(this.previousDate === this.staticDate.getDate()) return
        this.$date.textContent = this.dateFormats[config.appearance.dateFormat]
        this.previousDate = date.getDate()
    }
    startModule(settings, lang){
        this.language = lang;
        this.dateFormats = {
            "normalDate": `${this.staticDate.getDate()}/${this.staticDate.getMonth() +1}/${this.staticDate.getFullYear()}`,
            "fullDate": `${this.language.daysOfWeek[this.staticDate.getDay()]}, ${this.language.months[this.staticDate.getMonth()]} ${this.staticDate.getDate()} ${this.language.commonWords.of} ${this.staticDate.getFullYear()}`
        }
        setInterval(this.clock, 1000)
        setInterval(this.date(settings), 1000)
    }
}
export const clock = new CLOCK()