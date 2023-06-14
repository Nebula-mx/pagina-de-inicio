import { sManager } from "../../settingsManager.js"

export default {
    "commonWords": {
        "default": "Por defecto",
        "clean": "Limpio",
        "of": "de",
        "at": "En"
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
            }
        },
        "info": {
            "livePreviewOn": {
                "title": "¡La vista previa en vivo esta activa!",
                "desc": "Si recargas o cierras la pagina se perderan los cambios."
            }
        }
    },
    "alerts": {
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
                "legend": "Abrir búsqueda en una nueva pestaña",
                "p": "Haz que cada búsqueda que hagas se abra en una nueva pestaña."
            },
            "weatherCity": {
                "legend": "Configurar ciudad del clima",
                "p": "Cambia a la ciudad que prefieras saber el clima.",
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
            "theme": {
                "legend": "Tema",
                "p": "Elige tu tema preferido",
                "select": {
                    "light": "Claro",
                    "dark": "Oscuro",
                    "custom1": "Tema P. 1",
                    "custom2": "Tema P. 2"
                }
            },
            "backgrounds": {
                "legend": "Fondo de pantalla:",
                "summary": "Mas fondos",
                "button": "Usar URL de fondo personalizada"
            },
            "blurStrenght": {
                "legend": "Intensidad del difuminado",
                "p": "Ajusta la intensidad a tu gusto"
            },
            "relatedOptions": {
                "summary": "Opciones relacionadas",
                "content": {
                    "contextMenu": {
                        "legend": "Opacidad del menu contextual",
                        "p": "Haz mas o menos transparente el menu"
                    },
                    "favouritesContent": {
                        "legend": "Opacidad del contenido inferior",
                        "p": "Ajusta la opacidad del contenido de favoritos (Solo afecta al contenedor)"
                    },
                    "weatherPopUp": {
                        "legend": "Opacidad del contenedor del clima",
                        "p": "Ajusta la opacidad del contenedor de la vendana del clima"
                    }
                }
            },
            "dateFormat": {
                "legend": "Formato de fecha",
                "p": "Selecciona el formato de fecha preferido (requiere recargar la pagina)",
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
            }
        },
        "about": {
            "title": "Acerca de",
            "categories": {
                "about": "Acerca de"
            },
            "missingFeatures": {
                "legend": "En desarrollo continuo",
                "p": "Esta pagina sigue en desarrollo asi que caracteristicas como una mejor personalizacion, atajos de teclado y otras caracteristicas aun no estan disponibles."
            },
            "whatsNew": {
                "legend": "¿Que hay de nuevo?",
                "list": `
                    <li>¡Ahora el Español esta disponible! Gracias a Fabri por ayudar en esto 💜</li>
                    <li>Ahora se pueden seleccionar los colores recientes en el Selector de colores</li>
                `
            },
            "currentSettings": {
                "legend": "Configuraciones actuales:"
            },
            "appInfo": {
                "legend": "Informacion de la pagina",
                "version": `Version: ${sManager.getValue("general", ["version"])} <br> Hecho por: <a href="https://github.com/Nebula-mx/" >Nebula_mx</a> <br> Hecho con 💜 en 🇲🇽 <br> Gracias a <a href="https://github.com/Fabrisdev">Fabri</a> por ayudar con las traducciones 💜`
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
            "previewAdvisorActive": "¡La vista previa esta activa!. Tu tema anterior ha sido guardado en caso de que desees restaurar el anterior"
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
