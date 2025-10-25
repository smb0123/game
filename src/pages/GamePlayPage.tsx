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
    resetGame();
    // 설정 페이지로 이동
    navigate("/");
  };

  // 설정 변경 핸들러
  const handleChangeSettings = () => {
    // 설정 페이지로 이동
    navigate("/");
  };

  // 게임이 초기화되지 않았으면 로딩 표시
  if (!isGameInitialized) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">게임을 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 게임 제목과 설정 변경 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              카드 선택 게임
            </h1>
            <p className="text-gray-600">안전한 카드를 모두 찾아보세요!</p>
          </div>
          <Button
            variant="secondary"
            onClick={handleChangeSettings}
            className="flex items-center gap-2"
          >
            ⚙️ 설정 변경
          </Button>
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
