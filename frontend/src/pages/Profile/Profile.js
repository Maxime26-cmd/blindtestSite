import React, { useState } from 'react';
import axios from 'axios';
import s from './Profile.module.css';

const Profile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setMessage('Aucune image sélectionnée.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', imageFile);

    try {
      const token = localStorage.getItem('authToken'); // Récupérer le token depuis le local storage
      const response = await axios.post('http://localhost:5000/api/auth/upload-profile-picture', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Inclure le token dans les headers
        },
      });

      setMessage('Image de profil uploadée avec succès !');
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'upload de l\'image :', error.response.data);
      setMessage('Erreur lors de l\'upload de l\'image.');
    }
  };

  return (
    <div className={s.root}>
      <h2>Profile</h2>
      <div className={s.profileImageContainer}>
        {imagePreview ? (
          <img src={imagePreview} alt="Profile Preview" className={s.profileImage} />
        ) : (
          <p>Aucune image de profil uploadée</p>
        )}
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button onClick={handleImageUpload}>Upload Image</button>
        {message && <p>{message}</p>} {/* Afficher les messages d'état */}
      </div>
    </div>
  );
};

export default Profile;
