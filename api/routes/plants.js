// api/routes/plants.js
const express = require('express');
const router = express.Router();

// Importa el JSON con tus plantas (ruta relativa a ESTE archivo)
const plants = require('../data/plants.json');

// GET /plants → lista completa
router.get('/', (_req, res) => {
res.json(plants);
});

// GET /plants/:id → detalle por id
router.get('/:id', (req, res) => {
const id = Number(req.params.id);
const plant = plants.find (p => (p.id === id));
if (!plant) return res.status(404).json({ error: 'Plant not found' });
res.json(plant);
});

module.exports = router;
