export type PlayerId = 'player1' | 'player2';

export type Player = {
  id: PlayerId;
  name: string;
  timeLeft: number; // en millisecondes
};

export type GameStatus = 'setup' | 'playing' | 'finished';

export type AnswerFeedbackKind = 'correct' | 'wrong';

export type AnswerFeedback = {
  player: PlayerId;
  kind: AnswerFeedbackKind;
  /** Jeton incrémental : permet de rejouer l'animation pour deux feedbacks consécutifs identiques. */
  token: number;
};

export type GameState = {
  players: [Player, Player];
  activeTurn: PlayerId;
  status: GameStatus;
  timerRunning: boolean; // false entre deux bonnes réponses, true pendant la question
  winner: PlayerId | null;
  initialTime: number;
  feedback: AnswerFeedback | null;
};
