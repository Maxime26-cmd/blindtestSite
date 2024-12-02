import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from '../features/scoreSlices';

// Charger l'état depuis le localStorage
function loadStateFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('score');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error('Erreur lors du chargement de l\'état :', e);
    return undefined;
  }
}

// Préchargement de l'état
const preloadedState = loadStateFromLocalStorage();

// Création du store
const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
  preloadedState: preloadedState ? { score: preloadedState } : undefined,
});

// Fonction pour sauvegarder dans le localStorage
function saveStateToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('score', serializedState);
  } catch (e) {
    console.error('Erreur lors de la sauvegarde de l\'état :', e);
  }
}

// Souscription au store
store.subscribe(() => {
  const state = store.getState();
  if (state.score.isGameOver) { // Vérifie si la partie est terminée
    saveStateToLocalStorage(state.score); // Sauvegarde l'état du score
  }
});

export default store;
