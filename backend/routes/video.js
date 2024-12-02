// videoRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video'); 
const auth = require('../middleware/auth');

// Route pour récupérer une vidéo aléatoire
router.get('/random-video', videoController.getRandomVideo);

// Nouvelle route pour récupérer une liste complète de vidéos
router.get('/random-video-list', videoController.getRandomVideoList);

module.exports = router;
