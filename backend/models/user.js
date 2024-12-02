const mongoose = require('mongoose'); // Importation de Mongoose
const uniqueValidator = require('mongoose-unique-validator'); // Importation du validateur unique

// Définition du schéma d'utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Champ email requis et unique
  password: { type: String, required: true } // Champ mot de passe requis
});

// Application du plugin uniqueValidator au schéma
userSchema.plugin(uniqueValidator);

// Exportation du modèle User
module.exports = mongoose.model('User', userSchema);
