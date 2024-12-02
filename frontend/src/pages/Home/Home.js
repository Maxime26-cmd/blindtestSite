import React from "react";
import s from "./Home.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";

const Home = () => {
  const navigate = useNavigate(); // Hook pour naviguer

  const handleStartGame = () => {
    navigate("/gamesolo"); // Redirige vers /gamesolo
  };

  return (
    <div className={s.root}>
      {/* <VideoPlayer /> */}

      <div className={s.gameContainer}>
        <h1>Blindtest</h1>
        <button onClick={handleStartGame}>Démarrer</button>{" "}
        {/* Ajout de la fonction de navigation */}
      </div>

      <div className={s.rulesContainer}>
        <h2>Règles</h2>

        <p>
          Formez des équipes. Choisissez des catégories musicales. Jouez des
          extraits musicaux. Les équipes devinent le titre de la chanson et/ou
          l'artiste. La première équipe à donner la bonne réponse remporte des
          points. Limitez le temps pour chaque extrait. Interdiction de
          rechercher sur Internet. Incluez des bonus ou des défis occasionnels.
          Favorisez un esprit de fair-play et de respect. L'équipe avec le plus
          de points gagne. Amusez-vous bien !
        </p>
      </div>
    </div>
  );
};

export default Home;
