// 게임 상태 타입 정의
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

// 카드 타입 정의
export interface Card {
  id: string;
  isBomb: boolean;
  isSelected: boolean;
  isRevealed: boolean;
}

// 게임 설정 타입 정의
export interface GameSettings {
  totalCards: number;
  bombCount: number;
}

// 게임 상태 타입 정의
export interface GameState {
  status: GameStatus;
  cards: Card[];
  settings: GameSettings;
  selectedCards: string[];
  remainingSafeCards: number;
}

// 게임 액션 타입 정의
export type GameAction =
  | { type: 'SET_GAME_SETTINGS'; payload: GameSettings }
  | { type: 'START_GAME' }
  | { type: 'SELECT_CARD'; payload: string }
  | { type: 'RESET_GAME' }
  | { type: 'REVEAL_CARD'; payload: string };

// 게임 결과 타입 정의
export interface GameResult {
  won: boolean;
  selectedCards: string[];
  bombCards: string[];
  totalMoves: number;
}
