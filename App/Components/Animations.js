export function errorAnimShake(element ,move , timePerFrame) {
    element.style.borderColor = "rgb(255, 74, 74)"
    let i = 0
    let interval = setInterval(() => {
        element.style.transform = `translate(${move[i]})`
        i++
        if(i >= move.length) clearInterval(interval)
    }, timePerFrame)
}