import { useGame } from "@/entities/game/hooks/useGame";
import { GameBoard } from "@/features/game-board/GameBoard";
import { GameStatus } from "@/features/game-status/GameStatus";
import { Button } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

/**
 * 게임 플레이 페이지 컴포넌트
 * 실제 게임이 진행되는 페이지입니다.
 */
export const GamePlayPage: React.FC = () => {
  const {
    gameState,
    gameResult,
    isPlaying,
    setGameSettings,
    startGame,
    selectCard,
    resetGame,
  } = useGame();
  const navigate = useNavigate();
  const [isGameInitialized, setIsGameInitialized] = useState(false);

  // 컴포넌트 마운트 시 게임 초기화
  useEffect(() => {
    // localStorage에서 게임 설정 불러오기
    const savedSettings = localStorage.getItem("gameSettings");

    if (savedSettings) {
      try {
        // 게임 설정 파싱 및 적용
        const settings = JSON.parse(savedSettings);
        setGameSettings(settings);
        // 게임 설정이 있으면 게임 시작
        startGame();
        setIsGameInitialized(true);
      } catch (error) {
        console.error("게임 설정을 불러오는데 실패했습니다:", error);
        // 설정이 잘못된 경우 설정 페이지로 리다이렉트
        navigate("/");
      }
    } else {
      // 설정이 없는 경우 설정 페이지로 리다이렉트
      navigate("/");
    }
  }, [setGameSettings, startGame, navigate]);

  // 게임 재시작 핸들러
  const handleRestart = () => {
    // 게임 리셋 후 바로 재시작
    resetGame();
    startGame();
  };

  // 설정 변경 핸들러
  const handleChangeSettings = () => {
    // 설정 페이지로 이동
    navigate("/");
  };

  // 게임이 초기화되지 않았으면 로딩 표시
  if (!isGameInitialized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-primary py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* 게임 제목과 설정 변경 버튼 */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
              카드 선택 게임
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              안전한 카드를 모두 찾아보세요!
            </p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Button
              variant="secondary"
              onClick={handleChangeSettings}
              className="flex items-center gap-2 text-xs sm:text-sm"
              size="sm"
            >
              ⚙️ 설정 변경
            </Button>
          </div>
        </div>

        {/* 게임 상태 표시 */}
        <GameStatus
          gameState={gameState}
          gameResult={gameResult}
          onRestart={handleRestart}
        />

        {/* 게임 보드 */}
        <GameBoard
          cards={gameState.cards}
          onCardSelect={selectCard}
          isPlaying={isPlaying}
          cardSize="md"
        />
      </div>
    </div>
  );
};
