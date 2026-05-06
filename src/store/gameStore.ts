import { create } from 'zustand';
import type { GameState, PlayerId } from '../types/game';

const DEFAULT_TIME_MS = 60000;

type GameActions = {
  startGame: (player1Name: string, player2Name: string, initialTimeMs: number) => void;
  endGame: (loser: PlayerId) => void;
};

export type GameStore = GameState & GameActions;

const initialState: GameState = {
  players: [
    { id: 'player1', name: 'Joueur 1', timeLeft: DEFAULT_TIME_MS },
    { id: 'player2', name: 'Joueur 2', timeLeft: DEFAULT_TIME_MS },
  ],
  activeTurn: 'player1',
  status: 'setup',
  currentQuestion: null,
  winner: null,
  initialTime: DEFAULT_TIME_MS,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  startGame: (player1Name, player2Name, initialTimeMs) => {
    set({
      players: [
        { id: 'player1', name: player1Name, timeLeft: initialTimeMs },
        { id: 'player2', name: player2Name, timeLeft: initialTimeMs },
      ],
      activeTurn: 'player1',
      status: 'playing',
      currentQuestion: null,
      winner: null,
      initialTime: initialTimeMs,
    });
  },

  endGame: (loser) => {
    const winner: PlayerId = loser === 'player1' ? 'player2' : 'player1';
    set({ status: 'finished', winner });
  },
}));
