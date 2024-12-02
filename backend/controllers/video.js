// videoController.js
const db = require('../config/db'); // Connexion à la base de données

// Logique existante pour une vidéo aléatoire
exports.getRandomVideo = (req, res) => {
    const types = req.query.types;
    const excludedIds = req.query.excludedIds ? JSON.parse(req.query.excludedIds) : [];

    let query = 'SELECT * FROM questions';
    const conditions = [];

    if (types) {
        const typesArray = Array.isArray(types) ? types : [types];
        const typesString = typesArray.map(type => `question_type = "${type}"`).join(' OR ');
        conditions.push(`(${typesString})`);
    }

    if (excludedIds.length > 0) {
        const excludedString = excludedIds.map(id => `'${id}'`).join(',');
        conditions.push(`question_id NOT IN (${excludedString})`);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ' ORDER BY RAND() LIMIT 1';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur lors de la récupération de la vidéo.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Toutes les vidéos disponibles ont été jouées.' });
        }
        res.json(results[0]);
    });
};

// Nouvelle logique pour récupérer une liste complète de vidéos
exports.getRandomVideoList = (req, res) => {
    const types = req.query.types;
    const count = parseInt(req.query.count, 10); // Nombre de vidéos demandées

    let query = 'SELECT * FROM questions';
    const conditions = [];

    if (types) {
        const typesArray = Array.isArray(types) ? types : [types];
        const typesString = typesArray.map(type => `question_type = "${type}"`).join(' OR ');
        conditions.push(`(${typesString})`);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY RAND() LIMIT ${count}`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des vidéos.' });
        }
        if (results.length < count) {
            return res.status(400).json({ error: 'Pas assez de vidéos disponibles pour le type sélectionné.' });
        }
        res.json(results);
    });
};
