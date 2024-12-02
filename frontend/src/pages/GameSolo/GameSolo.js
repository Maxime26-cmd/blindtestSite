import React, { useState } from "react";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import s from "./GameSolo.module.css";

const GameSolo = () => {
  const [isGameFinished, setIsGameFinished] = useState(false);

  const handleGameEnd = () => {
    setIsGameFinished(true); // Marquer le jeu comme terminé
  };

  const resetGame = () => {
    setIsGameFinished(false); // Réinitialiser l'état du jeu
  };

  return (
    <div className={s.root}>
      {!isGameFinished ? (
        <VideoPlayer onGameEnd={handleGameEnd} />
      ) : (
        <div>
          <h2>Le jeu est terminé !</h2>
          <button onClick={resetGame}>Rejouer</button>
        </div>
      )}
    </div>
  );
};

export default GameSolo;
