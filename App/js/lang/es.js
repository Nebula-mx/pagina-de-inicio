import { settingsManager } from "../settingsManager.js"

export default {
    "commonWords": {
        "default": "Por defecto",
        "clean": "Limpio",
        "of": "de",
        "at": "En",
        "editElement": "Editar elemento",
        "close": "Cerrar"
    },
    "daysOfWeek": {
        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miercoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sabado"
    },
    "months": {
        0: "Enero",
        1: "Febrero",
        2: "Marzo",
        3: "Abril",
        4: "Mayo",
        5: "Junio",
        6: "Julio",
        7: "Agosto",
        8: "Septiembre",
        9: "Octubre",
        10: "Noviembre",
        11: "Diciembre"
    },
    "contextMenus": {
        "shortcuts": {
            "openInNewTab": "Abrir en nueva pestaña",
            "editShortcut": "Editar atajo",
            "deleteShortcut": "Eliminar atajo",
            "close": "Cerrar"
        },
        "weather": {
            "feelsLike": "Sensación de",
            "humidity": "Humedad",
            "condition": "Condición"
        }
    },
    "notifications": {
        "errors": {
            "corruptShortcuts": {
                "title": "El objeto de Shortcuts ha sido restablecido",
                "desc": "Ha sucedido un error al momento de la carga, revise la consola del navegador para obtener mas detalles."
            },
            "cannotGetWeather": {
                "title": "No se pudo obtener la información del clima",
                "desc": "Hubo un problema al intentar obtener la información del clima."
            },
            "cannotGetPosition": {
                "title": "Ubicación no disponible",
                "desc": "Hubo un problema al intentar obtener la ubicación, intente poner su ubicación manualmente."
            }
        },
        "info": {
            "livePreviewOn": {
                "title": "¡La vista previa en vivo esta activa!",
                "desc": "Si recargas o cierras la pagina se perderan los cambios."
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
            "title": "¿Deseas eliminar este acceso?",
            "desc": "Esta acción no se puede deshacer."
        },
        "themeEditorAlerts": {
            "title": "¡Tienes cambios sin guardar!",
            "desc": "Si cierras este menú la vista previa en vivo será activada, si recargas la aplicación el tema se perderá."
        },
        "saveTheme": {
            "title": "¿Quieres guardar tus cambios?",
            "desc": "¡Esta acción remplazará tu tema anterior!"
        },
        "restoreTheme": {
            "title": "¿Quieres descartar los cambios hechos?",
            "desc": "Al hacer esto tu tema anterior será restaurado"
        }
    },
    "prompts": {
        "shortcuts": {
            "createTitle": "Crear atajo",
            "editTitle": "Editar atajo",
            "urlPlaceHolder": "URL de la página...",
            "namePlaceHolder": "Nombre de la página...",
            "cancel": "Cancelar",
            "save": "Guardar y salir"
        },
        "weather": {
            "title": "Escribe el nombre de tu ciudad",
            "desc": ""
        },
        "importSettings": {
            "title": "Importar configuraciones",
            "desc": "Inserta la cadena de configuraciones."
        },
        "importShortcuts": {
            "title": "Importar atajos",
            "desc": "Inserta la cadena de atajos."
        },
        "background": {
            "title": "Inserta la URL de la imagen",
            "desc": ""
        }
    },
    "search": {
        "searchUsing": "Buscar usando:"
    },
    "settings": {
        "title": "Ajustes",
        "general": {
            "title": "General",
            "categories": {
                "general": "General",
                "extra": "Extra",
                "resetAppValues": "Reestablecer valores",
            },
            "shortcutsLimit": {
                "legend": "Cambiar límite de atajos",
                "p": "Esta función requiere recargar la página."
            },
            "searchEngine": {
                "legend": "Seleccionar motor de búsqueda",
                "p": "Cambia el motor de búsqueda."
            },
            "searchInNewTab": {
                "legend": "Abrir búsquedas en una nueva pestaña",
                "p": "Haz que cada búsqueda que hagas se abra en una nueva pestaña."
            },
            "weatherCity": {
                "legend": "Configurar locación clima",
                "p": "Configura la locación para mostrar el clima.",
                "manualSetButton": "Ajustar manualmente",
                "autoSetButton": "Ajustar automáticamente"
            },
            "appLanguage": {
                "legend": "Cambiar idioma de la aplicación",
                "p": "Elige el idioma que prefieras utilizar. (Requiere recargar la pagina)"
            },
            "exportSettings": {
                "legend": "Exportar ajustes",
                "p": "Exporta tus ajustes para usarlos en otro navegador.",
                "button": "Exportar"
            },
            "exportShortcuts": {
                "legend": "Exportar atajos",
                "p": "Exporta todos tus atajos.",
                "button": "Exportar"
            },
            "importSettings": {
                "legend": "Importar ajustes",
                "p": "Importa tus ajustes especiales para utilizarlos.",
                "button": "Importar"
            },
            "importShortcuts": {
                "legend": "Importar atajos",
                "p": "Importa atajos de otro lugar.",
                "button":  "Importar"
            },
            "resetSettings": {
                "legend": "Reestablecer ajustes",
                "button": "Reestablecer"
            },
            "deleteShortcuts": {
                "legend": "Borrar todos los atajos",
                "button": "Borrar todos"
            }
        },
        "appearance": {
            "title": "Apariencia",
            "categories": {
                "appearance": "Apariencia",
                "advancedOptions": {
                    "title": "Opciones avanzadas",
                    "editRootContent": "Editar contenido principal"
                }
            },
            "commonWords": {
                "DisplayOptions": "Opciones de estilo",
                "editElement": "Editar element",
                "activeModule": "Modulo activo",
                "fontSize": "Tamaño de fuente",
                "fontFamily": "Tipo de fuente",
                "order": "Order"
            },
            "theme": {
                "legend": "Tema",
                "p": "Elige tu tema preferido.",
                "select": {
                    "light": "Claro",
                    "dark": "Oscuro",
                    "custom1": "Tema P. 1",
                    "custom2": "Tema P. 2"
                }
            },
            "backgrounds": {
                "legend": "Fondo de pantalla",
                "p": "Cambia el fondo de pantalla.",
                "button": "Abrir opciones",
                "submenu": {
                    "title": "Fondo de pantalla",
                    "bgImages": "Imágenes",
                    "bgImagesButton": "Usar URL personalizada",
                    "bgColours": "Colores",
                    "bgColoursButton": "Usar color personalizado"
                }
            },
            "bgBlur": {
              "legend": "Desenfoque del fondo de pantalla",
              "p": "Selecciona la intensidad del desenfoque del fondo de pantalla.",
            },
            "blurStrenght": {
                "legend": "Intensidad del difuminado de los elementos",
                "p": "Ajusta la intensidad a tu gusto."
            },
            "relatedOptions": {
                "summary": "Opciones relacionadas",
                "content": {
                    "contextMenu": {
                        "legend": "Opacidad del menu contextual",
                        "p": "Ajusta la transparencia del menu contextual."
                    },
                    "favouritesContent": {
                        "legend": "Opacidad del contenido inferior",
                        "p": "Ajusta la opacidad del contenido de favoritos (Solo afecta al contenedor)."
                    },
                    "weatherPopUp": {
                        "legend": "Opacidad del contenedor del clima",
                        "p": "Ajusta la opacidad del contenedor de la vendana del clima."
                    }
                }
            },
            "dateFormat": {
                "legend": "Formato de fecha",
                "p": "Selecciona el formato de fecha preferido.",
                "select": {
                    "dmy": "D/M/A",
                    "fulldate": "Dia de la semana, dia del mes, mes, año"
                }
            },
            "highlightTopContentItems": {
                "legend": "Resaltar el contenido superior",
                "p": "Agrega un fondo semi transparente al contenido superior"
            },
            "invertFontColour": {
                "legend": "Invertir el color de fuente del contenido superior",
                "p": "Invierte el color de la fuente que tiene el contenido superior"
            },
            "customTheme": {
                "legend": "Temas personalizados",
                "p": "Crea tu propio tema personalizado",
                "button": "¡Vamos!"
            },
            "displayRatio": {
                "legend": "Proporcion del contenido",
                "p": "Elige la proporcion que tendran el contenido superior e inferior."
            },
            "weatherOptions": {
                "title": "Información del clima",
                "desc": "Edita la forma en la que se muestra el clima.",
                "activeModuleDesc": "Al desactivar el modulo el elemento entero sera removido",
                "icon": {
                    "legend": "Mostrar icono",
                    "p": "Elige si mostrar u ocultar el icono del estado del clima"
                },
                "temp": {
                    "legend": "Mostrar temperatura",
                    "p": "Muestra u oculta la temperatura"
                },
                "location": {
                    "legend": "Mostrar ubicacioó",
                    "p": "Muestra u oculta la ubicación del clima"
                }
            },
            "sOpenerOptions": {
                "title": "Accesos a los ajustes",
                "desc": "Edita la manera en la que estos son mostrados.",
                "settingsText": {
                    "legend": 'Mostrar el texto "Ajustes"',
                    "p": 'Muestra u oculta el texto "Ajustes"'
                },
                "settingsIcon": {
                    "legend": "Mostrar icono",
                    "p": 'Muestra u oculta el icono de Ajustes. Forzosamente se debe de mostrar uno de los 2 elementos (El texto "Ajustes" o el icono).',
                    "size": "Tamaño"
                }
            },
            "dateAndHourOptions": {
                "title": "Fecha y hora",
                "desc": "Edita los el estilo de fecha y hora.",
                "p": "Al apagar el modulo, la fecha y hora seran removidos.",
                "general": {
                    "legend": "Orientación del contenido",
                    "p": "Elige entre una orientación vertical u horizontal.",
                    "itemsMargin": "Separación del contenido",
                    "alignItems": "Alineación del contenido"
                },
                "hour": {
                    "legend": "Mostrar la hora",
                    "p": "Muestra u oculta la hora."
                },
                "date": {
                    "legend": "Mostrar la fecha",
                    "p": "Muestra u oculta la fecha."
                }
            },
            "mainContent": {
                "title": "Contenido inferior",
                "desc": "Edita la barra de busqueda, atajos, y el contenedor.",
                "container": {
                    "catTitle": "Contenedor",
                    "legend": "Editar contenedor",
                    "p": "Muestra u oculta el contenedor",
                    "opacity": "Opacidad",
                    "paddingTop": "Margen superior",
                    "backdropBlur": "Difuminado de fondo"
                },
                "searchBar": {
                    "catTitle": "Barra de busqueda",
                    "legend": "Mostrar la barra",
                    "p": "Al desactivar esta opcion la barra de busqueda sera ocultada",
                    "barWidth": "Ancho",
                    "barHeight": "Alto",
                    "barPadding": "Relleno",
                    "iconSize": "Tamaño del icono"
                },
                "shortcutsIcons": {
                    "catTitle": "Iconos de atajos",
                    "legend": "Mostrar iconos de atajos",
                    "p": "Al desactivar esto, los iconos (imagenes) que aparecen en los atajos",
                    "iconWidth": "Ancho",
                    "iconHeight": "Alto",
                },
                "shortcutsTitles": {
                    "catTitle": "Nombres de atajos",
                    "legend": "Mostrar los nombres",
                    "p": "Muestra u oculta los nombres de los atajos",
                    "margin": "Separación"
                }
            }
        },
        "about": {
            "title": "Acerca de",
            "categories": {
                "about": "Acerca de"
            },
            "missingFeatures": {
                "legend": "En desarrollo continuo",
                "p": "Esta página sigue en desarrollo asi que características como una mejor personalización, atajos de teclado y otras características aún no estan disponibles."
            },
            "whatsNew": {
                "legend": `¿Qué hay de nuevo? v.${settingsManager.getValue("general", ["version"])}`,
                "list": `
                    <li>Ahora hay una nueva sección para poder elegir distintos fondos de pantalla.</li>
                    <li>Se corrigieron detalles en el selector de colores (por el momento no funciona en navegadores moviles)</li>
                    <li>El rendimiento ha sido mejorado.</li>
                `
            },
            "appInfo": {
                "legend": "Información de la pagina",
                "version": `Versión: ${settingsManager.getValue("general", ["version"])} <br> Hecho por: <a href="https://github.com/Nebula-mx/" >Nebula_mx</a> 🇲🇽 <br> Gracias a <a href="https://github.com/Fabrisdev">Fabri</a> por ayudar con las traducciones 💜`
            }
        }
    },
    "submenus": {
        "themeCreator": {
            "title": "Editor de temas",
            "editorActions": {
                "p": "Tema seleccionado:",
                "select": {
                    "customTheme1": "Tema P. 1",
                    "customTheme2": "Tema P. 2"
                },
                "buttons": {
                    "preview": "Ver tema",
                    "save": "Guardar",
                    "cancel": "Cancelar"
                }
            },
            "previewAdvisorDefault": "Puedes usar la vista previa en vivo para ver que tan bonito es tu tema",
            "previewAdvisorActive": "¡La vista previa esta activa!. Tu tema anterior ha sido guardado en caso de que desees restaurar el anterior",
            "betaStatusAlert": '¡Esta función sigue en pruebas¡, si percibes algun error mientras usas esta característica puedes reportarlo en el repositorio de <a href="https://github.com/Nebula-mx/pagina-de-inicio" target="_blank">Github</a>'
        }
    },
    "colourPicker": {
        "top": {
            "p": "Seleccionar color",
            "buttons": {
                "cancel": "Cancelar",
                "save": "Guardar"
            }
        },
        "recentSwatches": {
            "legend": "Colores recientes"
        }
    }
}
