import { useGame } from "@/entities/game/hooks/useGame";
import type { GameSettings } from "@/entities/game/types";
import { GameSettingsForm } from "@/features/game-settings/GameSettingsForm";
import { useNavigate } from "react-router-dom";
import React from "react";

/**
 * 게임 설정 페이지 컴포넌트
 * 사용자가 게임 설정을 입력하고 게임을 시작하는 페이지입니다.
 */
export const GameSettingsPage: React.FC = () => {
  const { setGameSettings, gameState } = useGame();
  const navigate = useNavigate();

  // 게임 설정 완료 핸들러
  const handleSettingsComplete = (settings: GameSettings) => {
    setGameSettings(settings);
    // 게임 설정을 localStorage에 저장하여 게임 플레이 페이지에서 사용
    localStorage.setItem("gameSettings", JSON.stringify(settings));
    // 게임 플레이 페이지로 이동
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* 게임 제목 */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-2xl sm:text-3xl">💣</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            카드 선택 게임
          </h1>
          <p className="text-base sm:text-lg text-gray-600 px-4 max-w-2xl mx-auto leading-relaxed">
            🎯{" "}
            <span className="font-semibold text-gray-700">
              안전한 카드를 모두 찾아보세요!
            </span>
            <br />
            💥 꽝 카드를 선택하면 게임이 끝납니다
          </p>
        </div>

        {/* 게임 설정 폼 */}
        <GameSettingsForm
          initialSettings={gameState.settings}
          onSettingsComplete={handleSettingsComplete}
        />
      </div>
    </div>
  );
};
