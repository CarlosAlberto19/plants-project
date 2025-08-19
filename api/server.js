// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// ==== Middlewares ====
app.use(cors({ origin: '[http://localhost:5173](http://localhost:5173/)' })); // opcional: restringe CORS
app.use(express.json());

// ==== Healthcheck ====
app.get('/health', (_req, res) => res.json({ ok: true }));

// ==== Rutas ====
let plantsRouter;
try {
plantsRouter = require('./routes/plants'); // api/routes/plants.js
} catch {
// Fallback temporal si aún no existe la ruta real
plantsRouter = express.Router();
plantsRouter.get('/', (_req, res) => res.json([]));
}

app.get('/', (_req, res) => res.send('API viva. Prueba /health o /plants'));
app.use('/plants', plantsRouter);

// ==== 404 por defecto ====
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// ==== Arranque ====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log('API lista en:');
console.log(`http://localhost:${PORT}/health`);
});
