export function errorAnimShake(element) {
    let i = 0
    let movements = ["-5px", "10px", "-10px", "0px"]
    element.style.borderColor = "rgb(255, 74, 74)"
    let interval = setInterval(() => {
        element.style.transform = `translate(${movements[i]})`
        i++
        if(i >= movements.length) clearInterval(interval)
    } ,15)
}