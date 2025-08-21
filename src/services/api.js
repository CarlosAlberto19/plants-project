// src/services/api.js
const BASE = import.meta.env.VITE_API_URL || '[http://localhost:3000](http://localhost:3000/)';

// === 1) SIGUE IGUAL: buscar plantas (con ?q=...) ===
export async function fetchPlants(term = '') {
const url = new URL('/plants', BASE);
if (term && term.trim()) url.searchParams.set('q', term.trim());
const res = await fetch(url.toString());
if (!res.ok) throw new Error(`HTTP ${res.status}`);
return await res.json();
}

// === 2) NUEVO: enviar eventos al backend ===
export async function logEvent(payload) {
try {
await fetch(`${BASE}/events`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
// no rompemos la UI si falla el log
} catch (e) {
console.warn('logEvent (ignorado):', e);
}
}
