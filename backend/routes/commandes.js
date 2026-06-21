const express = require('express');
const router = express.Router();
const Commande = require('../models/Commande');
const Produit = require('../models/Produit');
const auth = require('../middleware/auth');

// POST /api/commandes — Public (créer une commande)
router.post('/', async (req, res) => {
try {
const commande = new Commande(req.body);
await commande.save();

// Mettre à jour le stock et les ventes
for (const item of commande.produits) {
await Produit.findByIdAndUpdate(item.produit, {
$inc: { stock: -item.quantite, vendu: +item.quantite }
});
}

res.status(201).json(commande);
} catch (err) {
res.status(500).json({ message: 'Erreur serveur' });
}
});

// GET /api/commandes — Admin seulement
router.get('/', auth, async (req, res) => {
try {
const commandes = await Commande.find().sort({ createdAt: -1 });
res.json(commandes);
} catch (err) {
res.status(500).json({ message: 'Erreur serveur' });
}
});

// PUT /api/commandes/:id — Admin seulement (modifier statut)
router.put('/:id', auth, async (req, res) => {
try {
const commande = await Commande.findByIdAndUpdate(
req.params.id,
{ statut: req.body.statut },
{ new: true }
);
res.json(commande);
} catch (err) {
res.status(500).json({ message: 'Erreur serveur' });
}
});

// GET /api/commandes/stats — Admin seulement
router.get('/stats', auth, async (req, res) => {
try {
const totalCommandes = await Commande.countDocuments();
const chiffreAffaires = await Commande.aggregate([
{ $group: { _id: null, total: { $sum: '$total' } } }
]);
const commandesParStatut = await Commande.aggregate([
{ $group: { _id: '$statut', count: { $sum: 1 } } }
]);

res.json({
totalCommandes,
chiffreAffaires: chiffreAffaires[0]?.total || 0,
commandesParStatut
});
} catch (err) {
res.status(500).json({ message: 'Erreur serveur' });
}
});

module.exports = router;