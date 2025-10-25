import { GAME_MESSAGES } from "@/entities/game/constants";
import type { GameResult, GameState } from "@/entities/game/types";
import React from "react";

// 게임 상태 Props
interface GameStatusProps {
  /** 게임 상태 */
  gameState: GameState;
  /** 게임 결과 */
  gameResult: GameResult | null;
  /** 게임 재시작 핸들러 */
  onRestart: () => void;
}

/**
 * 게임 상태와 결과를 표시하는 컴포넌트
 */
export const GameStatus: React.FC<GameStatusProps> = ({
  gameState,
  gameResult,
  onRestart,
}) => {
  // 게임 상태에 따른 메시지 결정
  const getStatusMessage = () => {
    switch (gameState.status) {
      case "idle":
        return GAME_MESSAGES.SELECT_CARDS;
      case "playing":
        return GAME_MESSAGES.GAME_START;
      case "won":
        return GAME_MESSAGES.GAME_WON;
      case "lost":
        return GAME_MESSAGES.GAME_LOST;
      default:
        return "";
    }
  };

  // 게임 상태에 따른 스타일 클래스
  const getStatusStyle = () => {
    switch (gameState.status) {
      case "won":
        return "bg-green-50 border-green-200 text-green-800";
      case "lost":
        return "bg-red-50 border-red-200 text-red-800";
      case "playing":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {/* 게임 상태 메시지 */}
      <div className={`rounded-lg border p-4 text-center ${getStatusStyle()}`}>
        <h2 className="text-lg font-semibold mb-2">{getStatusMessage()}</h2>

        {/* 게임 진행 중일 때 통계 표시 */}
        {gameState.status === "playing" && (
          <div className="text-sm space-y-1">
            <p>선택한 카드: {gameState.selectedCards.length}개</p>
            <p>남은 안전한 카드: {gameState.remainingSafeCards}개</p>
          </div>
        )}

        {/* 게임 종료 시 결과 표시 */}
        {gameResult && (
          <div className="text-sm space-y-1 mt-2">
            <p>총 선택한 카드: {gameResult.totalMoves}개</p>
            <p>꽝 카드 개수: {gameResult.bombCards.length}개</p>
            {gameResult.won && (
              <div className="space-y-1">
                <p className="font-semibold text-green-700">
                  🎉 모든 안전한 카드를 찾았습니다!
                </p>
                <p className="text-green-600">
                  모든 카드가 공개되었습니다. 아래에서 확인해보세요!
                </p>
              </div>
            )}
            {!gameResult.won && (
              <div className="space-y-1">
                <p className="font-semibold text-red-700">
                  💥 꽝 카드를 선택했습니다!
                </p>
                <p className="text-red-600">
                  모든 카드가 공개되었습니다. 아래에서 확인해보세요!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 게임 재시작 버튼 */}
      {(gameState.status === "won" || gameState.status === "lost") && (
        <div className="text-center mt-4">
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-lg bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 shadow-lg"
          >
            다시 시작
          </button>
        </div>
      )}
    </div>
  );
};
