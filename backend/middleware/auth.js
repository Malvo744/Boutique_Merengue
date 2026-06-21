const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
try {
// Récupérer le token dans le header
const token = req.headers.authorization?.split(' ')[1];

if (!token) {
return res.status(401).json({ message: 'Accès refusé, token manquant' });
}

// Vérifier le token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.admin = decoded;
next();

} catch (err) {
res.status(401).json({ message: 'Token invalide' });
}
};