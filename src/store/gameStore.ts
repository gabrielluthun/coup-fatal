import { create } from 'zustand';
import type { GameState, PlayerId } from '../types/game';

const DEFAULT_TIME_MS = 60000;

type GameActions = {
  startGame: (player1Name: string, player2Name: string, initialTimeMs: number) => void;
  endGame: (loser: PlayerId) => void;
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
      winner: null,
      initialTime: initialTimeMs,
    });
  },

  endGame: (loser) => {
    const winner: PlayerId = loser === 'player1' ? 'player2' : 'player1';
    set({ status: 'finished', winner });
  },

  correctAnswer: () => {
    const { activeTurn } = get();
    const next: PlayerId = activeTurn === 'player1' ? 'player2' : 'player1';
    set({ activeTurn: next });
  },

  wrongAnswer: () => {},

  pass: () => {},

  tick: (lastTickAt) => {
    const now = Date.now();
    const delta = now - lastTickAt;
    const { status, activeTurn, players } = get();

    if (status !== 'playing') return now;

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
      set({ players: updatedPlayers, status: 'finished', winner });
    } else {
      set({ players: updatedPlayers });
    }

    return now;
  },
}));
