export const defaultSettings = {
  "general": {
    "shortcuts_limit": 8,
    "search_engine": {
      name: "Google",
      baseURL: 'https://www.google.com/search?q='
    },
    "open_search_in_newTab": "false",
    "weather_city": "Mexico-City",
    "lang": "en",
    "version": "0.9.8A",
    "firstStart": 1
  },
  "appearance": {
    "theme": "light",
    "background": {
      type: "backgroundImage",
      value: "App/Assets/Images/backgrounds/1.webp"
    },
    "backgroundBlur": 0,
    "blur": 8,
    "shortcutsPopUpOpacity": 89,
    "weatherPopUpOpacity": 85,
    "dateFormat": "normalDate",
    "top_itemsBg": {
      display: false,
      value: "transparent"
    },
    "invert_top_items_colour": {
      display: true,
      value: "invert(100%)"
    },
    "mainPageItems": {
      contentRatio: {
        id: "main",
        topPercentaje: 45
      },
      weather: {
        id: ".top-content_top #weather",
        activeModule: true,
        fontFamily: "Montserrat",
        fontSize: "16px",
        icon: {
          id: ".top-content_top > div > img",
          displayOn: true,
          display: "block",
          width: "33px",
          height:`33px`,
          order: 0
        },
        temp:{
          id: "[data-weatherstate]",
          displayOn: true,
          display: "block",
          order: 0,
        },
        location: {
          id: "#weather-location",
          displayOn: true,
          display: "block"
        }
      },
      settingsOpener: {
        id: "#settings p",
        displayOn: true,
        display: "block",
        fontFamily: "Montserrat",
        fontSize: "16px",
        order: 0,
        icon: {
          id: "#settings img",
          displayOn: true,
          display: "block",
          width: "32px",
          height: "auto"
        }
      },
      dateAndHour: {
        id: "#date",
        activeModule: true,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        hour: {
          id: "#date [data-hour]",
          displayOn: true,
          display: "block",
          fontFamily: "Montserrat",
          fonSize: "clamp(min(2.2rem), 7vw, max(4rem))",
          order: 0
        },
        date: {
          id: "#date [data-date]",
          displayOn: true,
          display: "block",
          fontFamily: "Montserrat",
          fontSize: "clamp(min(.8rem), 6vw, max(1.3rem))",
          margin: "0px"
        }
      },
      mainContent: {
        container: {
          id: "#main-content",
          displayOn: true,
          display: "flex",
          paddingTop: "48px",
          containerOpacity: "65%",
          blurActive: true,
          backdropFilter: "blur(var(--blur-strenght))"
        },
        searchBar: {
          id: ".search-form",
          activeModule: true,
          display: "flex",
          width: "80%"
        },
        searchForm: {
          id: "#main-content .search-form input[type='search']",
          height: "clamp(43px, 5vw, 53px)",
          padding: "21px",
          fontFamily: "Montserrat",
        },
        searchButton: {
          id: "#main-content .search-form :last-child",
          displayOn: true,
          display: "block",
          width: "clamp(20px, 3vw, 33px)"
        },
        shortcuts: {
          id: "#main-content .favourites .shortcutsContainer",
          activeModule: true,
        },
        shortcutsImages: {
          id: "[data-appimg]",
          displayOn: true,
          display: "block",
          padding: "1rem",
          width: "clamp(32px, 10vw, 64px)",
          height: "clamp(32px, 10vw, 64px)",
          order: 0
        },
        shortcutsLegends: {
          id: "#main-content .favourites .shortcutsContainer .shortcut .shortcut_main-content legend",
          displayOn: true,
          display: "block",
          margin: "4px",
          fontFamily: "Montserrat",
          fontSize: "clamp(10px, 3vw, 1rem)",
        }
      }
    }
  }
}