import { shortcuts_manager } from "./shortcutsManager.js";

class CONTEXT_MENU {
  constructor(INTERACTIONS_MANAGER) {
    this.lang = null;
    this.interactionsManager = INTERACTIONS_MANAGER;
    this.style = null;
    this.html = null;
    this.openedMenu = false;
    this.currentParent = null;
    this.actions = {
      openInNewTab: (parentElement) => {
        window.open(
          parentElement.parentNode.querySelector("[data-url]").dataset.url,
        );
        this.actions.closeMenu(parentElement, target);
      },
      editShortcut: async (parentElement) => {
        this.actions.closeMenu(parentElement);
        const currentShortcut =
          parentElement.parentNode.querySelector(".shortcutBody");
        const currentShortcutURL =
          currentShortcut.querySelector("legend").dataset.url;
        const currentShortcutName =
          currentShortcut.querySelector("legend").textContent;
        document.getElementById("root").style.cursor = "progress";
        let shortcutPrompt = (await import("./editShortcutPrompt.js"))
          .shortcutPrompt;
        document.getElementById("root").style.cursor = "auto";
        shortcutPrompt.openMenu({
          lang: this.lang,
          mode: 1,
          currentShortcut: currentShortcut,
          title: this.lang.prompts.shortcuts.editTitle,
          URLplaceholder: currentShortcutURL,
          NamePlaceholder: currentShortcutName,
        });
      },
      deleteShortcut: async (parentElement, target) => {
        shortcuts_manager.deleteShortcut(parentElement.parentNode);
        this.actions.closeMenu(parentElement);
      },
      closeMenu: (parentElement) => {
        document.removeEventListener("click", this.interactionsManager);
        parentElement.removeChild(document.getElementById("contextMenu"));
        document.getElementById("contextMenuStyle").outerHTML = null;
        this.openedMenu = false;
      },
    };
  }
  insertMenu(container, lang) {
    this.lang = lang;
    if (this.openedMenu === true) {
      this.currentParent.parentNode.removeChild(
        document.getElementById("contextMenu"),
      );
      this.openedMenu = false;
    }
    this.style = `
            #contextMenu {
                position: absolute;
                background-color: var(--bottomContent-bg);
                padding: 18px;
                width: max-content;
                z-index: 5;
                border-radius: var(--globalBorderRadius);
                backdrop-filter: blur(var(--globalBlurValue));
                border: var(--shortcuts-contextMenuBorder);
            }
            #contextMenu > ul {
                list-style: none;
                padding: 0;
            }
            #contextMenu ul > li {
                padding: 5px;
                font-size: clamp(0px, 4vw, 16px);
                border-radius: --var(--globalBorderRadius);
            }
            #contextMenu ul > li:hover {
                background-color: var(--shortcuts-contextMenuHover);
            }
        `;
    this.html = `
            <div id="contextMenu">
                <ul>
                    <li data-action="openInNewTab" >${this.lang.contextMenus.shortcuts.openInNewTab}</li>
                    <li data-action="editShortcut" >${this.lang.contextMenus.shortcuts.editShortcut}</li>
                    <li data-action="deleteShortcut">${this.lang.contextMenus.shortcuts.deleteShortcut}</li>
                    <hr>
                    <li data-action="closeMenu">${this.lang.contextMenus.shortcuts.close}</li>
                </ul>
            </div>
        `;
    this.currentParent = container;
    this.shortcutsList = this.currentParent.parentNode.parentNode.parentNode;
    let shortcutsRect = this.shortcutsList.getBoundingClientRect();
    container.parentNode.insertAdjacentHTML("afterbegin", this.html);
    document
      .querySelector("head")
      .insertAdjacentHTML(
        "beforeend",
        `<style id="contextMenuStyle">${this.style}</style>`,
      );
    const element = document.getElementById("contextMenu");
    const elementRect = element.getBoundingClientRect();
    let yTranslate = 0;
    let xTranslate = elementRect.width * 0.1;
    if ((this.shortcutsList.clientHeight - elementRect.bottom) < elementRect.height*0.1) {
      yTranslate = elementRect.height * 0.1;
    }
    if ((this.shortcutsList.offsetWidth - elementRect.left) < elementRect.width) {
      xTranslate = -elementRect.width;
    }

    element.style.transform = `translate(${xTranslate}px, -${yTranslate}px)`;
    document.addEventListener("click", this.interactionsManager);
    this.openedMenu = true;
  }
}
function interactionsManager(e) {
  if (contextMenu.actions[e.target.dataset.action]) {
    contextMenu.actions[e.target.dataset.action](
      e.target.parentNode.parentNode.parentNode,
      e.target,
    );
  } else {
    if (e.target.dataset.action === "2") return;
    contextMenu.actions.closeMenu(
      document.getElementById("contextMenu").parentNode,
    );
  }
}
export const contextMenu = new CONTEXT_MENU(interactionsManager);
