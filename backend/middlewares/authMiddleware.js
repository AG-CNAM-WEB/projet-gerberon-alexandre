// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

function authMiddleware(req, res, next) {
  // Récupérer le token JWT du header Authorization
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.id = decoded.id; // Ajouter userId à l'objet req pour les routes suivantes
    console.log('User ID du middleware : ', decoded.id);
    next(); // Autoriser la requête à passer au prochain middleware ou route
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
}

module.exports = authMiddleware;
