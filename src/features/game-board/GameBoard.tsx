import type { Card } from '@/entities/game/types';
import { GameCard } from '@/shared/ui';
import React from 'react';

// 게임 보드 Props
interface GameBoardProps {
  /** 카드 배열 */
  cards: Card[];
  /** 카드 선택 핸들러 */
  onCardSelect: (cardId: string | number) => void;
  /** 게임이 진행 중인지 여부 */
  isPlaying: boolean;
  /** 카드 크기 */
  cardSize?: 'sm' | 'md' | 'lg';
}

/**
 * 게임 카드들을 표시하는 보드 컴포넌트
 */
export const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardSelect, isPlaying, cardSize = 'md' }) => {
  // 카드 상태에 따른 GameCard 상태 매핑
  const getCardState = (card: Card) => {
    if (!card.isRevealed) return 'hidden';
    if (card.isBomb) return 'bomb';
    if (card.isSelected) return 'selected';
    return 'safe';
  };

  // 카드 내용 생성
  const getCardContent = (card: Card) => {
    if (!card.isRevealed) return null;
    if (card.isBomb) return '💣';
    if (card.isSelected) {
      // 선택된 안전한 카드의 번호 표시
      const safeCardIndex = cards.filter((c) => !c.isBomb && c.isSelected).indexOf(card) + 1;
      return safeCardIndex;
    }
    return null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 게임 보드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {cards.map((card) => (
          <GameCard
            key={card.id}
            id={card.id}
            state={getCardState(card)}
            content={getCardContent(card)}
            size={cardSize}
            clickable={isPlaying && !card.isRevealed}
            onClick={onCardSelect}
            className="animate-card-reveal"
          />
        ))}
      </div>
    </div>
  );
};
