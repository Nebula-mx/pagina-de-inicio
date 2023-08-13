class WINDOW_MANAGER {
    constructor(clickManager, windowMoveMouseDown){
        this.customStyle = document.getElementById("dynamic-style");
        this.$root = document.getElementById("root");
        this.clickManager = clickManager;
        this.windowMoveMouseDown = windowMoveMouseDown;
        this.apliedWindow = false;
        this.actions = {
            "closeMenu": () => {
                this.apliedWindow = false;
                this.customStyle.innerHTML = null;
                this.$root.querySelector("#window-titleBar").removeEventListener("mousedown", this.windowMoveMouseDown);
                this.$root.querySelector(".window").removeEventListener("click", this.clickManager);
                this.$root.removeChild(this.$root.querySelector(".window"));
                return
            }
        }
    }
    openWindow(Windowtitle, content, style){
        if(this.apliedWindow === true) return;
        let htmlContent = `
            <div class="window">
                <div id="window-titleBar">
                    <legend>${Windowtitle}</legend>
                    <div>
                        <button data-mode="closeMenu">Close</button>
                    </div>
                </div>
                <div id="window-content">
                    ${content}
                </div>
            </div>
        `
        this.apliedWindow = true
        this.customStyle.innerHTML = style
        this.$root.insertAdjacentHTML("afterbegin", htmlContent)
        this.$root.querySelector(".window").addEventListener("click", this.clickManager)
        this.$root.querySelector(".window #window-titleBar").addEventListener("mousedown", this.windowMoveMouseDown)
    }

}
function windowMoveMouseMove(e) {
    let window = document.querySelector(".window");
    let titleBar = document.getElementById("window-titleBar");
    window.style.top = `${e.pageY - (titleBar.offsetHeight / 2)}px`
    window.style.left = `${e.pageX - (titleBar.offsetWidth / 2)}px`
}
function windowMoveMouseUp(e) {
    document.getElementById("window-titleBar").removeEventListener("mouseup", windowMoveMouseUp)
    document.removeEventListener("mousemove", windowMoveMouseMove)
    document.getElementById("window-titleBar").addEventListener("mousedown", windowMoveMouseDown)
}
function windowMoveMouseDown(e) {
    document.getElementById("window-titleBar").addEventListener("mouseup", windowMoveMouseUp)
    document.addEventListener("mousemove", windowMoveMouseMove)
    document.getElementById("window-titleBar").removeEventListener("mousedown", windowMoveMouseDown)
}
function clicksListener(e) {
    if(createWindow.actions.hasOwnProperty(e.target.dataset.mode)){
        createWindow.actions[e.target.dataset.mode]()
    }
}
export let createWindow = new WINDOW_MANAGER(clicksListener, windowMoveMouseDown)