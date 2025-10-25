import type { Card } from "@/entities/game/types";
import { BombModal, GameCard } from "@/shared/ui";
import React, { useState } from "react";

// 게임 보드 Props
interface GameBoardProps {
  /** 카드 배열 */
  cards: Card[];
  /** 카드 선택 핸들러 */
  onCardSelect: (cardId: string | number) => void;
  /** 게임이 진행 중인지 여부 */
  isPlaying: boolean;
  /** 카드 크기 */
  cardSize?: "sm" | "md" | "lg";
}

/**
 * 게임 카드들을 표시하는 보드 컴포넌트
 */
export const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  onCardSelect,
  isPlaying,
  cardSize = "md",
}) => {
  // 화면 흔들림 상태
  const [isShaking, setIsShaking] = useState(false);
  // 폭탄 모달 상태
  const [showBombModal, setShowBombModal] = useState(false);

  // 카드 선택 핸들러 (꽝 카드 선택 시 화면 흔들림 효과 및 폭탄 모달 추가)
  const handleCardSelect = (cardId: string | number) => {
    const card = cards.find((c) => c.id === cardId);

    // 꽝 카드 선택 시 효과들
    if (card && card.isBomb) {
      setIsShaking(true);
      setShowBombModal(true);

      // 화면 흔들림 애니메이션 완료 후 상태 리셋
      setTimeout(() => setIsShaking(false), 500);
    }

    onCardSelect(cardId);
  };

  // 폭탄 모달 닫기 핸들러
  const handleBombModalClose = () => {
    setShowBombModal(false);
  };

  // 카드 상태에 따른 GameCard 상태 매핑
  const getCardState = (card: Card) => {
    if (!card.isRevealed) return "hidden";
    if (card.isBomb) return "bomb";
    if (card.isSelected) return "selected";
    return "safe";
  };

  // 카드 내용 생성
  const getCardContent = (card: Card) => {
    if (!card.isRevealed) return null;
    if (card.isBomb) return "💣";
    if (card.isSelected) {
      // 선택된 안전한 카드의 번호 표시
      const safeCardIndex =
        cards.filter((c) => !c.isBomb && c.isSelected).indexOf(card) + 1;
      return safeCardIndex;
    }
    // 게임이 끝났을 때 선택되지 않은 안전한 카드 표시
    if (!card.isBomb && !card.isSelected) {
      return "✓";
    }
    return null;
  };

  return (
    <>
      <div
        className={`w-full max-w-7xl mx-auto px-2 sm:px-4 ${
          isShaking ? "screen-shake" : ""
        }`}
      >
        {/* 게임 보드 그리드 - 반응형 그리드와 간격 적용 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-4 md:gap-5 xl:gap-6 h-full w-full">
          {cards.map((card) => (
            <GameCard
              key={card.id}
              id={card.id}
              state={getCardState(card)}
              content={getCardContent(card)}
              size={cardSize}
              clickable={isPlaying && !card.isRevealed}
              onClick={handleCardSelect}
              className="animate-card-reveal w-full h-full aspect-square mx-auto transform transition-all duration-300 hover:rotate-1"
            />
          ))}
        </div>
      </div>

      {/* 폭탄 모달 */}
      <BombModal
        isOpen={showBombModal}
        onClose={handleBombModalClose}
        autoCloseDelay={3000}
      />
    </>
  );
};
