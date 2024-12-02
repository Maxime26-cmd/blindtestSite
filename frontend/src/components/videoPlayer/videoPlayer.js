import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import { useDispatch, useSelector } from "react-redux"; // Import de Redux
import { setMaxScore } from "../../features/scoreSlices"; // Import de l'action
import VideoTypeSelector from "../VideoTypeSelector/VideoTypeSelector";
import s from "./videoPlayer.module.css";

const VideoPlayer = ({ onGameEnd }) => {
  const videoRef = useRef(null);
  const [videoList, setVideoList] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCount, setSelectedCount] = useState(10);
  const playerRef = useRef(null);
  const timersRef = useRef({ countdownInterval: null, countdownTimeout: null });

  const [isLoading, setIsLoading] = useState(false);
  const [answered, setAnswered] = useState(false);

  const dispatch = useDispatch(); // Initialisation de Redux
  const maxScore = useSelector((state) => state.score.maxScore); // Récupère le score maximum du Redux store

  const loadVideoList = async () => {
    if (selectedTypes.length === 0) {
      alert("Veuillez sélectionner au moins un type de vidéo.");
      return;
    }

    setIsLoading(true);

    await fetchVideoList();

    setIsLoading(false);
  };

  const startGameWithLoading = async () => {
    if (selectedTypes.length === 0) {
      return;
    }

    setIsLoading(true);

    await fetchVideoList();

    setIsLoading(false);

    if (videoList.length === 0) {
      return;
    }

    setIsGameStarted(true);
  };

  const fetchVideoList = async () => {
    try {
      const queryString = selectedTypes
        .map((type) => `types=${type}`)
        .join("&");
      const response = await fetch(
        `http://localhost:5000/api/videos/random-video-list?${queryString}&count=${selectedCount}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des vidéos.");
      }

      const data = await response.json();
      setVideoList(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des vidéos :", error);
      alert(error.message);
    }
  };

  const playVideo = (index) => {
    if (index >= videoList.length) {
      // Fin de la partie si toutes les vidéos ont été jouées
      dispatch(setMaxScore(points));

      if (onGameEnd) {
        onGameEnd();
      }
      return;
    }

    const video = videoList[index];
    setCorrectAnswer(video.question_answer);
    setIsHidden(true);
    setCountdown(10);
    setAnswered(false); // Réinitialiser l'état de réponse pour chaque nouvelle vidéo

    clearTimeout(timersRef.current.countdownTimeout);
    clearInterval(timersRef.current.countdownInterval);

    // Démarrer le compte à rebours
    timersRef.current.countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    timersRef.current.countdownTimeout = setTimeout(() => {
      setIsHidden(false);
      clearInterval(timersRef.current.countdownInterval);
    }, 10000);

    setCurrentVideoIndex(index);

    // Préparer la vidéo
    setTimeout(() => {
      console.log("URL de la vidéo:", video.question_url);

      if (playerRef.current) {
        playerRef.current.src({
          src: video.question_url,
          type: "video/youtube",
        });

        playerRef.current.play();
      }

      // Déclencher la vidéo suivante après 15 secondes
      setTimeout(() => {
        playVideo(index + 1); // Lance la vidéo suivante
      }, 15000); // Après 15 secondes
    }, 500); // Délai de 500ms avant de jouer la vidéo
  };

  useEffect(() => {
    if (isGameStarted && videoList.length > 0 && videoRef.current) {
      if (!playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: false,
          autoplay: true,
          muted: false,
          preload: "auto",
        });

        playerRef.current.on("ready", () => {
          console.log("Le lecteur vidéo est prêt");

          if (isGameStarted) {
            playVideo(0);
          }
        });
      }
    }
  }, [videoList, isGameStarted]);

  const checkAnswer = () => {
    if (!answered) {
      if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        setPoints((prevPoints) => {
          const newPoints = prevPoints + 1;

          // Dispatch pour mettre à jour le score dans Redux
          dispatch(setMaxScore(newPoints));

          // Sauvegarder le score maximum dans localStorage
          localStorage.setItem("maxScore", newPoints);

          console.log("Points mis à jour :", newPoints); // Debug
          return newPoints;
        });
      }
      setAnswered(true);
      setAnswer("");
    }
  };

  useEffect(() => {
    // Récupérer le score maximum depuis localStorage au démarrage
    const storedMaxScore = localStorage.getItem("maxScore");
    if (storedMaxScore) {
      dispatch(setMaxScore(parseInt(storedMaxScore, 10))); // Utiliser Redux pour le stocker dans l'état global
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      clearTimeout(timersRef.current.countdownTimeout);
      clearInterval(timersRef.current.countdownInterval);

      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className={s.root}>
      {!isGameStarted ? (
        <>
          <VideoTypeSelector
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />
          <div>
            <label htmlFor="musicCount">Nombre de musiques : </label>
            <select
              id="musicCount"
              value={selectedCount}
              onChange={(e) => setSelectedCount(Number(e.target.value))}
            >
              <option value={2}>2 musiques</option>
              <option value={5}>5 musiques</option>
              <option value={10}>10 musiques</option>
              <option value={20}>20 musiques</option>
              <option value={30}>30 musiques</option>
            </select>
          </div>
          <button className={s.buttonGame} onClick={startGameWithLoading}>
            Lancer la partie
          </button>
          {isLoading && <p>Chargement des vidéos...</p>}
        </>
      ) : (
        <>
          {isHidden ? (
            <div className={s.overlay}>
              <div className={s.countdown}>Solution dans {countdown}</div>
            </div>
          ) : (
            <div className={s.overlay}>
              <div className={s.clickBlock}></div>
            </div>
          )}

          {videoList.length > 0 ? (
            <div className={s.videoContainer} data-vjs-player>
              <video
                ref={videoRef}
                className="video-js vjs-default-skin"
                width="640"
                height="264"
              />
            </div>
          ) : (
            <p>Chargement de la vidéo...</p>
          )}
          <div>
            <h2 className={s.points}>Points: {points}</h2>
            <h3 className={s.points}>Score maximum: {maxScore}</h3> {/* Affiche le score maximum */}
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Entrez le nom de la vidéo"
            />
            <button onClick={checkAnswer}>Valider</button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
