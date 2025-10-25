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
  const { setGameSettings } = useGame();
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
    <div className="min-h-screen bg-background-primary py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 게임 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            카드 선택 게임
          </h1>
          <p className="text-gray-600">
            안전한 카드를 모두 찾아보세요! 꽝 카드를 선택하면 게임이 끝납니다.
          </p>
        </div>

        {/* 게임 설정 폼 */}
        <GameSettingsForm onSettingsComplete={handleSettingsComplete} />
      </div>
    </div>
  );
};
