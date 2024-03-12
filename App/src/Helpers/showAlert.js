// import { openedMenu } from "../Views/SettingsMenu.js"

// function closeAlert(hideTopBg){
//     if(hideTopBg === true) document.querySelector(".top-bg").style.display = "none"
//     document.querySelector(".top-bg").style.zIndex = 10
//     document.getElementById("root").removeChild(document.querySelector(".alert"))
//     if (openedMenu === false) document.querySelector(".top-bg").style.display = "none"
// }
// export function showAlert(title, desc, obj = null, hideTopBg = false){
//     const HTML = `
//          <span class="alert">
//             <div id="alert-topContent">
//                 <legend id="alert-title">${title}</legend>
//                 <p id="alert-desc">${desc}</p>
//             </div>
//             <div id="alert-actions">
//                 <button id="rejectAlert">Cancel</button>
//                 <button id="succesAlert">Ok</button>
//             </div>
//         </span>
//     `
//     document.getElementById("root").insertAdjacentHTML("afterbegin", HTML)
//     document.querySelector(".top-bg").style.display = "block"
//     document.querySelector(".top-bg").style.zIndex = 12    
    
//     return new Promise((resolve, reject) => {
//         document.getElementById("succesAlert").onclick = () => {
//             closeAlert(hideTopBg)
//             resolve({
//                 value:true,
//                 obj
//             })
//         }
//         document.getElementById("rejectAlert").onclick = () => {
//             closeAlert(true)
//             reject ({
//                 value:false,
//                 obj
//             })
//         }
//     })
// }