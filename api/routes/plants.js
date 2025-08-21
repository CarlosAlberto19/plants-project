// api/routes/plants.js
const express = require('express');
const router = express.Router();

// Importa el JSON con tus plantas (carga el mock desde ruta)
const plants = require('../data/plants.json');

// GET /plants → lista completa
router.get('/', (req, res) => {
const q = (req.query.q || '').toLowerCase().trim();
const results = q
? plants.filter(p => p.name.toLowerCase().includes(q))
: plants;
res.json(results);
});
// GET /plants/:id → detalle por id
router.get('/:id', (req, res) => {
const id = Number(req.params.id);
if (Number.isNan(id)) return res.status(400).json ({error: 'Bad id'});
const plant = plants.find (p => (p.id === id));
if (!plant) return res.status(404).json({ error: 'Plant not found' });
res.json(plant);
});

module.exports = router;
