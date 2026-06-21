const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
nom: {
type: String,
required: true
},
description: {
type: String,
required: true
},
prix: {
type: Number,
required: true
},
stock: {
type: Number,
required: true,
default: 0
},
image: {
type: String,
default: ''
},
categorie: {
type: String,
enum: ['cire', 'shampooing', 'huile', 'spray', 'autre'],
default: 'autre'
},
vendu: {
type: Number,
default: 0
},
createdAt: {
type: Date,
default: Date.now
}
});

module.exports = mongoose.model('Produit', ProduitSchema);