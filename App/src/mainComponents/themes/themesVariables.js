export function themeVariables(theme) {
    const variables = {
        "light": `
            :root {
                --root-grid-values: 40dvh 60dvh;
                --globalBorderRadius: 5px;
                --globalBlurValue: 5px;
                --mainUIColor: rgba(255, 255, 255, 1);
                --seccondaryUIColor: rgba(255, 255, 255, 0.7);
                --mainFontFamily: "Montserrat", sans-serif;
                --mainFontColour: rgba(255, 255, 255, 1);
                --notification-Border: 2px solid #AFAFAF;
                --notification-Padding: clamp(1px, 2vw, 16px) clamp(2px, 3vw, 30px);
                --notification-legendFontSize: clamp(1px, 3vw, 24px);
                --notification-pFontSize: clamp(1px, 3vw, 18px);
                --intemsInvert: 100%;
                --weatherAndSettings-padding: 16px;
                --weatherAndSettings-fontSize: clamp(8px, 5vw, 16px);
                --weatherAndSettings-fontWeight: 450;
                --weatherAndSettings-weatherIconSize: clamp(12px, 10vw, 33px);
                --dateAndHour-hourFontSize: clamp(12px, 8vw, 64px);
                --dateAndHour-dateFontSize: clamp(8px, 5vw, 18px);
                --dateAndHour-hourFontWeight: 500;
                --dateAndHour-dateFontWeight: 350;
                --dateAndHour-flexDirection: column;
                --dateAndHour-alignItems: center;
                --bottomContent-bg: rgba(255, 255, 255, 0.80);
                --bottomContent-fontColour: rgba(0, 0, 0, 1);
                --searchBox-bgColour: rgba(255, 255, 255, 0.8);
                --searchBox-width: clamp(100px, 50vw, 512px);
                --searchBox-height: clamp(16px, 3vw, 24px);
                --searchBox-padding: clamp(12px, 3vw, 16px);
                --searchBtn-bgColour: rgba(255, 255, 255, 1);
                --shortcuts-BgColour: rgba(255, 255, 255, 0.8);
                --shortcuts-size: clamp(32px, 10vw, 64px);
                --shortcuts-nameMargin: 6px;
                --shortcuts-nameSize: clamp(8px, 3vw, 1rem);
                --shortcuts-contextMenuBtn-invert: 0;
                --shortcuts-contextMenuHover: rgba(0, 0, 0, 0.10);
                --shortcuts-contextMenuBorder: 1px solid rgba(0, 0, 0, 0.3);
                --shortcuts-shortcutPromptInputBg: rgba(255, 255, 255, 1);
                --shortcuts-shortcutPromptInputBorder: solid 1px rgba(199, 199, 199, 1);
                --shortcuts-shortcutPromptInputHoverBorder: solid 1px rgba(82, 82, 82, 1);
                --shortcuts-shortcutPromptInputFocusOutline: 1px solid rgba(2, 138, 255, 1);
                --shortcuts-shortcutPromptInputFocusBorder: solid 1px transparent;
                --shortcuts-shortcutPromptButtonsBorder: 1px solid rgba(166, 166, 166, 1);
                --shortcuts-shortcutPromptButtonsHoverBg: rgba(231, 231, 231, 1);
                --shortcuts-shortcutPromptButtonsActiveBg: rgba(195, 195, 195, 1);
                --shortcuts-shortcutPromptButtonsActiveBorder: 1px solid rgba(144, 144, 144, 1);
            }
        `,
        "dark": `
            :root {
                --root-grid-values: 40dvh 60dvh;
                --globalBorderRadius: 5px;
                --globalBlurValue: 5px;
                --mainUIColor: rgba(0, 0, 0, 1);
                --seccondaryUIColor: rgba(0, 0, 0, 0.7);
                --mainFontFamily: "Montserrat", sans-serif;
                --mainFontColour: rgba(255, 255, 255, 1);
                --notification-Border: 2px solid #494949;
                --notification-Padding: clamp(1px, 2vw, 16px) clamp(2px, 3vw, 30px);
                --notification-legendFontSize: clamp(1px, 3vw, 24px);
                --notification-pFontSize: clamp(1px, 3vw, 18px);
                --itemsInvert: 0%;
                --weatherAndSettings-padding: 16px;
                --weatherAndSettings-fontSize: clamp(8px, 5vw, 16px);
                --weatherAndSettings-fontWeight: 450;
                --weatherAndSettings-weatherIconSize: clamp(12px, 10vw, 33px);
                --dateAndHour-hourFontSize: clamp(12px, 8vw, 64px);
                --dateAndHour-dateFontSize: clamp(8px, 5vw, 18px);
                --dateAndHour-hourFontWeight: 500;
                --dateAndHour-dateFontWeight: 350;
                --dateAndHour-flexDirection: column;
                --dateAndHour-alignItems: center;
                --bottomContent-bg: rgba(0, 0, 0, 0.65);
                --bottomContent-fontColour: rgba(255, 255, 255, 1);
                --searchBox-bgColour: rgba(15, 15, 15, 0.8);
                --searchBox-width: clamp(100px, 50vw, 512px);
                --searchBox-height: clamp(16px, 3vw, 24px);
                --searchBox-padding: clamp(12px, 3vw, 16px);
                --searchBtn-bgColour: rgba(0, 0, 0, 1);
                --shortcuts-BgColour: rgba(0, 0, 0, 0.8);
                --shortcuts-size: clamp(32px, 10vw, 64px);
                --shortcuts-nameMargin: 6px;
                --shortcuts-nameSize: clamp(8px, 3vw, 1rem);
                --shortcuts-contextMenuBtn-invert: 100%;
                --shortcuts-contextMenuHover: rgba(255, 255, 255, 0.10);
                --shortcuts-contextMenuBorder: 1px solid rgba(255, 255, 255, 0.3);
                --shortcuts-shortcutPromptInputBg: rgba(19, 19, 19, 1);
                --shortcuts-shortcutPromptInputBorder: 1px solid rgba(55, 55, 55, 1);
                --shortcuts-shortcutPromptInputHoverBorder: 1px solid rgba(120, 120, 120, 1);
                --shortcuts-shortcutPromptInputFocusOutline: 1px solid rgba(2, 138, 255, 1);
                --shortcuts-shortcutPromptInputFocusBorder: solid 1px transparent;
                --shortcuts-shortcutPromptButtonsBorder: 1px solid rgba(47, 47, 47, 1);
                --shortcuts-shortcutPromptButtonsHoverBg: rgba(50, 50, 50, 1);
                --shortcuts-shortcutPromptButtonsActiveBg: rgba(30, 30, 30, 1);
                --shortcuts-shortcutPromptButtonsActiveBorder: 1px solid rgba(144, 144, 144, 1);
            }
        `
    }
    if(variables[theme]){
        return variables[theme]
    }
}