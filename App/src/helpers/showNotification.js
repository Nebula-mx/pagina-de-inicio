let apliedContent = false;
let $root = document.getElementById("root");
const css = `
    <style class="notificationStyle">
        .notification {
            display: flex;
            position: absolute;
            background-color: var(--mainUIColor);
            flex-direction: column;
            justify-content: center;
            justify-self: center;
            padding: var(--notification-Padding);
            border-radius: var(--globalBorderRadius);
            z-index: 10;
            border: var(--notification-Border);
            color: var(--bottomContent-fontColour);
            opacity: 0;
            animation: notiAppear 5.3s;
        }
        .notification legend {
            font-size: var(--notification-legendFontSize);
            font-weight: 500;
            text-align: center;
        }
        .notification p {
            text-align: center;
            opacity: 80%;
            font-size: var(--notification-pFontSize);
        }
        
        @keyframes notiAppear {
            0% {
                opacity: 1%;
                transform: translateY(0px);
                scale: 98%;
            }
            4%{
                transform: translateY(40px);
            }
            8% {
                transform: translateY(20px);
                opacity: 100%;
                scale: 100%;
            }
            95%{
                opacity: 100%;
                scale: 100%;
                }
            100%{
                opacity: 0;
                transform: translateY(20px);
                scale: 98%;
            }
        }
    </style>`;
function removeNotification(){
    try {
        $root.removeChild($root.querySelector(".notification"));
        document.querySelector(".notificationStyle").outerHTML = null;
        apliedContent = false;
    } catch (error) {
        return
    }
}
export function showNotification(title, desc) {
    if(apliedContent === true) {
        clearTimeout(removeNotification);
        $root.removeChild($root.querySelector(".notification"));
        document.querySelector(".notificationStyle").outerHTML = null;
        apliedContent = false;
        return;
    }
    let html = `
        <span class="notification">
            <legend id="notification-title">${title}</legend>
            <p id="notification-desc">${desc}</p>
        </span>
    `;
    apliedContent = true;
    document.querySelector("head").insertAdjacentHTML("beforeend", css);
    $root.insertAdjacentHTML("afterbegin", html);
    return setTimeout(removeNotification, 5300);
}