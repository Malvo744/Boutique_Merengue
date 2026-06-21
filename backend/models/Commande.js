const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
client: {
nom: { type: String, required: true },
email: { type: String, required: true },
adresse: { type: String, required: true },
telephone: { type: String, required: true }
},
produits: [
{
produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
nom: String,
prix: Number,
quantite: Number
}
],
total: {
type: Number,
required: true
},
statut: {
type: String,
enum: ['en attente', 'confirmée', 'expédiée', 'livrée', 'annulée'],
default: 'en attente'
},
paiement: {
type: String,
enum: ['stripe', 'paypal', 'non payé'],
default: 'non payé'
},
createdAt: {
type: Date,
default: Date.now
}
});

module.exports = mongoose.model('Commande', CommandeSchema);