import { showNotification } from "../../helpers/showNotification.js";

class SHORTCUTS_MANAGER {
    constructor(){
        this.shortcuts = null;
        this.shortcutsLenght = null;
        this.shortcutsContainer = document.getElementById("shortcutsList")
        this.apliedShortcuts = false;
        this.lang = null;
    }
    loadShortcuts(){
        if(this.apliedShortcuts === true){
            const createChortcutBtn = document.getElementById("addShortcut").outerHTML;
            document.getElementById("shortcutsList").innerHTML = createChortcutBtn;
            this.apliedShortcuts = false;
        }
        let $fragment = document.createDocumentFragment();
        for(let i = this.shortcuts.length-1; i >= 0; i--){
            let el = this.shortcuts[i];
            let $container = document.createElement("li");
            let $sBody = document.createElement("div");
            let $contextMenuContainer = document.createElement("div");
            let $contextMenuBtn = document.createElement("input");
            let $img = document.createElement("img");
            let $legend = document.createElement("legend");
            
            $sBody.classList.add("shortcutBody");
            $container.setAttribute("data-shortcutid", el.id);
            $contextMenuBtn.type = "image";
            $contextMenuBtn.src = "App/Assets/Images/icons/more.svg";
            $contextMenuBtn.setAttribute("data-action", 2)
            $contextMenuContainer.classList.add("contextMenuContainer");
            $contextMenuContainer.append($contextMenuBtn);
            $img.setAttribute("src", `https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${el.url}`);
            $img.setAttribute("data-url", el.url);
            $img.setAttribute("data-action", 1);
            $legend.setAttribute("data-url", el.url);
            $legend.textContent = `${el.title}`;
            $legend.setAttribute("data-action", 1);
            $sBody.append($img);
            $sBody.append($legend);
            $container.append($contextMenuContainer);
            $container.append($sBody);

            $fragment.append($container);
        };
        if(this.shortcuts.length >= this.shortcutsLenght){
            let newShortcutsArr = JSON.parse(localStorage.getItem("shortcuts"));
            if(newShortcutsArr === null) return;
            let sLimit = this.shortcutsLenght;
            let sLenght = newShortcutsArr.length;
            document.getElementById("addShortcut").style.display = "none";
            
            while(sLenght > sLimit){
                sLenght--;
                newShortcutsArr.pop();
                $fragment.removeChild($fragment.children[sLenght])
            }
            this.shortcuts = newShortcutsArr;
            localStorage.shortcuts = JSON.stringify(newShortcutsArr);
        };
        document.getElementById("shortcutsList").append($fragment);
        this.apliedShortcuts = true;
    };
    testShortcutsStatus({shortcutsObj , shortcutsLenght, lang}){
        this.shortcuts = shortcutsObj;
        this.shortcutsLenght = shortcutsLenght;
        this.lang = lang;

        if(!this.shortcuts) {
            localStorage.setItem("shortcuts", "[]")
            this.shortcuts = [];
        };
        try {
            if(localStorage.getItem("shortcuts") === "null" || !JSON.parse(localStorage.getItem("shortcuts")) instanceof Array) throw new Error("The shortcuts object format is not valid")
            this.shortcuts = JSON.parse(localStorage.getItem("shortcuts"))
            this.loadShortcuts();
        } catch(error) {
            console.log(error)
            if(error === "The shortcuts object format is not valid"){
                showNotification(lang.notifications.errors.corruptShortcuts.title, lang.notifications.errors.corruptShortcuts.desc)
                localStorage.setItem("shortcuts", "[]")
                this.shortcuts = [];
            };
        };
    };
    creaetShortcut({name, url}){
        console.log(this.shortcuts)
        console.log(name, url)
        this.shortcuts.push({
            id: this.shortcuts.length,
            title: name,
            url: url
        })
        localStorage.setItem("shortcuts", JSON.stringify(this.shortcuts))
        this.testShortcutsStatus({shortcutsObj: this.shortcuts, shortcutsLenght: this.shortcutsLenght, lang: this.lang})
    }
    deleteShortcut(target){
        this.shortcuts.splice(parseInt(target.dataset.shortcutid), 1);
        this.shortcutsContainer.removeChild(target);
        
        document.querySelectorAll("[data-shortcutid]").forEach((node, i) => {
            node.setAttribute("data-shortcutid", i);
            this.shortcuts[i].id = i;
        });
        
        localStorage.setItem("shortcuts", JSON.stringify(this.shortcuts));
        localStorage.setItem("shortcutsNumber", this.shortcutsLenght);
        if(document.getElementById("addShortcut").getAttribute("style") === "display: none;" && this.shortcuts.length < this.shortcutsLenght) document.getElementById("addShortcut").style.display = "block";
    };
    editShortcut(id, name, url){
        this.shortcuts[id].title = name;
        this.shortcuts[id].url = url;
        localStorage.setItem("shortcuts", JSON.stringify(this.shortcuts));
    };
};

export const shortcuts_manager = new SHORTCUTS_MANAGER()