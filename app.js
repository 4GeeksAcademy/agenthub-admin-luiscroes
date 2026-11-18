/* AgentHub admin panel prototype — vanilla JS only (see SPECS.md §8) */
'use strict';

// Hardcoded detail data used by the modals (same source as the tables in index.html)
const DATA = {
  "baseFee": 99.0,
  "users": {
    "U-01": {
      "id": "U-01",
      "name": "Marta Ruiz",
      "company": "Clínica Sonrisa",
      "email": "marta.ruiz@clinicasonrisa.example",
      "plan": "Pro",
      "status": "Activo",
      "joined": "12/02/2026"
    },
    "U-02": {
      "id": "U-02",
      "name": "Javier Ortega",
      "company": "Ortega Legal",
      "email": "j.ortega@ortegalegal.example",
      "plan": "Enterprise",
      "status": "Activo",
      "joined": "03/01/2026"
    },
    "U-03": {
      "id": "U-03",
      "name": "Lucía Fernández",
      "company": "Tienda Verde",
      "email": "lucia@tiendaverde.example",
      "plan": "Starter",
      "status": "Activo",
      "joined": "21/04/2026"
    },
    "U-04": {
      "id": "U-04",
      "name": "Andrés Molina",
      "company": "DataLogic",
      "email": "andres.molina@datalogic.example",
      "plan": "Pro",
      "status": "Suspendido",
      "joined": "09/03/2026"
    },
    "U-05": {
      "id": "U-05",
      "name": "Carmen Vidal",
      "company": "Vidal Consulting",
      "email": "carmen@vidalconsulting.example",
      "plan": "Pro",
      "status": "Activo",
      "joined": "30/05/2026"
    },
    "U-06": {
      "id": "U-06",
      "name": "Sergio Navarro",
      "company": "Navarro Reformas",
      "email": "sergio@navarroreformas.example",
      "plan": "Starter",
      "status": "Pendiente",
      "joined": "16/11/2026"
    }
  },
  "skills": {
    "web": {
      "id": "web",
      "name": "Navegación web",
      "desc": "Busca y extrae información de sitios web públicos.",
      "price": 49.0
    },
    "docs": {
      "id": "docs",
      "name": "Lectura de documentos",
      "desc": "Lee y resume PDF, Word y hojas de cálculo.",
      "price": 39.0
    },
    "cal": {
      "id": "cal",
      "name": "Gestión de calendario",
      "desc": "Crea, mueve y confirma citas en Google Calendar u Outlook.",
      "price": 29.0
    },
    "mail": {
      "id": "mail",
      "name": "Envío de emails",
      "desc": "Redacta y envía correos desde la cuenta del cliente.",
      "price": 19.0
    },
    "data": {
      "id": "data",
      "name": "Análisis de datos",
      "desc": "Calcula métricas y genera informes a partir de tablas.",
      "price": 59.0
    },
    "support": {
      "id": "support",
      "name": "Atención al cliente",
      "desc": "Responde consultas en el chat/CRM con el tono de la marca.",
      "price": 45.0
    }
  },
  "agents": {
    "atlas": {
      "id": "atlas",
      "name": "Atlas",
      "owner": "U-02",
      "status": "Activo",
      "skills": [
        "web",
        "docs",
        "data"
      ],
      "prompt": "Eres Atlas, el analista de investigación de Ortega Legal. Buscas jurisprudencia y noticias en fuentes web públicas, lees los documentos que te comparte el despacho y preparas resúmenes con cifras clave. Cita siempre la fuente y responde en español formal."
    },
    "nova": {
      "id": "nova",
      "name": "Nova",
      "owner": "U-01",
      "status": "Activo",
      "skills": [
        "cal",
        "mail"
      ],
      "prompt": "Eres Nova, la asistente de citas de Clínica Sonrisa. Gestionas la agenda de los dentistas en Google Calendar, confirmas citas por email 24 h antes y nunca das información médica: si el paciente pregunta por un tratamiento, deriva a recepción."
    },
    "lexa": {
      "id": "lexa",
      "name": "Lexa",
      "owner": "U-02",
      "status": "Fallando",
      "skills": [
        "docs",
        "mail"
      ],
      "prompt": "Eres Lexa, la asistente documental de Ortega Legal. Lees contratos en PDF, extraes partes, fechas y cláusulas de penalización, y envías un resumen por email al abogado responsable. Si un documento no tiene texto legible, avisa en lugar de inventar."
    },
    "orion": {
      "id": "orion",
      "name": "Orion",
      "owner": "U-03",
      "status": "Activo",
      "skills": [
        "support",
        "mail",
        "web"
      ],
      "prompt": "Eres Orion, el agente de atención al cliente de Tienda Verde. Respondes dudas sobre pedidos, envíos y devoluciones con un tono cercano, consultas el estado del pedido en el CRM y escalas a una persona cualquier reclamación de más de 100 €."
    },
    "pixel": {
      "id": "pixel",
      "name": "Pixel",
      "owner": "U-04",
      "status": "Inactivo",
      "skills": [
        "data",
        "docs"
      ],
      "prompt": "Eres Pixel, el analista de datos de DataLogic. Cada lunes lees las hojas de ventas, calculas variaciones semanales y generas un informe con las tres conclusiones más relevantes. No modifiques nunca los archivos originales."
    },
    "sage": {
      "id": "sage",
      "name": "Sage",
      "owner": "U-05",
      "status": "Activo",
      "skills": [
        "mail",
        "cal",
        "support"
      ],
      "prompt": "Eres Sage, la asistente ejecutiva de Vidal Consulting. Gestionas la agenda de Carmen, respondes emails de clientes con plantillas aprobadas y atiendes el chat de la web en horario laboral. Mantén un tono profesional y breve."
    }
  },
  "contracts": {
    "C-1001": {
      "id": "C-1001",
      "client": "U-01",
      "agent": "nova",
      "skills": [
        "cal",
        "mail"
      ],
      "start": "01/09/2026",
      "end": "28/02/2027",
      "months": 6,
      "discount": null,
      "status": "Activo"
    },
    "C-1002": {
      "id": "C-1002",
      "client": "U-02",
      "agent": "lexa",
      "skills": [
        "docs",
        "mail"
      ],
      "start": "15/07/2026",
      "end": "14/01/2027",
      "months": 6,
      "discount": null,
      "status": "Activo"
    },
    "C-1003": {
      "id": "C-1003",
      "client": "U-02",
      "agent": "atlas",
      "skills": [
        "web",
        "docs",
        "data"
      ],
      "start": "01/10/2026",
      "end": "30/09/2027",
      "months": 12,
      "discount": {
        "label": "Descuento anual 10 %",
        "pct": 10
      },
      "status": "Activo"
    },
    "C-1004": {
      "id": "C-1004",
      "client": "U-03",
      "agent": "orion",
      "skills": [
        "support",
        "mail",
        "web"
      ],
      "start": "01/11/2026",
      "end": "30/04/2027",
      "months": 6,
      "discount": null,
      "status": "Activo"
    },
    "C-1005": {
      "id": "C-1005",
      "client": "U-04",
      "agent": "pixel",
      "skills": [
        "data",
        "docs"
      ],
      "start": "01/03/2026",
      "end": "31/08/2026",
      "months": 6,
      "discount": null,
      "status": "Finalizado"
    },
    "C-1006": {
      "id": "C-1006",
      "client": "U-05",
      "agent": "sage",
      "skills": [
        "mail",
        "cal",
        "support"
      ],
      "start": "01/06/2026",
      "end": "30/11/2026",
      "months": 6,
      "discount": {
        "label": "Cupón BIENVENIDA15 (15 %)",
        "pct": 15
      },
      "status": "Activo"
    }
  },
  "errors": {
    "E-207": {
      "id": "E-207",
      "ts": "18/11/2026 09:42:13",
      "agent": "lexa",
      "type": "Fallo de ejecución",
      "severity": "Crítico",
      "desc": "El agente se detuvo al leer un PDF escaneado sin capa de texto.",
      "status": "Abierto",
      "trace": "AgentRuntimeError: document has no text layer\n  at DocReader.extractText (skills/docs/reader.ts:118:15)\n  at DocReader.read (skills/docs/reader.ts:64:22)\n  at Agent.runStep (core/agent.ts:211:9)\n  at Scheduler.execute (core/scheduler.ts:87:5)\ncontext: agent=Lexa contract=C-1002 file=contrato_arrendamiento_2026.pdf pages=84\nresult: run aborted after 3 retries (exit code 1)"
    },
    "E-206": {
      "id": "E-206",
      "ts": "18/11/2026 08:15:02",
      "agent": "lexa",
      "type": "Timeout",
      "severity": "Error",
      "desc": "La lectura del documento superó el límite de 120 s.",
      "status": "Abierto",
      "trace": "TimeoutError: step 'docs.read' exceeded 120000 ms\n  at withTimeout (core/utils/timeout.ts:22:11)\n  at Agent.runStep (core/agent.ts:205:18)\n  at Scheduler.execute (core/scheduler.ts:87:5)\ncontext: agent=Lexa contract=C-1002 file=anexo_II_garantias.pdf size=38.4 MB\nresult: step cancelled, email summary not sent"
    },
    "E-205": {
      "id": "E-205",
      "ts": "17/11/2026 22:03:47",
      "agent": "orion",
      "type": "Límite de API",
      "severity": "Advertencia",
      "desc": "Se alcanzó el límite de 60 peticiones/min del CRM.",
      "status": "Abierto",
      "trace": "RateLimitError: HTTP 429 Too Many Requests\n  at CrmClient.request (skills/support/crm.ts:52:13)\n  at SupportSkill.lookupOrder (skills/support/index.ts:97:20)\n  at Agent.runStep (core/agent.ts:211:9)\ncontext: agent=Orion contract=C-1004 endpoint=/orders/search retry-after=42s\nresult: 14 queued replies delayed, retried successfully at 22:04:31"
    },
    "E-204": {
      "id": "E-204",
      "ts": "17/11/2026 16:30:10",
      "agent": "nova",
      "type": "Autenticación",
      "severity": "Error",
      "desc": "Token de Google Calendar caducado; no se pudo crear la cita.",
      "status": "Abierto",
      "trace": "AuthError: invalid_grant (token expired or revoked)\n  at GoogleCalendar.refreshToken (skills/calendar/google.ts:41:9)\n  at CalendarSkill.createEvent (skills/calendar/index.ts:73:14)\n  at Agent.runStep (core/agent.ts:211:9)\ncontext: agent=Nova contract=C-1001 calendar=dentistas@clinicasonrisa.example\nresult: appointment not created, client must reconnect Google account"
    },
    "E-203": {
      "id": "E-203",
      "ts": "16/11/2026 11:12:55",
      "agent": "atlas",
      "type": "Parsing",
      "severity": "Advertencia",
      "desc": "No se pudo extraer la tabla de precios de la web objetivo.",
      "status": "Resuelto",
      "trace": "ParseError: selector 'table.pricing' matched 0 elements\n  at WebSkill.extractTable (skills/web/extract.ts:66:17)\n  at Agent.runStep (core/agent.ts:211:9)\ncontext: agent=Atlas contract=C-1003 url=https://competidor.example/tarifas\nresult: fallback to plain-text extraction; resolved after selector update"
    },
    "E-202": {
      "id": "E-202",
      "ts": "15/11/2026 19:48:31",
      "agent": "sage",
      "type": "Timeout",
      "severity": "Advertencia",
      "desc": "El servidor SMTP tardó más de 30 s en responder.",
      "status": "Resuelto",
      "trace": "TimeoutError: SMTP connection timed out after 30000 ms\n  at SmtpTransport.connect (skills/mail/smtp.ts:29:13)\n  at MailSkill.send (skills/mail/index.ts:58:11)\n  at Agent.runStep (core/agent.ts:211:9)\ncontext: agent=Sage contract=C-1006 host=smtp.vidalconsulting.example:587\nresult: message re-sent on retry #2 at 19:49:05"
    },
    "E-201": {
      "id": "E-201",
      "ts": "14/11/2026 07:05:09",
      "agent": "pixel",
      "type": "Ejecución omitida",
      "severity": "Info",
      "desc": "Ejecución programada omitida: agente inactivo (cuenta suspendida).",
      "status": "Abierto",
      "trace": "SchedulerNotice: run skipped\n  at Scheduler.shouldRun (core/scheduler.ts:44:7)\ncontext: agent=Pixel owner=DataLogic account_status=Suspendido schedule='0 7 * * MON'\nresult: no run; will resume when the account is reactivated"
    }
  }
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const eur = (v) => v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: 'always' }) + ' €';
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initials = (n) => { const p = n.split(' '); return (p[0][0] + p[p.length - 1][0]).toUpperCase(); };

const TONE = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30',
  red: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/30',
  amber: 'bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30',
  orange: 'bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/30',
  sky: 'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30',
  slate: 'bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-400/30',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/30',
  violet: 'bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/30',
};
const STATUS_TONE = { Activo: 'emerald', Inactivo: 'slate', Fallando: 'red', Suspendido: 'amber', Pendiente: 'sky', Finalizado: 'slate', Resuelto: 'emerald', Abierto: 'red', Cancelado: 'slate' };
const SEV_TONE = { 'Crítico': 'red', Error: 'orange', Advertencia: 'amber', Info: 'sky' };
const PLAN_TONE = { Starter: 'slate', Pro: 'indigo', Enterprise: 'violet' };
const BADGE = 'inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset';
const badge = (text, tone) => `<span class="${BADGE} ${TONE[tone]}">${esc(text)}</span>`;
const MUTED = 'text-slate-500 dark:text-slate-400';

/* ---------------- 1. Navigation (hash based, single page) ---------------- */
const SECTIONS = $$('[data-section]').map((s) => s.id);
const NAV_ACTIVE = ['bg-indigo-50', 'text-indigo-700', 'dark:bg-indigo-500/10', 'dark:text-indigo-300'];

function showSection() {
  const id = SECTIONS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'dashboard';
  $$('[data-section]').forEach((s) => s.classList.toggle('hidden', s.id !== id));
  const section = document.getElementById(id);
  $('#page-title').textContent = section.dataset.title;
  $('#page-crumb').textContent = section.dataset.title;
  document.title = `${section.dataset.title} · AgentHub`;
  $$('[data-nav]').forEach((a) => {
    const active = a.dataset.nav === id;
    NAV_ACTIVE.forEach((c) => a.classList.toggle(c, active));
    $('[data-indicator]', a).classList.toggle('hidden', !active);
    if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  closeAllMenus();
  $('#main').scrollIntoView({ block: 'start' });
}
window.addEventListener('hashchange', showSection);

/* ---------------- 2. Dark mode toggle (persists across sections + reloads) ---------------- */
function syncThemeButton() {
  const dark = document.documentElement.classList.contains('dark');
  $('#theme-toggle').setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}
$('#theme-toggle').addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('agenthub-theme', dark ? 'dark' : 'light'); } catch (e) { /* storage unavailable: mode still applies to this session */ }
  syncThemeButton();
});

/* ---------------- 3. Action dropdowns ⋮ ---------------- */
function closeAllMenus(except) {
  $$('[data-dropdown-root]').forEach((root) => {
    if (root === except) return;
    $('[data-menu]', root).classList.add('hidden');
    $('[data-dropdown]', root).setAttribute('aria-expanded', 'false');
  });
}
function toggleMenu(button) {
  const root = button.closest('[data-dropdown-root]');
  const menu = $('[data-menu]', root);
  const willOpen = menu.classList.contains('hidden');
  closeAllMenus(root);
  menu.classList.toggle('hidden', !willOpen);
  button.setAttribute('aria-expanded', String(willOpen));
  if (willOpen) { const first = $('[role="menuitem"]:not([disabled])', menu); if (first) first.focus(); }
}

/* ---------------- 4. Modal (single reusable dialog) ---------------- */
const modal = $('#modal');
let lastTrigger = null;
function openModal({ title, body, footer }) {
  $('#modal-title').textContent = title;
  $('#modal-body').innerHTML = body;
  $('#modal-footer').innerHTML = footer || '<button type="button" data-modal-close class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400">Cerrar</button>';
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overflow-hidden');
  const focusTarget = $('textarea', modal) || $('[data-modal-close]', modal);
  focusTarget.focus();
}
function closeModal() {
  if (modal.classList.contains('hidden')) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('overflow-hidden');
  if (lastTrigger) lastTrigger.focus();
}

const dl = (rows) => `<dl class="grid grid-cols-3 gap-x-4 gap-y-3">${rows.map(([k, v]) => `<dt class="${MUTED}">${k}</dt><dd class="col-span-2 font-medium">${v}</dd>`).join('')}</dl>`;

/* ---------------- 5. Toast ---------------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('opacity-0', 'translate-y-2');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('opacity-0', 'translate-y-2'), 3000);
}
function fadeRemove(row, after) {
  row.classList.add('opacity-0');
  setTimeout(() => { row.remove(); if (after) after(); }, 300);
}
function setStatus(row, status) {
  const el = $('[data-status]', row);
  el.className = `${BADGE} ${TONE[STATUS_TONE[status]]}`;
  el.textContent = status;
}

/* ---------------- 6. Action handlers ---------------- */
const ACTIONS = {
  'user-detail'(id) {
    const u = DATA.users[id];
    const agents = Object.values(DATA.agents).filter((a) => a.owner === id);
    const contracts = Object.values(DATA.contracts).filter((c) => c.client === id);
    openModal({
      title: 'Detalle de usuario',
      body: `<div class="mb-5 flex items-center gap-4"><span class="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">${initials(u.name)}</span>
             <div><p class="text-base font-semibold">${esc(u.name)}</p><p class="${MUTED}">${esc(u.company)} · ${u.id}</p></div></div>` +
        dl([
          ['Email', esc(u.email)],
          ['Plan', badge(u.plan, PLAN_TONE[u.plan])],
          ['Estado', badge(u.status, STATUS_TONE[u.status])],
          ['Fecha de alta', u.joined],
          ['Agentes', agents.length ? agents.map((a) => esc(a.name)).join(', ') : '—'],
          ['Contratos', contracts.length ? contracts.map((c) => c.id).join(', ') : '—'],
        ]),
    });
  },
  'user-delete'(id) {
    fadeRemove($(`[data-row="${id}"]`), () => { $('[data-count="users"]').textContent = $$('#usuarios tbody tr').length; });
    toast('Usuario eliminado (solo en el prototipo)');
  },
  'agent-config'(id) {
    const a = DATA.agents[id]; const o = DATA.users[a.owner];
    openModal({
      title: `Configurar agente · ${a.name}`,
      body: dl([
          ['Estado', badge(a.status, STATUS_TONE[a.status])],
          ['Propietario', `${esc(o.name)} · ${esc(o.company)}`],
          ['Skills', `<div class="flex flex-wrap gap-1">${a.skills.map((s) => badge(DATA.skills[s].name, 'indigo')).join('')}</div>`],
        ]) +
        `<label for="agent-prompt" class="mt-5 block text-sm font-medium">Prompt de sistema</label>
         <textarea id="agent-prompt" rows="8" class="mt-2 w-full rounded-lg border border-slate-300 bg-white p-3 font-mono text-xs leading-relaxed text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">${esc(a.prompt)}</textarea>`,
      footer: `<button type="button" data-modal-close class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Cancelar</button>
               <button type="button" data-action="agent-save" data-id="${id}" class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400">Guardar cambios</button>`,
    });
  },
  'agent-save'(id) {
    DATA.agents[id].prompt = $('#agent-prompt').value;
    closeModal();
    toast('Prompt guardado (solo en el prototipo)');
  },
  'agent-delete'(id) {
    fadeRemove($(`[data-row="${id}"]`));
    toast(`Agente ${DATA.agents[id].name} eliminado (solo en el prototipo)`);
  },
  'skill-detail'(id) {
    const s = DATA.skills[id];
    const agents = Object.values(DATA.agents).filter((a) => a.skills.includes(id));
    openModal({
      title: `Skill · ${s.name}`,
      body: `<p class="mb-5 ${MUTED}">${esc(s.desc)}</p>` +
        dl([['Precio', `${eur(s.price)} /mes`], ['Agentes con la skill', String(agents.length)]]) +
        `<h3 class="mb-2 mt-6 text-sm font-semibold">Agentes que la tienen habilitada</h3>
         <ul class="divide-y divide-slate-100 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">${agents.map((a) =>
          `<li class="flex items-center justify-between px-3 py-2"><span><span class="font-medium">${esc(a.name)}</span> <span class="${MUTED}">· ${esc(DATA.users[a.owner].company)}</span></span>${badge(a.status, STATUS_TONE[a.status])}</li>`).join('')}</ul>`,
    });
  },
  'skill-delete'(id) {
    fadeRemove($(`[data-row="${id}"]`));
    toast('Skill eliminada (solo en el prototipo)');
  },
  'contract-detail'(id) {
    const c = DATA.contracts[id]; const u = DATA.users[c.client]; const a = DATA.agents[c.agent];
    const lines = [{ name: 'Cuota base del agente', price: DATA.baseFee }, ...c.skills.map((s) => ({ name: `Skill · ${DATA.skills[s].name}`, price: DATA.skills[s].price }))];
    const subtotal = lines.reduce((t, l) => t + l.price * c.months, 0);
    const discount = c.discount ? Math.round(subtotal * c.discount.pct) / 100 : 0;
    const row = (cells, cls = '') => `<tr class="border-t border-slate-100 dark:border-slate-800 ${cls}">${cells}</tr>`;
    openModal({
      title: `Contrato ${c.id}`,
      body: dl([
          ['Cliente', `${esc(u.company)} <span class="${MUTED}">(${esc(u.name)})</span>`],
          ['Agente', esc(a.name)],
          ['Estado', badge($(`[data-row="${id}"] [data-status]`).textContent, STATUS_TONE[$(`[data-row="${id}"] [data-status]`).textContent])],
          ['Periodo', `${c.start} – ${c.end} (${c.months} meses)`],
        ]) +
        `<h3 class="mb-2 mt-6 text-sm font-semibold">Desglose del contrato</h3>
         <table class="w-full text-sm"><thead><tr class="text-left text-xs uppercase tracking-wide ${MUTED}"><th class="py-2 font-semibold">Concepto</th><th class="py-2 text-right font-semibold">Precio/mes</th><th class="py-2 text-right font-semibold">Meses</th><th class="py-2 text-right font-semibold">Subtotal</th></tr></thead><tbody>` +
        lines.map((l) => row(`<td class="py-2">${esc(l.name)}</td><td class="py-2 text-right">${eur(l.price)}</td><td class="py-2 text-right">${c.months}</td><td class="py-2 text-right">${eur(l.price * c.months)}</td>`)).join('') +
        row(`<td class="py-2 font-medium" colspan="3">Subtotal</td><td class="py-2 text-right font-medium">${eur(subtotal)}</td>`) +
        row(`<td class="py-2" colspan="3">Descuento${c.discount ? ` · ${esc(c.discount.label)}` : ''}</td><td class="py-2 text-right text-amber-700 dark:text-amber-300">${discount ? '−' + eur(discount) : eur(0)}</td>`) +
        row(`<td class="py-3 text-base font-semibold" colspan="3">Total pagado</td><td class="py-3 text-right text-base font-bold text-indigo-700 dark:text-indigo-300">${eur(subtotal - discount)}</td>`) +
        `</tbody></table>`,
    });
  },
  'contract-cancel'(id) {
    const r = $(`[data-row="${id}"]`);
    setStatus(r, 'Cancelado');
    $(`[data-action="contract-cancel"][data-id="${id}"]`).disabled = true;
    toast(`Contrato ${id} cancelado (solo en el prototipo)`);
  },
  'error-detail'(id) {
    const x = DATA.errors[id];
    const status = $(`[data-row="${id}"] [data-status]`).textContent;
    openModal({
      title: `Error ${x.id} · ${DATA.agents[x.agent].name}`,
      body: dl([
          ['Agente', esc(DATA.agents[x.agent].name)],
          ['Tipo', esc(x.type)],
          ['Gravedad', badge(x.severity, SEV_TONE[x.severity])],
          ['Fecha y hora', x.ts],
          ['Estado', badge(status, STATUS_TONE[status])],
          ['Descripción', esc(x.desc)],
        ]) +
        `<h3 class="mb-2 mt-6 text-sm font-semibold">Traza completa</h3>
         <pre class="overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100">${esc(x.trace)}</pre>`,
    });
  },
  'error-resolve'(id) {
    const r = $(`[data-row="${id}"]`);
    setStatus(r, 'Resuelto');
    r.classList.add('opacity-60');
    $(`[data-action="error-resolve"][data-id="${id}"]`).disabled = true;
    toast(`Error ${id} marcado como resuelto`);
  },
};

/* ---------------- 7. Collapsible skills list ---------------- */
function toggleCollapse(button) {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  const open = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(open));
  panel.classList.toggle('grid-rows-[0fr]', !open);
  panel.classList.toggle('grid-rows-[1fr]', open);
  panel.classList.toggle('opacity-0', !open);
  panel.classList.toggle('opacity-100', open);
  $('[data-chevron]', button).classList.toggle('rotate-180', open);
}

/* ---------------- 8. Event delegation ---------------- */
document.addEventListener('click', (ev) => {
  const t = ev.target;
  const dd = t.closest('[data-dropdown]');
  if (dd) { toggleMenu(dd); return; }

  const act = t.closest('[data-action]');
  if (act && !act.disabled) {
    if (act.closest('[data-menu]')) lastTrigger = $('[data-dropdown]', act.closest('[data-dropdown-root]'));
    closeAllMenus();
    ACTIONS[act.dataset.action](act.dataset.id);
    return;
  }

  const col = t.closest('[data-collapse]');
  if (col) { toggleCollapse(col); return; }

  if (t.closest('[data-modal-close]') || t.closest('[data-modal-backdrop]')) { closeModal(); return; }

  // Click outside any open menu closes it
  if (!t.closest('[data-menu]')) closeAllMenus();
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') { closeAllMenus(); closeModal(); }
});

/* ---------------- 9. Init ---------------- */
syncThemeButton();
showSection();
