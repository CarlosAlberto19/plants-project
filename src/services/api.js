export async function fetchPlants({ q = '' } = {}) {
const base = import.meta.env.VITE_API_URL;  // ← lee VITE_API_URL
const url = new URL('/plants', base);       // http://localhost:3000/plants
if (q) url.searchParams.set('q', q);        // añade ?q=term si hace falta

const res = await fetch(url.toString());
if (!res.ok) throw new Error('Error cargando plantas');
return await res.json();
}
