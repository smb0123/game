import { GAME_LIMITS } from "@/entities/game/constants";
import type { GameSettings } from "@/entities/game/types";
import { Button, Input } from "@/shared/ui";
import React, { useState } from "react";

// 게임 설정 폼 Props
interface GameSettingsFormProps {
  /** 초기 설정값 */
  initialSettings: GameSettings;
  /** 설정 완료 핸들러 */
  onSettingsComplete: (settings: GameSettings) => void;
}

/**
 * 게임 설정을 입력받는 폼 컴포넌트
 */
export const GameSettingsForm: React.FC<GameSettingsFormProps> = ({
  initialSettings,
  onSettingsComplete,
}) => {
  // 폼 상태
  const [totalCards, setTotalCards] = useState(
    initialSettings.totalCards.toString()
  );
  const [bombCount, setBombCount] = useState(
    initialSettings.bombCount.toString()
  );
  const [errors, setErrors] = useState<{
    totalCards?: string;
    bombCount?: string;
  }>({});

  // 입력값 유효성 검사
  const validateInputs = (): boolean => {
    const newErrors: typeof errors = {};

    const totalCardsNum = parseInt(totalCards, 10);
    const bombCountNum = parseInt(bombCount, 10);

    // 총 카드 수 검증
    if (
      isNaN(totalCardsNum) ||
      totalCardsNum < GAME_LIMITS.MIN_TOTAL_CARDS ||
      totalCardsNum > GAME_LIMITS.MAX_TOTAL_CARDS
    ) {
      newErrors.totalCards = `총 카드 수는 ${GAME_LIMITS.MIN_TOTAL_CARDS}개 이상 ${GAME_LIMITS.MAX_TOTAL_CARDS}개 이하여야 합니다.`;
    }

    // 꽝 카드 수 검증
    if (
      isNaN(bombCountNum) ||
      bombCountNum < GAME_LIMITS.MIN_BOMB_COUNT ||
      bombCountNum >= totalCardsNum
    ) {
      newErrors.bombCount = `꽝 카드 수는 ${
        GAME_LIMITS.MIN_BOMB_COUNT
      }개 이상 ${totalCardsNum - 1}개 이하여야 합니다.`;
    }

    // 꽝 카드 비율 검증
    if (
      !isNaN(totalCardsNum) &&
      !isNaN(bombCountNum) &&
      bombCountNum / totalCardsNum > GAME_LIMITS.MAX_BOMB_RATIO
    ) {
      newErrors.bombCount = `꽝 카드 비율은 ${
        GAME_LIMITS.MAX_BOMB_RATIO * 100
      }%를 초과할 수 없습니다.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const settings: GameSettings = {
      totalCards: parseInt(totalCards, 10),
      bombCount: parseInt(bombCount, 10),
    };

    onSettingsComplete(settings);
  };

  // 안전한 카드 수 계산
  const safeCards = parseInt(totalCards, 10) - parseInt(bombCount, 10);
  const isValidInput =
    !isNaN(parseInt(totalCards, 10)) &&
    !isNaN(parseInt(bombCount, 10)) &&
    safeCards > 0;

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white rounded-xl shadow-card p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
        게임 설정
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* 총 카드 수 입력 */}
        <Input
          type="number"
          label="총 카드 수"
          value={totalCards}
          onChange={(e) => {
            setTotalCards(e.target.value);
            setErrors({});
          }}
          error={!!errors.totalCards}
          errorMessage={errors.totalCards}
          required
        />

        {/* 꽝 카드 수 입력 */}
        <Input
          type="number"
          label="꽝 카드 수"
          value={bombCount}
          onChange={(e) => {
            setBombCount(e.target.value);
            setErrors({});
          }}
          error={!!errors.bombCount}
          errorMessage={errors.bombCount}
          required
        />

        {/* 게임 정보 표시 */}
        {isValidInput && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <h3 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">
              게임 정보
            </h3>
            <div className="text-xs sm:text-sm text-blue-700 space-y-1">
              <p>• 총 카드: {totalCards}개</p>
              <p>• 꽝 카드: {bombCount}개</p>
              <p>• 안전한 카드: {safeCards}개</p>
              <p>
                • 꽝 확률:{" "}
                {(
                  (parseInt(bombCount, 10) / parseInt(totalCards, 10)) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
        )}

        {/* 게임 시작 버튼 */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!isValidInput || Object.keys(errors).length > 0}
        >
          게임 시작
        </Button>
      </form>
    </div>
  );
};
