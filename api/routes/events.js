const express = require('express');
const router = express.Router();

// POST /events
router.post('/', (req, res) => {
console.log('[FE EVENT]', req.body);
res.status(204).end(); // 204 = no content
});

// GET /events/ping (solo para probar)
router.get('/ping', (_req, res) => res.json({ ok: true }));

module.exports = router;
