import { create } from 'zustand';
import type { GameState, PlayerId } from '../types/game';

const DEFAULT_TIME_MS = 60000;

type GameActions = {
  startGame: (player1Name: string, player2Name: string, initialTimeMs: number) => void;
  endGame: (loser: PlayerId) => void;
  startTimer: () => void;
  switchPlayer: () => void;
  correctAnswer: () => void;
  wrongAnswer: () => void;
  pass: () => void;
  tick: (lastTickAt: number) => number;
};

export type GameStore = GameState & GameActions;

const initialState: GameState = {
  players: [
    { id: 'player1', name: 'Joueur 1', timeLeft: DEFAULT_TIME_MS },
    { id: 'player2', name: 'Joueur 2', timeLeft: DEFAULT_TIME_MS },
  ],
  activeTurn: 'player1',
  status: 'setup',
  timerRunning: false,
  winner: null,
  initialTime: DEFAULT_TIME_MS,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: (player1Name, player2Name, initialTimeMs) => {
    set({
      players: [
        { id: 'player1', name: player1Name, timeLeft: initialTimeMs },
        { id: 'player2', name: player2Name, timeLeft: initialTimeMs },
      ],
      activeTurn: 'player1',
      status: 'playing',
      timerRunning: false, // l'hôte lance manuellement le chrono
      winner: null,
      initialTime: initialTimeMs,
    });
  },

  endGame: (loser) => {
    const winner: PlayerId = loser === 'player1' ? 'player2' : 'player1';
    set({ status: 'finished', timerRunning: false, winner });
  },

  // L'hôte appuie sur "Lancer le chrono" une fois la question posée
  startTimer: () => {
    set({ timerRunning: true });
  },

  // Correction manuelle : change de joueur sans modifier les chronomètres
  switchPlayer: () => {
    const { activeTurn } = get();
    const next: PlayerId = activeTurn === 'player1' ? 'player2' : 'player1';
    set({ activeTurn: next, timerRunning: false });
  },

  // Bonne réponse : chrono en pause, passage à l'adversaire
  correctAnswer: () => {
    const { activeTurn } = get();
    const next: PlayerId = activeTurn === 'player1' ? 'player2' : 'player1';
    set({ activeTurn: next, timerRunning: false });
  },

  // Mauvaise réponse / passe : le chrono continue
  wrongAnswer: () => {},
  pass: () => {},

  tick: (lastTickAt) => {
    const now = Date.now();
    const delta = now - lastTickAt;
    const { status, timerRunning, activeTurn, players } = get();

    if (status !== 'playing' || !timerRunning) return now;

    const activeIndex = activeTurn === 'player1' ? 0 : 1;
    const activePlayer = players[activeIndex];

    if (activePlayer.timeLeft <= 0) return now;

    const newTimeLeft = Math.max(0, activePlayer.timeLeft - delta);
    const updatedPlayers: [typeof players[0], typeof players[1]] = [
      ...players,
    ] as [typeof players[0], typeof players[1]];
    updatedPlayers[activeIndex] = { ...activePlayer, timeLeft: newTimeLeft };

    if (newTimeLeft <= 0) {
      const winner: PlayerId = activeTurn === 'player1' ? 'player2' : 'player1';
      set({ players: updatedPlayers, status: 'finished', timerRunning: false, winner });
    } else {
      set({ players: updatedPlayers });
    }

    return now;
  },
}));
