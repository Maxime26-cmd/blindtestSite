const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/db'); 
const upload = require("../config/multerConfig");


// Middleware pour valider les champs d'inscription
exports.signup = [
    // Validation des champs
    body('email')
        .isEmail().withMessage('Doit être un e-mail valide.'),
    body('password')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères.')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule.')
        .matches(/[0-9]/).withMessage('Le mot de passe doit contenir au moins un chiffre.')
        .matches(/[\W_]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial.'),

    // Fonction principale d'inscription
    async (req, res, next) => {
        // Vérification des erreurs de validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Hachage du mot de passe
            const hash = await bcrypt.hash(password, 10);
            
            // Création de l'utilisateur
            const query = 'INSERT INTO users (user_email, user_password, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
            db.query(query, [email, hash], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
                }
                return res.status(201).json({ message: 'Utilisateur créé !' });
            });
        } catch (error) {
            // Gérer les erreurs
            console.error(error);
            return res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
        }
    }
];

// Connexion
exports.login = (req, res, next) => {
    // Vérifiez que les champs d'entrée existent
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    // Recherchez l'utilisateur dans la base de données
    const query = 'SELECT * FROM users WHERE user_email = ?';
    db.query(query, [req.body.email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la requête SQL.' });
        }

        // Si l'utilisateur n'est pas trouvé
        if (results.length === 0) {
            return res.status(401).json({ message: 'Utilisateur non trouvé !' });
        }

        const user = results[0]; // L'utilisateur trouvé

        // Vérifiez le mot de passe
        bcrypt.compare(req.body.password, user.user_password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Mot de passe incorrect !' });
                }

                // Génération d'un token
                const token = jwt.sign(
                    { userId: user.user_id }, // Utilisez user_id ici
                    process.env.JWT_SECRET, // Assurez-vous que cette variable est dans votre .env
                    { expiresIn: '24h' }
                );

                // Envoi de l'user_id et du token
                res.status(200).json({ userId: user.user_id, token });

                // Optionnel: stocker le userId dans le localStorage côté client
                // Cela devrait être fait dans le frontend
            })
            .catch(error => res.status(500).json({ error: 'Erreur lors de la vérification du mot de passe.' }));
    });
};






exports.uploadProfilePicture = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucune image uploadée.' });
    }
  
    const imagePath = req.file.path; // Chemin de l'image uploadée
    const userId = req.userId; // ID de l'utilisateur extrait du token
  
    // Ici, tu peux mettre à jour la base de données avec le chemin de l'image et l'ID de l'utilisateur
    const query = 'UPDATE users SET profile_image = ? WHERE user_id = ?';
    
    db.query(query, [imagePath, userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'image de profil.' });
      }
  
      res.status(200).json({ message: 'Image de profil mise à jour avec succès.', imagePath });
    });
  };


  