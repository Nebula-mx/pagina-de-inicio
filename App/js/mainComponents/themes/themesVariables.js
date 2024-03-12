export function themeVariables() {
    return `
        :root {
            --root-grid-values: 40dvh 60dvh;
            --globalBorderRadius: 5px;
            --globalBlurValue: 5px;
            --mainFontFamily: "Montserrat", sans-serif;
            --mainFontColour: rgba(255, 255, 255, 1);
            --weatherAndSettings-padding: 16px;
            --weatherAndSettings-fontSize: clamp(8px, 5vw, 16px);
            --weatherAndSettings-fontWeight: 450;
            --weatherAndSettings-weatherIconSize: clamp(12px, 10vw, 33px);
            --dateAndHour-hourFontSize: clamp(12px, 8vw, 64px);
            --dateAndHour-dateFontSize: clamp(8px, 5vw, 24px);
            --dateAndHour-hourFontWeight: 500;
            --dateAndHour-dateFontWeight: 350;
            --dateAndHour-flexDirection: column;
            --dateAndHour-alignItems: center;
            --bottomContent-bg: rgba(0, 0, 0, 0.65);
            --searchBox-bgColour: rgba(15, 15, 15, 0.8);
            --searchBox-width: clamp(100px, 50vw, 512px);
            --searchBox-height: clamp(16px, 3vw, 24px);
            --searchBox-padding: clamp(12px, 3vw, 16px);
            --searchBtn-bgColour: rgba(0, 0, 0, 1);
            --shortcuts-BgColour: rgba(0, 0, 0, 0.8);
            --shortcuts-size: clamp(32px, 10vw, 64px);
            --shortcuts-nameMargin: 6px;
            --shortcuts-nameSize: clamp(8px, 3vw, 1rem);
        }
    `
}