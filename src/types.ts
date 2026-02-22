export type PlayerColor = 'red' | 'blue' | 'yellow' | 'green';

export interface Piece {
  id: number;
  position: number;
  isInJail: boolean;
  isInHome: boolean;
  isFinished: boolean;
}

export interface Player {
  id: string;
  name: string;
  color: PlayerColor;
  pieces: Piece[];
  isActive: boolean;
  consecutiveTurns: number;
}

export interface DiceRoll {
  value: number;
  canRollAgain: boolean;
}

export interface GameState {
  id: string;
  players: Player[];
  currentPlayerIndex: number;
  diceValue: number | null;
  availableColors: PlayerColor[];
  gameStarted: boolean;
  gameFinished: boolean;
  winner: string | null;
  lastRoll: DiceRoll | null;
}

export interface Move {
  pieceId: number;
  fromPosition: number;
  toPosition: number;
  captured?: boolean;
}
