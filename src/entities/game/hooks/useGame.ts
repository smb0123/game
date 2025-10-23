import { shuffleArray } from '@/shared/lib/utils';
import { useCallback, useMemo, useReducer } from 'react';
import { DEFAULT_GAME_SETTINGS, GAME_LIMITS } from '../constants';
import type { Card, GameAction, GameResult, GameSettings, GameState } from '../types';

// 게임 상태 초기값
const initialGameState: GameState = {
  status: 'idle',
  cards: [],
  settings: DEFAULT_GAME_SETTINGS,
  selectedCards: [],
  remainingSafeCards: 0,
};

// 게임 리듀서
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_GAME_SETTINGS': {
      const { totalCards, bombCount } = action.payload;
      const safeCards = totalCards - bombCount;

      return {
        ...state,
        settings: action.payload,
        remainingSafeCards: safeCards,
      };
    }

    case 'START_GAME': {
      const { totalCards, bombCount } = state.settings;
      const safeCards = totalCards - bombCount;

      // 카드 생성
      const cards: Card[] = [];

      // 안전한 카드 생성
      for (let i = 0; i < safeCards; i++) {
        cards.push({
          id: `safe-${i}`,
          isBomb: false,
          isSelected: false,
          isRevealed: false,
        });
      }

      // 꽝 카드 생성
      for (let i = 0; i < bombCount; i++) {
        cards.push({
          id: `bomb-${i}`,
          isBomb: true,
          isSelected: false,
          isRevealed: false,
        });
      }

      // 카드 섞기
      const shuffledCards = shuffleArray(cards);

      return {
        ...state,
        status: 'playing',
        cards: shuffledCards,
        selectedCards: [],
        remainingSafeCards: safeCards,
      };
    }

    case 'SELECT_CARD': {
      const cardId = action.payload;
      const card = state.cards.find((c) => c.id === cardId);

      if (!card || card.isSelected || state.status !== 'playing') {
        return state;
      }

      const updatedCards = state.cards.map((c) => (c.id === cardId ? { ...c, isSelected: true, isRevealed: true } : c));

      const newSelectedCards = [...state.selectedCards, cardId];
      const newRemainingSafeCards = card.isBomb ? state.remainingSafeCards : state.remainingSafeCards - 1;

      // 게임 종료 조건 확인
      let newStatus: GameState['status'] = state.status;
      if (card.isBomb) {
        newStatus = 'lost';
      } else if (newRemainingSafeCards === 0) {
        newStatus = 'won';
      }

      return {
        ...state,
        cards: updatedCards,
        selectedCards: newSelectedCards,
        remainingSafeCards: newRemainingSafeCards,
        status: newStatus,
      };
    }

    case 'RESET_GAME': {
      return {
        ...initialGameState,
        settings: state.settings, // 설정은 유지
      };
    }

    default:
      return state;
  }
}

/**
 * 게임 상태와 액션을 관리하는 커스텀 훅
 */
export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  // 게임 설정 업데이트
  const setGameSettings = useCallback((settings: GameSettings) => {
    // 유효성 검사
    const { totalCards, bombCount } = settings;

    if (totalCards < GAME_LIMITS.MIN_TOTAL_CARDS || totalCards > GAME_LIMITS.MAX_TOTAL_CARDS) {
      throw new Error(
        `총 카드 수는 ${GAME_LIMITS.MIN_TOTAL_CARDS}개 이상 ${GAME_LIMITS.MAX_TOTAL_CARDS}개 이하여야 합니다.`
      );
    }

    if (bombCount < GAME_LIMITS.MIN_BOMB_COUNT || bombCount >= totalCards) {
      throw new Error(`꽝 카드 수는 ${GAME_LIMITS.MIN_BOMB_COUNT}개 이상 ${totalCards}개 미만이어야 합니다.`);
    }

    if (bombCount / totalCards > GAME_LIMITS.MAX_BOMB_RATIO) {
      throw new Error(`꽝 카드 비율은 ${GAME_LIMITS.MAX_BOMB_RATIO * 100}%를 초과할 수 없습니다.`);
    }

    dispatch({ type: 'SET_GAME_SETTINGS', payload: settings });
  }, []);

  // 게임 시작
  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  // 카드 선택
  const selectCard = useCallback((cardId: string | number) => {
    dispatch({ type: 'SELECT_CARD', payload: String(cardId) });
  }, []);

  // 게임 리셋
  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // 게임 결과 계산
  const gameResult = useMemo((): GameResult | null => {
    if (state.status === 'idle' || state.status === 'playing') {
      return null;
    }

    const bombCards = state.cards.filter((card) => card.isBomb).map((card) => card.id);

    return {
      won: state.status === 'won',
      selectedCards: state.selectedCards,
      bombCards,
      totalMoves: state.selectedCards.length,
    };
  }, [state.status, state.selectedCards, state.cards]);

  // 게임이 진행 중인지 확인
  const isPlaying = state.status === 'playing';

  // 게임이 종료되었는지 확인
  const isGameOver = state.status === 'won' || state.status === 'lost';

  return {
    // 상태
    gameState: state,
    gameResult,
    isPlaying,
    isGameOver,

    // 액션
    setGameSettings,
    startGame,
    selectCard,
    resetGame,
  };
}
