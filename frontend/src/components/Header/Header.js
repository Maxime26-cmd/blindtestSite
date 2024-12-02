import React from 'react';
import s from './Header.module.css'; 
import Exit from '../../logo/exit/exit';
import { useNavigate } from 'react-router-dom'; // Import correct

const Header = () => {
  const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger

  const handleLogout = () => {
    // Suppression du token JWT ou autre méthode d'authentification
    localStorage.removeItem('authToken'); // Exemple de token dans le localStorage
    navigate('/login');
  };

  return (
    <header className={s.root}>
      <div className={s.logo}>
        <img src="/logo/slazyPartyLogo.png" alt="Logo" className={s.logoImage} /> 
        <div>
          <p><span>S</span>lazy</p>
          <p className={s.party}><span>P</span>arty</p>
        </div>
      </div>

      <nav className={s.nav}>
        <a href="/" className={s.navItem}>Accueil</a>
        <a href="/games" className={s.navItem}>Nos jeux</a>
        <a href="/premium" className={s.navItem}>Premium</a>
        <a href="/contact" className={s.navItem}>Contact</a>
      </nav>

      <div className={s.profile}>
        <button onClick={handleLogout} className={s.exitButton}>
          <Exit />
        </button>
        <a href="/profile" className={s.navItem}>Profile</a>
      </div>
    </header>
  );
};

export default Header;
