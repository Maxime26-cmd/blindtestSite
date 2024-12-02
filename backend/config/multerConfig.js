const multer = require('multer');
const path = require('path');

// Configurer Multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Chemin où tu veux stocker les fichiers
  },
  filename: (req, file, cb) => {
    // Récupérer la date actuelle
    const date = new Date().toISOString().replace(/[-:.]/g, ''); // Format YYYYMMDDHHMMSS
    const originalName = file.originalname.replace(/\.[^/.]+$/, ''); // Enlever l'extension du nom d'origine
    const extension = path.extname(file.originalname); // Récupérer l'extension

    // Renommer le fichier
    const newFileName = `${originalName}-${date}${extension}`;
    cb(null, newFileName); // Renommer le fichier avec le nouveau nom
  },
});

// Filtrer uniquement les fichiers d'images
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Types de fichiers autorisés
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Seules les images sont autorisées.'));
  },
});

module.exports = upload;
