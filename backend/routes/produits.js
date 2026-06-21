const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');
const auth = require('../middleware/auth');

// GET /api/produits — Public
router.get('/', async (req, res) => {
try {
const produits = await Produit.find();
res.json(produits);
} catch (err) {
res.status(500).json({ message: 'Erreur serveur' });
}
});

// GET /api/produits/:id — Public
router.get('/:id', async (req, res) => {
try {
const produit = await Produit.findById(req.params.id);
if (!produit) return res.status(404).json({ message: 'Produit introuvable' });
res.json(produit);
} catch (err) {
res.status(500).json({ message: 'Erreur serveur' });
}
});

// POST /api/produits — Admin seulement
router.post('/', auth, async (req, res) => {
try {
const produit = new Produit(req.body);
await produit.save();
res.status(201).json(produit);
} catch (err) {
res.status(500).json({ message: 'Erreur serveur' });
}
});

// PUT /api/produits/:id — Admin seulement
router.put('/:id', auth, async (req, res) => {
try {
const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(produit);
} catch (err) {
res.status(500).json({ message: 'Erreur serveur' });
}
});

// DELETE /api/produits/:id — Admin seulement
router.delete('/:id', auth, async (req, res) => {
try {
await Produit.findByIdAndDelete(req.params.id);
res.json({ message: 'Produit supprimé' });
} catch (err) {
res.status(500).json({ message: 'Erreur serveur' });
}
});

module.exports = router;