const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const upload = require("../config/multerConfig"); // Assure-toi que le chemin est correct

const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Route pour afficher le profil utilisateur, protégée par le middleware auth
router.get('/profile', auth, (req, res) => {
  res.status(200).json({ message: 'Voici le profil de l\'utilisateur avec ID: ' + req.userId });
});

// Route POST pour uploader une image de profil, protégée par le middleware auth
router.post("/upload-profile-picture", auth, upload.single("profileImage"), userCtrl.uploadProfilePicture);

module.exports = router;
