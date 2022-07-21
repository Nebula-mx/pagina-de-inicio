export function Clock(){
    const $clock = document.querySelector("[data-hour]"),
        $date = document.querySelector("[data-date]");

    let staticDate = new Date
    $date.textContent = staticDate.toLocaleDateString()

    const clock = (obj) => {
        const hour = new Date
        $clock.textContent = `${hour.getHours()}:${hour.getMinutes()}`
    }

    setInterval(clock, 1000)
    setInterval( ()=> {
        let date = new Date
        if(date.toLocaleDateString() !== staticDate.toLocaleDateString()) $date.textContent = date.toLocaleDateString()
    }, 1000)
}