import React, { useState } from 'react';
import s from './videoTypeSelector.module.css';

const VideoTypeSelector = ({ selectedTypes, setSelectedTypes }) => {
  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes([...selectedTypes, value]); // Ajoute le type sélectionné
    } else {
      setSelectedTypes(selectedTypes.filter((type) => type !== value)); // Retire le type décoché
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value="anime"
          checked={selectedTypes.includes('anime')}
          onChange={handleTypeChange}
        />
        Anime
      </label>
      <label>
        <input
          type="checkbox"
          value="rapFr"
          checked={selectedTypes.includes('rapFr')}
          onChange={handleTypeChange}
        />
        Rap Français
      </label>
      {/* Ajoute ici d'autres types de vidéos si nécessaire */}
    </div>
  );
};

export default VideoTypeSelector;
