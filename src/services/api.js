// src/services/api.js
const API_BASE =
(import.meta && import.meta.env && import.meta.env.VITE_API_URL) ||
'[http://localhost:3000](http://localhost:3000/)';

/**

- Pide plantas al backend.
-
    - Si term existe => /plants?q=term
-
    - Devuelve siempre un array (o [] si algo raro)
    */
    export async function fetchPlantsApi(term = '') {
    const url = new URL('/plants', API_BASE);
    if (term && String(term).trim()) {
    url.searchParams.set('q', String(term).trim());
    }

const res = await fetch(url.toString(), {
method: 'GET',
headers: { Accept: 'application/json' },
});

if (!res.ok) {
throw new Error(`HTTP ${res.status}`);
}

const data = await res.json();
return Array.isArray(data) ? data : [];
}

/**

- Logger opcional para “caja negra” (no bloquea la UI).
- Envía eventos al backend (retorna 204).
*/
export async function logEvent(payload) {
try {
await fetch(new URL('/events', API_BASE).toString(), {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload ?? {}),
});
} catch {
// Silencioso a propósito
}
}
