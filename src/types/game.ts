export type PlayerId = 'player1' | 'player2';

export type Player = {
  id: PlayerId;
  name: string;
  timeLeft: number; // en millisecondes
};

export type GameStatus = 'setup' | 'playing' | 'finished';

export type Question = {
  text: string;
  answer: string;
};

export type GameState = {
  players: [Player, Player];
  activeTurn: PlayerId;
  status: GameStatus;
  currentQuestion: Question | null;
  winner: PlayerId | null;
  initialTime: number; // en millisecondes
};
