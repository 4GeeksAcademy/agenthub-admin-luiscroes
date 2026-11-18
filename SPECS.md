# SPECS.md — AgentHub · Panel de administración (prototipo)

> Documento de especificación escrito **antes** de cualquier HTML (enfoque *Vision to spec*).
> Estándar de calidad: un agente de código IA debe poder construir el panel completo a partir de este documento **sin hacer ninguna pregunta**.

---

## 1. Producto

**AgentHub** es una plataforma SaaS donde empresas alquilan **agentes de IA**: asistentes preconfigurados a los que se les añaden **skills** (capacidades como navegar por la web, leer documentos o gestionar calendarios) y que se despliegan para tareas de negocio concretas.

**Usuario de este panel:** el **administrador interno** de AgentHub (equipo de operaciones). Necesita, desde una sola pantalla, vigilar ingresos, clientes, agentes, skills, contratos y errores de ejecución. No es un panel para clientes.

**Objetivo del prototipo:** un HTML navegable y totalmente diseñado que el equipo pueda revisar, validar y entregar a backend. **Todos los datos están hardcodeados**; no hay API ni backend.

---

## 2. Stack y restricciones

| Regla | Detalle |
|---|---|
| Lenguajes | HTML5 semántico + JavaScript **vanilla** (ES2020). |
| Estilos | **Tailwind CSS v3 vía CDN** (`https://cdn.tailwindcss.com`) con `tailwind.config = { darkMode: 'class' }`. |
| Prohibido | Frameworks (React, Vue…), jQuery, herramientas de build, archivos `.css` propios, atributos `style="…"` en línea. |
| Archivos | `index.html` (estructura + datos visibles) y `app.js` (comportamiento + datos de detalle para modales). Ambos en la raíz. |
| Navegación | Una sola página. Cada sección es un `<section id="…">`; la barra lateral muestra una sección y oculta las demás (hash: `#dashboard`, `#usuarios`, `#agentes`, `#skills`, `#contrataciones`, `#errores`). |
| Idioma | Interfaz en español. Moneda en euros con formato `1.234,56 €`. Fechas `dd/mm/aaaa`. |
| Viewports | Escritorio (≥ 1024 px) y tablet (768–1023 px). En tablet la barra lateral se colapsa a solo iconos. |
| Accesibilidad | Botones reales (`<button>`), `aria-label` en botones de solo icono, `aria-expanded` en dropdowns y colapsables, `role="dialog"` + `aria-modal="true"` en modales, contraste WCAG AA en ambos modos, cierre con `Esc`. |
| Datos | Ficticios y **consistentes entre secciones** (ver §5). Emails con dominio reservado `.example`. |

---

## 3. Sistema visual

- **Paleta (modo claro):** fondo `slate-50`, superficies `white`, texto `slate-900` / secundario `slate-500`, bordes `slate-200`, primario `indigo-600` (hover `indigo-700`).
- **Paleta (modo oscuro):** fondo `slate-950`, superficies `slate-900`, texto `slate-100` / secundario `slate-400`, bordes `slate-800`, primario `indigo-500`.
- **Colores de estado (badges):** Activo = `emerald`, Inactivo = `slate`, Fallando = `red`, Suspendido = `amber`, Pendiente = `sky`, Finalizado = `slate`, Resuelto = `emerald`.
- **Gravedad de errores:** Crítico = `red`, Error = `orange`, Advertencia = `amber`, Info = `sky`.
- **Tipografía:** fuente del sistema (`font-sans`). H1 de sección `text-2xl font-semibold`; títulos de tarjeta `text-sm font-medium`; valores de métrica `text-3xl font-bold`.
- **Forma:** tarjetas y tablas `rounded-xl` con `border` y `shadow-sm`; badges `rounded-full text-xs font-medium px-2.5 py-0.5`.
- **Iconos:** SVG en línea (trazo 1.5, 20 px), sin librerías externas.

---

## 4. Layout global

1. **Contenedor:** pantalla completa (`min-h-screen`) dividida en una fila: `<aside>` (barra lateral) a la izquierda y columna principal a la derecha.
2. **Barra lateral `<aside>` + `<nav>`:** fija (sticky, altura de pantalla), ancho 256 px en escritorio y 72 px (solo iconos, etiquetas ocultas) en tablet. Arriba el logo "AgentHub" (icono + texto); debajo una lista vertical con 6 enlaces (icono + etiqueta): Dashboard, Usuarios, Agentes, Skills, Contrataciones, Log de errores. Abajo del todo, bloque con avatar e identidad del admin ("Admin · Operaciones").
3. **Indicador de sección activa:** el enlace activo tiene fondo `indigo-50` (oscuro: `indigo-500/10`), texto `indigo-700` (oscuro: `indigo-300`), una barra vertical de 3 px a la izquierda y `aria-current="page"`.
4. **Barra superior `<header>`:** sticky arriba de la columna principal. Izquierda: título de la sección actual + breadcrumb "AgentHub / Sección". Derecha: **toggle de modo oscuro** (botón con icono sol/luna y `aria-label` "Cambiar a modo oscuro/claro") y avatar del admin.
5. **Contenido `<main>`:** padding generoso (`p-6` escritorio, `p-4` tablet), ancho máximo 1280 px. Solo `<main>` hace scroll.

---

## 5. Datos de referencia (únicos y compartidos)

Estos datos se usan **idénticos** en todas las secciones. Los nombres de agentes **Atlas, Nova, Lexa, Orion, Pixel y Sage** aparecen en Agentes, Contrataciones y Log de errores.

### 5.1 Usuarios (clientes registrados)
| # | Nombre | Empresa | Email | Plan | Estado | Alta |
|---|---|---|---|---|---|---|
| U-01 | Marta Ruiz | Clínica Sonrisa | marta.ruiz@clinicasonrisa.example | Pro | Activo | 12/02/2026 |
| U-02 | Javier Ortega | Ortega Legal | j.ortega@ortegalegal.example | Enterprise | Activo | 03/01/2026 |
| U-03 | Lucía Fernández | Tienda Verde | lucia@tiendaverde.example | Starter | Activo | 21/04/2026 |
| U-04 | Andrés Molina | DataLogic | andres.molina@datalogic.example | Pro | Suspendido | 09/03/2026 |
| U-05 | Carmen Vidal | Vidal Consulting | carmen@vidalconsulting.example | Pro | Activo | 30/05/2026 |
| U-06 | Sergio Navarro | Navarro Reformas | sergio@navarroreformas.example | Starter | Pendiente | 16/11/2026 |

### 5.2 Skills (catálogo) — precio por mes
| Skill | Descripción | Precio | Agentes con la skill |
|---|---|---|---|
| Navegación web | Busca y extrae información de sitios web públicos. | 49,00 € | 2 (Atlas, Orion) |
| Lectura de documentos | Lee y resume PDF, Word y hojas de cálculo. | 39,00 € | 3 (Atlas, Lexa, Pixel) |
| Gestión de calendario | Crea, mueve y confirma citas en Google Calendar u Outlook. | 29,00 € | 2 (Nova, Sage) |
| Envío de emails | Redacta y envía correos desde la cuenta del cliente. | 19,00 € | 4 (Nova, Lexa, Orion, Sage) |
| Análisis de datos | Calcula métricas y genera informes a partir de tablas. | 59,00 € | 2 (Atlas, Pixel) |
| Atención al cliente | Responde consultas en el chat/CRM con el tono de la marca. | 45,00 € | 2 (Orion, Sage) |

### 5.3 Agentes
| Agente | Propietario (empresa) | Estado | Skills |
|---|---|---|---|
| Atlas | Javier Ortega (Ortega Legal) | Activo | Navegación web, Lectura de documentos, Análisis de datos |
| Nova | Marta Ruiz (Clínica Sonrisa) | Activo | Gestión de calendario, Envío de emails |
| Lexa | Javier Ortega (Ortega Legal) | Fallando | Lectura de documentos, Envío de emails |
| Orion | Lucía Fernández (Tienda Verde) | Activo | Atención al cliente, Envío de emails, Navegación web |
| Pixel | Andrés Molina (DataLogic) | Inactivo | Análisis de datos, Lectura de documentos |
| Sage | Carmen Vidal (Vidal Consulting) | Activo | Envío de emails, Gestión de calendario, Atención al cliente |

Cada agente tiene un **prompt de sistema** (texto de 2–4 frases) definido en `app.js`, por ejemplo Nova: *"Eres Nova, la asistente de citas de Clínica Sonrisa. Gestionas la agenda de los dentistas en Google Calendar…"*.

### 5.4 Contrataciones (cuota base del agente: 99,00 €/mes)
| Contrato | Cliente | Agente | Skills | Inicio | Fin | Meses | Descuento | Importe pagado | Estado |
|---|---|---|---|---|---|---|---|---|---|
| C-1001 | Clínica Sonrisa | Nova | Calendario, Emails | 01/09/2026 | 28/02/2027 | 6 | — | 882,00 € | Activo |
| C-1002 | Ortega Legal | Lexa | Documentos, Emails | 15/07/2026 | 14/01/2027 | 6 | — | 942,00 € | Activo |
| C-1003 | Ortega Legal | Atlas | Web, Documentos, Datos | 01/10/2026 | 30/09/2027 | 12 | 10 % anual | 2.656,80 € | Activo |
| C-1004 | Tienda Verde | Orion | Atención, Emails, Web | 01/11/2026 | 30/04/2027 | 6 | — | 1.272,00 € | Activo |
| C-1005 | DataLogic | Pixel | Datos, Documentos | 01/03/2026 | 31/08/2026 | 6 | — | 1.182,00 € | Finalizado |
| C-1006 | Vidal Consulting | Sage | Emails, Calendario, Atención | 01/06/2026 | 30/11/2026 | 6 | 15 % cupón BIENVENIDA15 | 979,20 € | Activo |

Cálculo: `(99 + Σ precio skills) × meses − descuento`. Ejemplo C-1003: (99 + 49 + 39 + 59) × 12 = 2.952,00 € − 10 % (295,20 €) = 2.656,80 €.

### 5.5 Métricas del Dashboard (noviembre 2026, derivadas de §5.3–5.4)
| Métrica | Valor | Origen |
|---|---|---|
| Ingresos totales (este mes) | 900,60 € | Suma de cuotas mensuales netas de los 5 contratos activos (147 + 157 + 221,40 + 212 + 163,20). |
| Pérdida por descuentos y cupones (este mes) | 53,40 € | 24,60 € (C-1003) + 28,80 € (C-1006). |
| Agentes activos | 4 | Atlas, Nova, Orion, Sage. |
| Agentes fallando | 1 | Lexa. |

### 5.6 Log de errores
| ID | Fecha y hora | Agente | Tipo | Gravedad | Descripción breve | Estado |
|---|---|---|---|---|---|---|
| E-207 | 18/11/2026 09:42:13 | Lexa | Fallo de ejecución | Crítico | El agente se detuvo al leer un PDF escaneado sin capa de texto. | Abierto |
| E-206 | 18/11/2026 08:15:02 | Lexa | Timeout | Error | La lectura del documento superó el límite de 120 s. | Abierto |
| E-205 | 17/11/2026 22:03:47 | Orion | Límite de API | Advertencia | Se alcanzó el límite de 60 peticiones/min del CRM. | Abierto |
| E-204 | 17/11/2026 16:30:10 | Nova | Autenticación | Error | Token de Google Calendar caducado; no se pudo crear la cita. | Abierto |
| E-203 | 16/11/2026 11:12:55 | Atlas | Parsing | Advertencia | No se pudo extraer la tabla de precios de la web objetivo. | Resuelto |
| E-202 | 15/11/2026 19:48:31 | Sage | Timeout | Advertencia | El servidor SMTP tardó más de 30 s en responder. | Resuelto |
| E-201 | 14/11/2026 07:05:09 | Pixel | Ejecución omitida | Info | Ejecución programada omitida: agente inactivo (cuenta suspendida). | Abierto |

Cada error tiene una **traza completa** (5–8 líneas tipo stack trace) definida en `app.js`.

---

## 6. Especificaciones por sección

### 6.1 Dashboard (`#dashboard`)
1. **Cuatro tarjetas de métrica** en una cuadrícula responsive: 4 columnas en escritorio, 2×2 en tablet. Cada tarjeta: icono en un círculo de color (40 px), etiqueta (`text-sm text-slate-500`), valor grande (`text-3xl font-bold`) y una línea de contexto pequeña (p. ej. "Noviembre 2026", "5 contratos activos", "de 6 registrados", "Lexa — ver log").
2. **Color de acento por métrica:** Ingresos = `emerald`, Descuentos = `amber`, Agentes activos = `indigo`, Agentes fallando = `red`. Todas con borde, `rounded-xl` y `shadow-sm`; la tarjeta "fallando" muestra el valor en rojo.
3. **Placeholder de gráfico semanal:** debajo de las tarjetas, un bloque de ancho completo y 256 px de alto con **borde discontinuo** (`border-2 border-dashed`), título "Actividad semanal de agentes" arriba a la izquierda y, centrado, un icono de gráfico + texto "Gráfico de actividad semanal — pendiente de integración". Debajo del texto, 7 barras grises decorativas (L–D) de alturas distintas hechas con `div` y clases de altura de Tailwind.
4. **Resumen rápido:** a la derecha del placeholder (escritorio) o debajo (tablet), una tarjeta "Últimos errores" con los 3 errores más recientes de §5.6 (agente + badge de gravedad + hora) y un enlace "Ver log completo" que navega a `#errores`.

### 6.2 Gestión de usuarios (`#usuarios`)
1. **Tabla** (`<table>` con `<thead>`/`<tbody>`) dentro de una tarjeta con título "Usuarios registrados" y contador "6 usuarios". Columnas: Nombre (avatar con iniciales + nombre + empresa en gris debajo), Email, Plan (badge neutro: Starter/Pro/Enterprise), Estado (badge de color §3), Acciones.
2. **Dropdown ⋮ por fila** en la columna Acciones: botón de icono `⋮` con `aria-label="Acciones para {nombre}"` y `aria-expanded`. Al pulsar abre un menú flotante que se despliega **a la izquierda del botón** (para no tapar el ⋮ de la fila siguiente; `shadow-lg`, `rounded-lg`) con: "Ver detalle" (icono ojo) y "Eliminar" (icono papelera, texto rojo). Solo un dropdown abierto a la vez.
3. **Modal "Ver detalle"** con overlay oscuro semitransparente y desenfoque (`bg-slate-900/60 backdrop-blur-sm`). Contenido: avatar grande con iniciales, nombre, empresa, y una lista de definiciones (`<dl>`) con: Email, Plan, Estado (badge), Fecha de alta, Agentes que posee (nombres de §5.3) y Contratos (IDs de §5.4). Botón "Cerrar" (y una ✕ arriba a la derecha).
4. **Eliminar:** quita la fila de la tabla con una transición de opacidad (300 ms), actualiza el contador "N usuarios" y muestra un aviso temporal (toast, 3 s) "Usuario eliminado (solo en el prototipo)".

### 6.3 Gestión de agentes (`#agentes`)
1. **Listado en tarjetas** (una tarjeta por agente, cuadrícula de 2 columnas en escritorio y 1 en tablet). Cabecera de cada tarjeta: icono/robot con la inicial, nombre del agente (`font-semibold`), propietario y empresa en gris, **badge de estado** (Activo/Inactivo/Fallando) y botón ⋮.
2. **Skills colapsadas por defecto:** bajo la cabecera, un botón de ancho completo "Skills (N)" con chevron. Al pulsarlo, la lista de skills (chips con el nombre de cada skill) **se despliega con una transición suave** de 300 ms (técnica: contenedor `grid` que pasa de `grid-rows-[0fr]` a `grid-rows-[1fr]` con `transition-all`, contenido interior `overflow-hidden`) y el chevron rota 180°. Volver a pulsar la colapsa. `aria-expanded` refleja el estado.
3. **Dropdown ⋮** con "Configurar" (icono engranaje) y "Eliminar" (rojo). **"Configurar" abre un modal** titulado "Configurar agente · {nombre}" con: badge de estado, propietario, lista de skills y un **`<textarea>` editable** (8 filas, fuente monoespaciada) precargado con el prompt de sistema del agente. Botones "Cancelar" y "Guardar cambios" (guardar actualiza el prompt en memoria, cierra el modal y muestra un toast "Prompt guardado (solo en el prototipo)").
4. **Agente fallando destacado:** la tarjeta de Lexa tiene borde `red` y una línea "2 errores abiertos — ver log" que navega a `#errores`.

### 6.4 Skills (`#skills`)
1. **Explicación dentro del panel:** arriba, una caja informativa (`indigo-50`, icono "i") con el texto: *"Una **skill** es una capacidad que se añade a un agente para que pueda hacer un tipo de tarea concreto (navegar por la web, leer documentos, gestionar un calendario…). Cada skill se contrata por separado y tiene un precio mensual que se suma a la cuota base del agente (99 €/mes)."*
2. **Catálogo en cuadrícula** de tarjetas (3 columnas escritorio, 2 tablet) con las 6 skills de §5.2. Cada tarjeta: icono propio, nombre, descripción breve (máx. 2 líneas), precio "/mes" y un **indicador "N agentes"** con icono de robot (badge `indigo`).
3. **Dropdown ⋮** por skill con "Ver detalle" y "Eliminar". **"Ver detalle" abre un modal** con nombre, descripción, precio mensual, número de agentes y la **lista de agentes que la tienen habilitada** (nombre + propietario + badge de estado), coherente con §5.3.
4. **Eliminar** quita la tarjeta con transición de opacidad y muestra el toast "Skill eliminada (solo en el prototipo)".

### 6.5 Contrataciones de agentes (`#contrataciones`)
1. **Tabla** con columnas: Contrato (ID), Cliente, Agente, Skills contratadas (chips pequeños), Fechas (inicio – fin en dos líneas), Importe pagado (alineado a la derecha, `font-semibold`), Estado (badge Activo/Finalizado), Acciones. Al menos las 6 filas de §5.4.
2. **Dropdown ⋮** con "Ver detalle" y "Cancelar contrato" (rojo).
3. **Modal "Ver detalle"** con el desglose completo: cabecera (ID, cliente, agente, estado, fechas y duración en meses) y una **tabla de desglose** con una fila por concepto: "Cuota base del agente" + una fila por skill contratada, columnas Concepto / Precio mensual / Meses / Subtotal; después Subtotal, Descuento (con nombre del cupón o "Descuento anual 10 %") y **Total pagado** destacado. Los números deben coincidir con §5.4.
4. **Cancelar contrato** cambia el badge de esa fila a "Cancelado" (`slate`) y muestra un toast.

### 6.6 Log de errores (`#errores`)
1. **Lista/tabla** de los 7 errores de §5.6, ordenados del más reciente al más antiguo. Columnas: Fecha y hora (monoespaciada), Agente, Tipo, Gravedad, Descripción, Estado, Acciones.
2. **Badges con código de color** por gravedad (Crítico rojo, Error naranja, Advertencia ámbar, Info azul) y una **leyenda** sobre la tabla con los 4 colores y su significado. El estado se muestra como badge "Abierto" (rojo suave) o "Resuelto" (verde).
3. **Dropdown ⋮** con "Ver detalle" y "Marcar como resuelto". **"Ver detalle" abre un modal** con ID, agente, tipo, gravedad, fecha y la **traza completa** en un bloque `<pre>` monoespaciado con fondo oscuro y scroll horizontal.
4. **Marcar como resuelto** cambia el badge de estado a "Resuelto", baja la opacidad de la fila al 60 % y desactiva esa opción del menú. En los errores ya resueltos, la opción aparece desactivada desde el inicio.

---

## 7. Inventario de componentes reutilizables

| Componente | Dónde aparece | Contrato de uso |
|---|---|---|
| **Sidebar** (`<aside>`+`<nav>`) | Global | 6 enlaces con icono + etiqueta; estado activo con fondo, color y `aria-current`. Colapsa a iconos en tablet. |
| **Top bar** (`<header>`) | Global | Título de sección + breadcrumb + toggle de modo + avatar. |
| **Toggle de modo oscuro** | Top bar | Añade/quita la clase `dark` en `<html>`; guarda `agenthub-theme` (`light`/`dark`) en `localStorage`; aplica el modo guardado antes de pintar (script en `<head>`). Icono sol ↔ luna. |
| **Tarjeta de métrica** | Dashboard | Icono en círculo de color + etiqueta + valor + contexto. |
| **Badge** | Todas las secciones | Pastilla redondeada con color según estado o gravedad (§3). |
| **Dropdown de acciones ⋮** | Usuarios, Agentes, Skills, Contrataciones, Errores | Botón con `aria-haspopup="menu"` y `aria-expanded`; menú `role="menu"` con `role="menuitem"`. Solo uno abierto; se cierra al elegir opción, al hacer clic fuera y con `Esc`. |
| **Modal** | Usuarios, Agentes, Skills, Contrataciones, Errores | Un único contenedor reutilizable con overlay; título, cuerpo y pie con botones. Se cierra con botón Cerrar/✕, clic en el backdrop y `Esc`; bloquea el scroll del fondo mientras está abierto; devuelve el foco al botón que lo abrió. |
| **Lista de skills colapsable** | Agentes | Botón "Skills (N)" + chevron; transición `grid-rows` 300 ms; colapsada por defecto. |
| **Tabla de datos** | Usuarios, Contrataciones, Errores | `<table>` semántica con cabecera y filas con hover suave. En tablet se ocultan columnas secundarias (`hidden lg:table-cell`) en lugar de usar scroll horizontal, porque un contenedor con scroll recortaría los menús ⋮. |
| **Toast** | Acciones eliminar/guardar/resolver | Aviso abajo a la derecha, 3 s, `role="status"`. |
| **Caja informativa** | Skills | Fondo `indigo-50`/`indigo-500/10`, icono "i", texto explicativo. |

---

## 8. Comportamiento (JavaScript vanilla, `app.js`)

- **Navegación:** clic en un enlace de la barra lateral → cambia `location.hash`; un `hashchange` muestra la `<section>` correspondiente (las demás con `hidden`), actualiza el título de la top bar y el indicador activo. Sin hash → `#dashboard`.
- **Modo oscuro:** estado único en `<html class="dark">`; como todo es una sola página, el modo se mantiene al cambiar de sección y también al recargar (localStorage).
- **Delegación de eventos:** un listener en `document` gestiona los botones `[data-dropdown]`, `[data-action]`, `[data-collapse]` y `[data-modal-close]`. Un clic fuera de cualquier `[data-menu]` abierto lo cierra.
- **Datos de detalle:** `app.js` contiene un objeto `DATA` con usuarios, agentes (incluido el prompt de sistema), skills, contratos (incluido el desglose) y errores (incluida la traza). Los modales se rellenan desde `DATA` usando el `data-id` de la fila.

---

## 9. Criterios de aceptación

1. `SPECS.md` existe en la raíz y está commiteado en un commit propio **anterior** a cualquier archivo HTML (verificable con `git log --diff-filter=A --name-only`).
2. Abrir `index.html` muestra la barra lateral con los 6 enlaces y el Dashboard como sección inicial.
3. Al pulsar cada enlace de la barra lateral se muestra su sección, el título de la top bar cambia y el enlace queda marcado como activo (fondo, color y `aria-current="page"`).
4. El Dashboard muestra 4 tarjetas de métrica con icono, etiqueta y valor: 900,60 €, 53,40 €, 4 y 1.
5. Bajo las tarjetas hay un área de ancho completo con borde discontinuo rotulada "Actividad semanal de agentes".
6. La tabla de Usuarios tiene ≥ 5 filas con nombre, email, plan y badge de estado.
7. **Dropdown:** en cada fila/tarjeta de Usuarios, Agentes, Skills, Contrataciones y Errores, el botón ⋮ abre su menú; un segundo clic en el mismo botón lo cierra.
8. **Dropdown:** con un menú abierto, un clic en cualquier punto fuera del menú lo cierra; abrir otro menú cierra el anterior; `Esc` lo cierra.
9. **Modal:** "Ver detalle" abre un modal con datos correctos en Usuarios, Skills, Contrataciones y Errores (4 secciones), y "Configurar" abre el modal del agente en Agentes.
10. **Modal:** todos los modales se cierran con el botón "Cerrar"/✕ y con un clic en el backdrop (fuera del cuadro); también con `Esc`.
11. **Modal de agente:** contiene un `<textarea>` editable con el prompt de sistema del agente; "Guardar cambios" conserva el texto editado al reabrir el modal.
12. **Colapsable:** las skills de cada agente están ocultas al cargar; un clic en "Skills (N)" las muestra con una transición visible (≈ 300 ms) y el chevron rota; otro clic las oculta.
13. **Modo oscuro:** el toggle de la top bar cambia **todo** el panel (fondo, barra lateral, tarjetas, tablas, menús y modales) entre claro y oscuro.
14. **Modo oscuro:** tras cambiar de modo, navegar a otra sección mantiene el modo elegido; al recargar la página también se conserva.
15. El modal de Contrataciones muestra el desglose de skills con precios individuales y el total coincide con la columna "Importe pagado" de la tabla.
16. El Log de errores muestra ≥ 6 entradas con timestamp, agente, badge de gravedad con color y descripción; "Marcar como resuelto" cambia el estado de la fila a "Resuelto".
17. Los nombres de agentes son idénticos en Agentes, Contrataciones y Log de errores (Atlas, Nova, Lexa, Orion, Pixel, Sage).
18. No hay atributos `style=` ni archivos `.css` en el repositorio; todos los estilos son clases de Tailwind cargado por CDN.
19. No se usa ningún framework ni librería JS: solo `app.js` vanilla.
20. El HTML usa `aside`, `nav`, `header`, `main`, `section`, `table`/`thead`/`tbody`, `dialog`-like con `role="dialog"`, y botones `<button>` para todas las acciones.
21. El layout es usable sin solaparse ni scroll horizontal de página en 1440 px (escritorio) y 768 px (tablet): en tablet la barra lateral muestra solo iconos y las tablas ocultan sus columnas secundarias (Email, Skills contratadas, Tipo) para caber en la tarjeta.

---

## 10. Fuera de alcance

Envío de formularios, búsqueda en vivo, autenticación, gráficos reales, persistencia de datos (salvo el modo de color) y navegación real entre páginas. Las acciones "Eliminar", "Cancelar contrato", "Guardar" y "Marcar como resuelto" solo cambian la vista actual.

## 11. Proceso de construcción (Algoritmo del Pintor)

1. **Estructura:** HTML semántico de las 6 secciones sin estilos.
2. **Contenido:** datos de §5 en todas las secciones.
3. **Estilo:** clases de Tailwind, modo claro/oscuro, responsive.
4. **Interacción:** `app.js` (navegación, dropdowns, modales, colapsables, toggle).
5. **Verificación:** comprobar uno a uno los criterios de §9.

La propuesta visual de **Google Stitch** generada a partir de este documento se guarda como referencia en `docs/stitch/` y no sustituye a esta especificación.
