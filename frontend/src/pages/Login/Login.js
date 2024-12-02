import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Réinitialiser le message avant chaque tentative de connexion
    
    // Log de la variable d'environnement pour vérifier sa valeur
    console.log('URL de l\'API:', process.env.REACT_APP_API_URL);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      console.log(response.data);
      
      // Stocker userId et token dans le localStorage
      localStorage.setItem('userId', response.data.userId); // Stocke le userId
      localStorage.setItem('authToken', response.data.token); // Stocke le token dans le localStorage
      
      setMessage('Connexion réussie !'); // Message de succès
      navigate('/'); // Remplacez '/' par le chemin de votre page
    } catch (error) {
      console.log('Erreur lors de la connexion:', error);  // Log complet de l'erreur
      if (error.response) {
        // L'erreur provient de la réponse de l'API (404, 500, etc.)
        console.error('Réponse de l\'API:', error.response.data);
        console.error('Code d\'erreur:', error.response.status);
        console.error('En-têtes de la réponse:', error.response.headers);
        setMessage('Erreur lors de la connexion. Vérifiez vos identifiants.'); // Message d'erreur générique
      } else if (error.request) {
        // L'erreur provient de la demande qui n'a pas reçu de réponse
        console.error('Pas de réponse reçue:', error.request);
        setMessage('Erreur lors de la connexion. Pas de réponse du serveur.');
      } else {
        // Autres erreurs
        console.error('Erreur lors de la configuration de la requête:', error.message);
        setMessage('Erreur de connexion inconnue.');
      }
    }
  };

  return (
    <div>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>} {/* Afficher le message d'état */}
    </div>
  );
};

export default Login;
