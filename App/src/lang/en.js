import { settingsManager } from "../settingsManager.js"

export default {
    "commonWords": {
        "default": "Default",
        "clean": "Clean",
        "of": "of",
        "at": "AT",
        "editElement": "Edit element",
        "close": "Close"
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
            },
            "cannotGetWeather": {
                "title": "Can't get weather info",
                "desc": "there was a problem while trying to get the weather."
            },
            "cannotGetPosition": {
                "title": "Cannot get your position",
                "desc": "There was a problem while trying to get your position, use manual set instead"
            }
        },
        "info": {
            "livePreviewOn": {
                "title": "Live theme preview is enabled!",
                "desc": "if you refresh the app your changes will be lost!"
            },
            "gettingLocation": {
                "title": "Getting your current location",
                "desc": "This may take some minutes."
            },
            "newLocationSet": {
                "title": "Your new location has set",
                "desc": "The new weather location has set succesfully."
            }
        }
    },
    "alerts": {
        "deleteShortcuts": {
            "title": "Want to delete this shortcut?",
            "desc": "This action can not be undone"
        },
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
                "advancedOptions": {
                    "title": "Advanced options",
                    "editRootContent": "Edit main content"
                }
            },
            "commonWords": {
                "DisplayOptions": "Display options",
                "editElement": "Edit element",
                "activeModule": "Active module",
                "fontSize": "Font size",
                "fontFamily": "Font family",
                "order": "Order"
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
                "legend": "Background settings",
                "p": "Change the background",
                "button": "Options",
                "submenu": {
                    "title": "Background",
                    "bgImages": "Images",
                    "bgImagesButton": "Use custom URL",
                    "bgColours": "Colours",
                    "bgColoursButton": "Use custom colour"
                }
            },
            "bgBlur": {
              "legend": "Background blur",
              "p": "Chose the intensity of the blur in your background"      
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
                "p": "Select your favourite format.",
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
            },
            "displayRatio": {
                "legend": "Content display ratio",
                "p": "Chose the ratio of the top and bottom content"
            },
            "weatherOptions": {
                "title": "Weather information",
                "desc": "Change the way the weather is shown.",
                "activeModuleDesc": "By turning off this module the element will be removed.",
                "icon": {
                    "legend": "Show status icon",
                    "p": "Show or hide the weather status icon."
                },
                "temp": {
                    "legend": "Show temperature",
                    "p": "Show or hide the current temperature."
                },
                "location": {
                    "legend": "Show location",
                    "p": "Show or hide the location you've set"
                }
            },
            "sOpenerOptions": {
                "title": "Settings acces buttons",
                "desc": "Change the way they are shown.",
                "settingsText": {
                    "legend": 'Show the "Settings" string.',
                    "p": 'Show or hide the "Settings" string.'
                },
                "settingsIcon": {
                    "legend": "Show icon",
                    "p": 'Show or hide the Settings icon. At least one element needs to be displayed necessarily ("Settings" string or Settings icon)',
                    "size": "Size"
                }
            },
            "dateAndHourOptions": {
                "title": "Date & Hour",
                "desc": "Change the way they are shown.",
                "p": "By turning off the module, the elements will be removed.",
                "general": {
                    "legend": "Orientation",
                    "p": "Chose between a vertical or horizontal orientation.",
                    "itemsMargin": "Items margin",
                    "alignItems": "Align items"
                },
                "hour": {
                    "legend": "Display hour",
                    "p": "Show or hide the hour."
                },
                "date": {
                    "legend": "Display date",
                    "p": "Show or hide the date."
                }
            },
            "mainContent": {
                "title": "Bottom content",
                "desc": "Edit the content container, search bar and shortcuts.",
                "container": {
                    "catTitle": "Container",
                    "legend": "Display container",
                    "p": "Show or hide the container",
                    "opacity": "Opacity",
                    "paddingTop": "Padding top",
                    "backdropBlur": "Background blur"
                },
                "searchBar": {
                    "catTitle": "Search bar",
                    "legend": "Show the search bar",
                    "p": "By turning off this, the bar will be hidden",
                    "barWidth": "Width",
                    "barHeight": "Height",
                    "barPadding": "Padding",
                    "iconSize": "Icon size"
                },
                "shortcutsIcons": {
                    "catTitle": "Shorcut icons",
                    "legend": "Show shortcut icons",
                    "p": "By this turning off, the icons (images) will be hidden",
                    "iconWidth": "Width",
                    "iconHeight": "Height",
                },
                "shortcutsTitles": {
                    "catTitle": "Shortcuts names",
                    "legend": "Show names",
                    "p": "Show or hidde the shortcuts names",
                    "margin": "Margin"
                }
            }
        },
        "about": {
            "title": "About",
            "categories": {
                "about": "About"
            },
            "missingFeatures": {
                "legend": "Missing features",
                "p": "This app still in development so features like keybinds, a better personalization and other features are currently in development."
            },
            "whatsNew": {
                "legend": `What's new? v.${settingsManager.getValue("general", ["version"])}`,
                "list": `
                    <li>Now there is a new Backgrounds section to have a better customization.</li>
                    <li>Some fixes to the colour selector (it doesn't works on mobile, it will be fixed soon.)</li>
                    <li>The app performance has been improved.</li>
                `
            },
            "appInfo": {
                "legend": "App info",
                "version": `Version: ${settingsManager.getValue("general", ["version"])} <br> Made by: <a href="https://github.com/Nebula-mx/" >Nebula_mx</a> <br> Made with 💜 in 🇲🇽 <br> Thanks to <a href="https://github.com/Fabrisdev">Fabri</a> by helping with the translations 💜`
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
            "previewAdvisorActive": "Live preview is enabled!, your previous theme will be saved in case of you wan to restore your previous theme.",
            "betaStatusAlert": 'This feature still in a beta status! some bugs will be fixed in the next update, please, if you can see a bug while using this feature make a report on the <a href="https://github.com/Nebula-mx/pagina-de-inicio" target="_blank">project Github repo</a>'
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
