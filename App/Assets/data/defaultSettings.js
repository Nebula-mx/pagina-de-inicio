export let defaultSettings = {
    "general": {
        "shortcuts_limit": 8,
        "search_engine": "https://www.google.com/search?q=",
        "open_search_in_newTab": "false",
        "weather_city": "Mexico-City",
        "lang": "en",
        "version": "0.9.6"
    },
    "appearance": {
        "theme": "light",
        "background": "App/Assets/Images/Backgrounds/1.webp",
        "backgroundBlur": 0,
        "blur": 8,
        "shortcutsPopUpOpacity": 89,
        "weatherPopUpOpacity": 85,
        "mainContentBgOpacity": 65,
        "dateFormat": "normalDate",
        "top_itemsBg": "false",
        "invert_top_items_colour": "true",
        "mainPageItems": {
            contentRatio: {
                id: "main",
                topPercentaje: 45  
            },
            weather: {
              id: "#weather",
              activeModule: true,
              fontFamily: "Montserrat",
              fontSize: 16,
              icon: {
                id: ".weatherImg",
                display: "block",
                displayOn: true,
                width: 33,
                order: 0
              },
              temp:{
                id: "[data-weatherstate]",
                display: "block",
                displayOn: true,
                order: 0,
              },
            },
            settingsOpener: {
              id: "#settings p",
              display: "block",
              displayOn: true,
              fontFamily: "Montserrat",
              fontSize: 16,
              icon: {
                id: "#settings img",
                display: "block",
                displayOn: true,
                width: 32,
              }
            },
            dateAndHour: {
              id: "#date",
              activeModule: true,
              display: "flex",
              flexDirection: "column",
              hour: {
                id: "#date [data-hour]",
                display: "block",
                displayOn: true,
                fontFamily: "Montserrat",
                fonSize: "clamp(min(2.2rem), 7vw, max(4rem))",
                order: 0,
              },
              date: {
                id: "#date [data-date]",
                display: "block",
                displayOn: true,
                fontFamily: "Montserrat",
                fontSize: "clamp(min(.8rem), 6vw, max(1.3rem))"
              }
            },
        }
    },
    "customThemes": {
        "customTheme1": {
            "Global border radius": 5,
            "Blur strenght": 8,
            "Top content font colour": "rgba(255, 255, 255, 255)",
            "Highlight top content items bg": "rgba(0, 0, 0, 51)",
            "Weather popUp Bg colour": "rgba(0, 0, 0, 216)",
            "Important text colour": "rgb(236, 141, 141)",
            
            "Input type color border colour": "rgba(47, 47, 47, 255)",
            
            "Main content font colour": "rgba(255, 255, 255, 255)",
            "Main content Bg colour": "rgba(0, 0, 0, 165)",
            "Main content Search box Bg colour": "rgba(0, 0, 0, 204)",
            "Main content Search btn Bg colour": "rgba(0, 0, 0, 255)",
            "Shortcuts Bg colour": "rgba(0, 0, 0, 153)",
            
            "Buttons Bg colour": "rgba(39, 39, 39, 255)",
            "Buttons border colour": "rgba(255, 255, 255, 15)",
            "Buttons font colour": "rgba(255, 255, 255, 255)",
            "Buttons hover colour": "rgba(55, 55, 55, 255)",
            "Buttons active Bg colour": "rgba(28, 28, 28, 255)",
            
            "Alerts top content Bg": "rgba(13, 13, 13, 255)",
            "Alerts actions container Bg": "rgba(19, 19, 19, 255)",
            
            "Context menu Bg colour": "rgba(16, 16, 16, 255)",
            "Context menu items Bg colour": "rgb(0, 0, 0)",
            "Context menu items hover colour": "rgba(0, 0, 0, 255)",
            
            "Shortcuts form Bg colour": "rgba(17, 17, 17, 255)",
            "Shortcuts form inputs Bg colour": "rgba(34, 34, 34, 221)",
            "Shortcuts form inputs border colour": "rgba(47, 47, 47, 255)",
            "Shortcuts form buttons bg": "rgba(34, 34, 34, 221)",
            "Shortcuts form button hover bg": "rgba(38, 38, 38, 255)",
            "Shortcuts form button active bg": "rgba(28, 28, 28, 255)",
            
            "Settings menu liks colour": "rgba(95, 13, 132, 255)",
            "Settings menu categories list Bg colour": "rgba(7, 7, 7, 196)",
            "Settings menu categories items Bg": "rgba(40, 40, 40, 102)",
            "Settings menu categories items hover Bg": "rgba(34, 34, 34, 255)",
            "Settings menu main content Bg": "rgba(0, 0, 0, 255)",
            "Settings menu options Bg colour": "rgba(14, 14, 14, 255)",
            "Settings menu details Bg colour": "rgba(6, 6, 6, 255)",
            "Settings menu selects Bg colour": "rgba(39, 39, 39, 255)",
            "Settings menu off toggle Bg": "rgba(39, 39, 39, 255)",
            "Settings menu toggle circle Bg colour": "rgba(255, 255, 255, 255)",
            "Settings menu active toggle Bg": "rgba(124, 121, 255, 255)",
            "Settings menu code Bg colour": "rgba(0, 0, 0, 255)",
            "Settings menu invert icons colour intensity": "100%"
        },
        "customTheme2": {
            "Global border radius": 5,
            "Blur strenght": 8,
            "Top content font colour": "rgba(255, 255, 255, 255)",
            "Highlight top content items bg": "rgba(0, 0, 0, 51)",
            "Weather popUp Bg colour": "rgba(0, 0, 0, 216)",
            "Important text colour": "rgb(236, 141, 141)",
            
            "Input type color border colour": "rgba(47, 47, 47, 255)",
            
            "Main content font colour": "rgba(255, 255, 255, 255)",
            "Main content Bg colour": "rgba(0, 0, 0, 165)",
            "Main content Search box Bg colour": "rgba(0, 0, 0, 204)",
            "Main content Search btn Bg colour": "rgba(0, 0, 0, 255)",
            "Shortcuts Bg colour": "rgba(0, 0, 0, 153)",
            
            "Buttons Bg colour": "rgba(39, 39, 39, 255)",
            "Buttons border colour": "rgba(255, 255, 255, 15)",
            "Buttons font colour": "rgba(255, 255, 255, 255)",
            "Buttons hover colour": "rgba(55, 55, 55, 255)",
            "Buttons active Bg colour": "rgba(28, 28, 28, 255)",
            
            "Alerts top content Bg": "rgba(13, 13, 13, 255)",
            "Alerts actions container Bg": "rgba(19, 19, 19, 255)",
            
            "Context menu Bg colour": "rgba(16, 16, 16, 255)",
            "Context menu items Bg colour": "rgb(0, 0, 0)",
            "Context menu items hover colour": "rgba(0, 0, 0, 255)",
            
            "Window BG colour": "rgba(0, 0, 0, 255)",
            
            "Shortcuts form Bg colour": "rgba(17, 17, 17, 255)",
            "Shortcuts form inputs Bg colour": "rgba(34, 34, 34, 221)",
            "Shortcuts form inputs border colour": "rgba(47, 47, 47, 255)",
            "Shortcuts form buttons bg": "rgba(34, 34, 34, 221)",
            "Shortcuts form button hover bg": "rgba(38, 38, 38, 255)",
            "Shortcuts form button active bg": "rgba(28, 28, 28, 255)",
            
            "Settings menu liks colour": "rgba(95, 13, 132, 255)",
            "Settings menu categories list Bg colour": "rgba(7, 7, 7, 196)",
            "Settings menu categories items Bg": "rgba(40, 40, 40, 102)",
            "Settings menu categories items hover Bg": "rgba(34, 34, 34, 255)",
            "Settings menu main content Bg": "rgba(0, 0, 0, 255)",
            "Settings menu options Bg colour": "rgba(14, 14, 14, 255)",
            "Settings menu details Bg colour": "rgba(6, 6, 6, 255)",
            "Settings menu selects Bg colour": "rgba(39, 39, 39, 255)",
            "Settings menu off toggle Bg": "rgba(39, 39, 39, 255)",
            "Settings menu toggle circle Bg colour": "rgba(255, 255, 255, 255)",
            "Settings menu active toggle Bg": "rgba(124, 121, 255, 255)",
            "Settings menu code Bg colour": "rgba(0, 0, 0, 255)",
            "Settings menu invert icons colour intensity": "100%"
        }
    }
}