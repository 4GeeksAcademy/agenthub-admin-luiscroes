# AgentHub · Panel de administración (prototipo)

Prototipo HTML del panel de administración interno de **AgentHub**, una plataforma SaaS donde las empresas alquilan agentes de IA equipados con *skills*.

Proyecto construido con el enfoque **Vision to spec**: primero la especificación, después el código.

## Cómo verlo

Abre `index.html` en el navegador, o ejecuta un servidor local:

```bash
python3 -m http.server 8000
```

y visita `http://localhost:8000`.

## Archivos

| Archivo | Contenido |
|---|---|
| `SPECS.md` | Especificación completa: producto, stack, datos de referencia, 4 specs por sección, inventario de componentes y 21 criterios de aceptación. Commiteado **antes** de cualquier HTML. |
| `index.html` | Estructura semántica, contenido hardcodeado y estilos Tailwind (CDN). |
| `app.js` | Interacciones en JavaScript vanilla: navegación, dropdowns ⋮, modales, skills colapsables y modo oscuro. |
| `docs/stitch/` | Propuesta visual generada en Google Stitch a partir de `SPECS.md` (solo referencia de diseño). |

## Stack

HTML5 semántico · Tailwind CSS v3 vía CDN (`darkMode: 'class'`) · JavaScript vanilla. Sin frameworks, sin build, sin CSS propio, sin atributos `style`.

## Secciones

1. **Dashboard**: 4 tarjetas de métricas, placeholder de actividad semanal y últimos errores.
2. **Usuarios**: tabla con dropdown ⋮ (Ver detalle en modal, Eliminar).
3. **Agentes**: tarjetas con skills colapsables (transición suave) y modal "Configurar" con el prompt de sistema editable.
4. **Skills**: explicación de qué es una skill y catálogo con número de agentes por skill.
5. **Contrataciones**: tabla de contratos y modal con desglose de skills y precios.
6. **Log de errores**: badges de gravedad con código de color, modal con traza completa y "Marcar como resuelto".

Toggle de modo claro/oscuro en la barra superior: se mantiene al cambiar de sección y al recargar.

## Proceso (historial de Git)

1. `SPECS.md`, la especificación.
2. Propuesta visual de Google Stitch, como referencia.
3. HTML: estructura, contenido y estilo (Algoritmo del Pintor).
4. JS: interacciones.
5. Ajuste de `SPECS.md` tras revisar el prototipo.

Todos los datos son ficticios y consistentes entre secciones: los agentes Atlas, Nova, Lexa, Orion, Pixel y Sage aparecen en Agentes, Contrataciones y Log de errores.
