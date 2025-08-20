// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// ==== Middlewares ====
app.use(cors({ origin: process.env.CORS_ORIGIN }));   // o simplemente: app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ==== Healthcheck ====
app.get('/health', (_req, res) => res.json({ ok: true }));

// ==== Rutas ====
const plantsRouter = require('./routes/plants');       // api/routes/plants.js
app.use('/plants', plantsRouter);

// Raíz informativa (opcional)
app.get('/', (_req, res) =>
res.send('API viva. Prueba /health o /plants')
);

// 404 por defecto (SIEMPRE el último)
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// ==== Arranque ====
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

console.log(`API escuchando en http://localhost:${PORT}`);
console.log(`Healthcheck en       http://localhost:${PORT}/health`);
console.log(`API escuchando en http://localhost:${PORT}/plants`)
});
