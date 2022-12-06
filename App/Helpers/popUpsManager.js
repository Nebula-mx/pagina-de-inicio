import { weatherData } from "../Components/Weather.js"

const popUpsElements = {
  "shortcutsContextMenu": {
    requiredExternalData: false,
    id: ".context-menu",
    html:  `
      <span class="context-menu">
        <ul id="context-menu_content">
           <li id="context-menu_newTab">Open in new tab</li>
            <li id="context-menu_editBtn">Edit shortcut</li>
            <li id="context-menu_deleteBtn">Delete shortcut</li>
        </ul>
        <hr>
        <ul>
          <li id="context-menu_closeBtn">Close</li>
        </ul>
      </span>
    `
  },
  "weatherPopUp": {
    requiredExternalData: true,
    id: ".weatherPopUp",
    html: `
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
    `,
    fetchData: () => {
      document.getElementById("wPopUp-cityName").textContent = weatherData.location.name
      document.getElementById("wStatusImg").src = weatherData.current.condition.icon
      document.getElementById("wCurrentTemp").textContent = `${weatherData.current.temp_c}°`
      document.getElementById("wPopUp-footer_mainData-FL").textContent = `Feels like: ${weatherData.current.feelslike_c}°`
      document.getElementById("wPopUp-footer_mainData-HM").textContent = `Humidity: ${weatherData.current.humidity}`
      document.getElementById("wPopUp-footer_secondaryData_conditionStatus").textContent = weatherData.current.condition.text
    }
  }
}
class POPUPS_MANAGER {
  constructor(){
    this.typeOfMenu
    this.menuContent
    this.menuStyle
    this.target
    this.currentTarget
    this.apliedMenuStaus
    this.menuContainer
  }
  showPopUp(menu, target){
    if(this.apliedMenuStatus === true) return
    this.typeOfMenu = menu;
    this.menuContent = popUpsElements[this.typeOfMenu].html;
    this.target = target
    this.currentTarget = target
    
    this.target.insertAdjacentHTML("afterbegin", this.menuContent)
    this.apliedMenuStatus = true
    
    document.addEventListener("click", clicksListener)
    if(popUpsElements[this.typeOfMenu].requiredExternalData === true) return popUpsElements[this.typeOfMenu].fetchData()
  }
  closePopUp(target, mode){
    this.currentTarget = target
    document.removeEventListener("click", clicksListener)
    if(mode === "close&open" && this.target !== this.currentTarget) {
      this.target.removeChild(document.querySelector(popUpsElements[this.typeOfMenu].id))
      this.apliedMenuStatus = false

      this.target = this.currentTarget
      return this.showPopUp("shortcutsContextMenu", this.currentTarget, this.currentTarget.parentNode)
    }
    this.target.removeChild(document.querySelector(popUpsElements[this.typeOfMenu].id))
    this.apliedMenuStatus = false
  }
}
export const popUpsManager = new POPUPS_MANAGER
const clicksListener = (e) => {
  const scenarios = {
    "context-menu_closeBtn": () => popUpsManager.closePopUp(),
    "edit-btn": (e) => popUpsManager.closePopUp(e.parentNode, "close&open")
  }
  if (scenarios.hasOwnProperty(e.target.id)) {scenarios[e.target.id](e.target)} else{popUpsManager.closePopUp()}
}