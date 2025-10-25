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
    <div className="w-full max-w-sm sm:max-w-md mx-auto">
      {/* 메인 카드 컨테이너 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-red-400/20 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
            🎮 게임 설정
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* 총 카드 수 입력 */}
            <div className="space-y-2">
              <Input
                type="number"
                label="🎴 총 카드 수"
                value={totalCards}
                onChange={(e) => {
                  setTotalCards(e.target.value);
                  setErrors({});
                }}
                error={!!errors.totalCards}
                errorMessage={errors.totalCards}
                required
                className="text-center font-semibold text-lg"
              />
            </div>

            {/* 꽝 카드 수 입력 */}
            <div className="space-y-2">
              <Input
                type="number"
                label="💣 꽝 카드 수"
                value={bombCount}
                onChange={(e) => {
                  setBombCount(e.target.value);
                  setErrors({});
                }}
                error={!!errors.bombCount}
                errorMessage={errors.bombCount}
                required
                className="text-center font-semibold text-lg"
              />
            </div>

            {/* 게임 정보 표시 */}
            {isValidInput && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 sm:p-5 shadow-lg">
                <h3 className="font-bold text-blue-800 mb-3 text-center text-lg">
                  📊 게임 정보
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm sm:text-base">
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🎴</div>
                    <div className="font-semibold text-gray-700">총 카드</div>
                    <div className="text-blue-600 font-bold">
                      {totalCards}개
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">💣</div>
                    <div className="font-semibold text-gray-700">꽝 카드</div>
                    <div className="text-red-600 font-bold">{bombCount}개</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">✅</div>
                    <div className="font-semibold text-gray-700">안전 카드</div>
                    <div className="text-green-600 font-bold">
                      {safeCards}개
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="font-semibold text-gray-700">꽝 확률</div>
                    <div className="text-orange-600 font-bold">
                      {(
                        (parseInt(bombCount, 10) / parseInt(totalCards, 10)) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 게임 시작 버튼 */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              disabled={!isValidInput || Object.keys(errors).length > 0}
            >
              🚀 게임 시작하기
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
