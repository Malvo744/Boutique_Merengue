const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

router.post('/login', async (req, res) => {
console.log('LOGIN appelé', req.body);
try {
const { email, password } = req.body;
const admin = await Admin.findOne({ email });
if (!admin) {
return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
}
const isMatch = await admin.comparePassword(password);
if (!isMatch) {
return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
}
const token = jwt.sign(
{ id: admin._id },
process.env.JWT_SECRET,
{ expiresIn: '24h' }
);
res.json({ token, message: 'Connexion réussie' });
} catch (err) {
console.log('ERREUR LOGIN:', err);
res.status(500).json({ message: err.message });
}
});

router.post('/setup', async (req, res) => {
console.log('SETUP appelé', req.body);
try {
const existingAdmin = await Admin.findOne();
console.log('Admin existant:', existingAdmin);
if (existingAdmin) {
return res.status(400).json({ message: 'Admin déjà configuré' });
}
const { email, password } = req.body;
console.log('Création admin:', email);
const admin = new Admin({ email, password });
await admin.save();
console.log('Admin sauvegardé !');
res.json({ message: 'Admin créé avec succès' });
} catch (err) {
console.log('ERREUR SETUP:', err);
res.status(500).json({ message: err.message });
}
});

module.exports = router;