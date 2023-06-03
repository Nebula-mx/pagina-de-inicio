import { sManager } from "../Components/loadSettings.js"

export default {
    "commonWords": {
        "default": "Default",
        "clean": "Clean",
        "of": "of",
        "at": "AT"
    },
    "daysOfWeek": {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    },
    "months": {
        0: "January",
        1: "February",
        2: "March",
        3: "Aplil",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    },
    "contextMenus": {
        "shortcuts": {
            "openInNewTab": "Open in new tab",
            "editShortcut": "Edit shortcut",
            "deleteShortcut": "Delete shortcut",
            "close": "Close"
        },
        "weather": {
            "feelsLike": "Feels like",
            "humidity": "Humidity",
            "condition": "Condition"
        }
    },
    "notifications": {
        "errors": {
            "corruptShortcuts": {
                "title": "Your shortcuts object was restored",
                "desc": "an error was ocurred while trying to get required values, check browser console to get more info"
            }
        },
        "info": {
            "livePreviewOn": {
                "title": "Live theme preview is enabled!",
                "desc": "if you refresh the app your changes will be lost!"
            }
        }
    },
    "alerts": {
        "themeEditorAlerts": {
            "title": "You have unsaved changes!",
            "desc": "If you close this menu, preview mode will be enabled, if you refresh the app the theme will be lost!"
        },
        "saveTheme": {
            "title": "Are you shure that you want to save your changes?",
            "desc": "This action will overwite your previous theme!"
        },
        "restoreTheme": {
            "title": "Do you want to restore your previous theme?",
            "desc": "By doing this all the changes you made will be restored!"
        }
    },
    "prompts": {
        "shortcuts": {
            "createTitle": "Create shortcut",
            "editTitle": "Edit shortcut",
            "urlPlaceHolder": "Insert page url...",
            "namePlaceHolder": "Type page name...",
            "cancel": "Cancel",
            "save": "Save & Exit"
        },
        "weather": {
            "title": "Write the name of your city",
            "desc": ""
        },
        "importSettings": {
            "title": "Import settings",
            "desc": "Paste your settings string"
        },
        "importShortcuts": {
            "title": "Import shortcuts",
            "desc": "Paste your shortcuts string"
        },
        "background": {
            "title": "Set custom background URL",
            "desc": "Paste the url of your background"
        }
    },
    "search": {
        "searchUsing": "Search using:"
    },
    
    "settings": {
        "title": "Settings",
        "general": {
            "title": "General",
            "categories": {
                "general": "General",
                "extra": "Extra",
                "resetAppValues": "Reset values",
            },
            "shortcutsLimit": {
                "legend": "Change shortcuts limit",
                "p": "This feature requieres reload."
            },
            "searchEngine": {
                "legend": "Search engine",
                "p": "Set you prefered search engine."
            },
            "searchInNewTab": {
                "legend": "Open every search on new tab",
                "p": "Make every search open on a new tab."
            },
            "weatherCity": {
                "legend": "Set weather location",
                "p": "Set your prefered lotation to display the weather.",
                "manualSetButton": "Manual set",
                "autoSetButton": "Auto set"
            },
            "appLanguage": {
                "legend": "App language",
                "p": "Set your prefered language to use (requieres reload)"
            },
            "exportSettings": {
                "legend": "Export settings",
                "p": "Export your settings to use them in other browser",
                "button": "Export"
            },
            "exportShortcuts": {
                "legend": "Export shortcuts",
                "p": "Export all your shortcuts to use them in other browser.",
                "button": "Export"
            },
            "importSettings": {
                "legend": "Import settigns",
                "p": "Import settings from other browser.",
                "button": "Import"
            },
            "importShortcuts": {
                "legend": "Import shortcuts",
                "p": "Import shortcuts from other browser.",
                "button":  "Import"
            },
            "resetSettings": {
                "legend": "Reset settings",
                "button": "Reset"
            },
            "deleteShortcuts": {
                "legend": "Delete all your shortcuts",
                "button": "Delete all"
            }
        },
        "appearance": {
            "title": "Appearance",
            "categories": {
                "appearance": "Appearance",
                "advancedOptions": "Advanced options"
            },
            "theme": {
                "legend": "Theme",
                "p": "Chose your prefered theme to use.",
                "select": {
                    "light": "Light",
                    "dark": "Dark",
                    "custom1": "Custom theme 1",
                    "custom2": "Custom theme 2"
                }
            },
            "backgrounds": {
                "legend": "Background:",
                "summary": "More backgrounds",
                "button": "Set custom background URL"
            },
            "blurStrenght": {
                "legend": "Blur streght",
                "p": "Set the strenght to you liking."
            },
            "relatedOptions": {
                "summary": "Related options",
                "content": {
                    "contextMenu": {
                        "legend": "Context menu opacity",
                        "p": "Make more opaque or transparent the shortcuts context menu"
                    },
                    "favouritesContent": {
                        "legend": "Change favourites content opacity",
                        "p": "Make more transparent or opaque the favourites container (this only affects to the background of the container)"
                    },
                    "weatherPopUp": {
                        "legend": "Change weather popUp opacity",
                        "p": "Make more transparent or opaque the weather popUp"
                    }
                }
            },
            "dateFormat": {
                "legend": "Date format",
                "p": "Select your favourite format (requires reload)",
                "select": {
                    "dmy": "D/M/Y",
                    "fulldate": "Day of week, day of month, month, year"
                }
            },
            "highlightTopContentItems": {
                "legend": "Highlight top content items",
                "p": "Add a semi transparent background to the top items"
            },
            "invertFontColour": {
                "legend": "Invert font colour top content items",
                "p": "If your background doesn't matches with the font colour, you can invert the colour"
            },
            "customTheme": {
                "legend": "Theme editor",
                "p": "You can create your own colour theme. You can only create 2 themes.",
                "button": "Let's go!"
            }
        },
        "about": {
            "title": "About",
            "categories": {
                "about": "About"
            },
            "missingFeatures": {
                "legend": "Missing features",
                "p": "This app still in development so features like Keyblinds and other features are not avalilable yet"
            },
            "whatsNew": {
                "legend": "What's new?",
                "list": `
                    <li>Now Spanish language is available! Thanks to Fabri by helping to this 💜</li>
                    <li>Recent colours are now working on the Colour picker</li>
                `
            },
            "currentSettings": {
                "legend": "Current settings:"
            },
            "appInfo": {
                "legend": "App info:",
                "version": `Version: ${sManager.getValue("general", "version")} <br> Developed by: <a href="https://github.com/Nebula-mx/" >Nebula_mx</a> <br> Made with 💜 from 🇲🇽  <br> Thanks to <a href="https://github.com/Fabrisdev">Fabri</a> by helping with the translation 💜`
            }
        }
    },
    "submenus": {
        "themeCreator": {
            "title": "Theme editor",
            "editorActions": {
                "p": "Selected theme:",
                "select": {
                    "customTheme1": "Custom theme 1",
                    "customTheme2": "Custom theme 2"
                },
                "buttons": {
                    "preview": "Preview",
                    "save": "Save",
                    "cancel": "Cancel"
                }
            },
            "previewAdvisorDefault": "You can use Live preview to see how beautiful is your theme!",
            "previewAdvisorActive": "Live preview is enabled!, your previous theme will be saved in case of you wan to restore your previous theme."
        }
    },
    "colourPicker": {
        "top": {
            "p": "Select colour",
            "buttons": {
                "cancel": "Cancel",
                "save": "Save"
            }
        },
        "recentSwatches": {
            "legend": "Recent colours"
        }
    }
}
