// 게임 관련 상수 정의

// 기본 게임 설정
export const DEFAULT_GAME_SETTINGS = {
  totalCards: 12,
  bombCount: 3,
} as const;

// 게임 설정 제한값
export const GAME_LIMITS = {
  MIN_TOTAL_CARDS: 6,
  MAX_TOTAL_CARDS: 24,
  MIN_BOMB_COUNT: 1,
  MAX_BOMB_RATIO: 0.5, // 꽝 카드 비율 최대 50%
} as const;

// 게임 메시지
export const GAME_MESSAGES = {
  WELCOME: '카드 선택 게임에 오신 것을 환영합니다!',
  SELECT_CARDS: '총 카드 수와 꽝 카드 수를 선택해주세요.',
  GAME_START: '게임을 시작합니다! 카드를 선택해보세요.',
  CARD_SELECTED: '카드를 선택했습니다.',
  GAME_WON: '🎉 축하합니다! 모든 안전한 카드를 찾았습니다!',
  GAME_LOST: '💥 꽝입니다! 게임이 종료되었습니다.',
  GAME_RESET: '게임을 다시 시작하시겠습니까?',
} as const;
