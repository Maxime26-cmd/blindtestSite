import React, { useState } from 'react';
import s from './VideoCountSelector.module.css';

const VideoCountSelector = ({ selectedCount, setSelectedCount }) => {
  return (
    <div>
      <label htmlFor="videoCount">Nombre de vidéos : </label>
      <select
        id="videoCount"
        value={selectedCount}
        onChange={(e) => setSelectedCount(Number(e.target.value))}
      >
        <option value="10">10 vidéos</option>
        <option value="20">20 vidéos</option>
        <option value="30">30 vidéos</option>
      </select>
    </div>
  );
};


export default VideoCountSelector;
