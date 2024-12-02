// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api'; // Remplacez par l'URL de votre backend si nécessaire

// // Inscription d'un nouvel utilisateur
// export const signup = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/signup`, userData);
//     return response.data; // Retourne les données de la réponse
//   } catch (error) {
//     throw error.response.data; // Gère les erreurs
//   }
// };

// // Connexion d'un utilisateur
// export const login = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/login`, userData);
//     return response.data; // Retourne les données de la réponse
//   } catch (error) {
//     throw error.response.data; // Gère les erreurs
//   }
// };


// INSERT INTO db_blindtest.questions (question_title, question_url, question_answer, question_options, created_at, updated_at) VALUES
// ('D\'où vient cette musique ?', 'https://www.youtube.com/watch?v=Oo52vQyAR6w&ab_channel=Crunchyroll', 'One piece', '["Option 1", "Option 2", "Option 3"]', NOW(), NOW());