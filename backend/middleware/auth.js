const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Récupère le token depuis les headers
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Utilise la bonne variable d'environnement pour la clé secrète
    const userId = decodedToken.userId; // Extrait l'ID utilisateur du token
    req.userId = userId; // Ajoute l'ID utilisateur à la requête pour une utilisation ultérieure
    next(); // Passe au middleware suivant
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée !' }); // Gestion des erreurs en cas d'échec d'authentification
  }
};
