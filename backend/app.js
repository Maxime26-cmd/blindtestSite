const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const userRoutes = require('./routes/user');
const videoRoutes = require('./routes/video');
const db = require('./config/db'); 

// Middleware
app.use(express.json());
app.use(cors());

// Middleware pour servir les fichiers statiques dans le dossier uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/api', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/auth', (req, res, next) => {
  console.log('Connexion tentée à:', req.url); // Log pour vérifier si la requête est reçue
  next();
});
app.use('/api/auth', userRoutes);
app.use('/api/videos', videoRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Exporter l'application pour être utilisée dans d'autres fichiers si nécessaire
module.exports = app;
