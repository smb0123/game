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
    <div className="w-full max-w-7xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4">
      {/* 게임 상태 메시지 */}
      <div
        className={`rounded-2xl border-2 p-4 sm:p-6 md:p-8 text-center shadow-xl backdrop-blur-sm ${getStatusStyle()}`}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
          {getStatusMessage()}
        </h2>

        {/* 게임 진행 중일 때 통계 표시 */}
        {gameState.status === "playing" && (
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white/60 rounded-xl p-3 sm:p-4 shadow-lg">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600">
                선택한 카드
              </div>
              <div className="text-lg sm:text-xl font-bold text-blue-600">
                {gameState.selectedCards.length}개
              </div>
            </div>
            <div className="bg-white/60 rounded-xl p-3 sm:p-4 shadow-lg">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600">
                남은 안전 카드
              </div>
              <div className="text-lg sm:text-xl font-bold text-green-600">
                {gameState.remainingSafeCards}개
              </div>
            </div>
          </div>
        )}

        {/* 게임 종료 시 결과 표시 */}
        {gameResult && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white/60 rounded-xl p-3 sm:p-4 shadow-lg">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600">
                  총 선택
                </div>
                <div className="text-lg sm:text-xl font-bold text-purple-600">
                  {gameResult.totalMoves}개
                </div>
              </div>
              <div className="bg-white/60 rounded-xl p-3 sm:p-4 shadow-lg">
                <div className="text-2xl mb-1">💣</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600">
                  꽝 카드
                </div>
                <div className="text-lg sm:text-xl font-bold text-red-600">
                  {gameResult.bombCards.length}개
                </div>
              </div>
            </div>

            {gameResult.won && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="text-4xl sm:text-5xl mb-3">🎉</div>
                <p className="font-bold text-green-800 text-lg sm:text-xl mb-2">
                  모든 안전한 카드를 찾았습니다!
                </p>
                <p className="text-green-700 text-sm sm:text-base">
                  🏆 완벽한 승리입니다! 🏆
                </p>
              </div>
            )}

            {!gameResult.won && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 rounded-xl p-4 sm:p-6 shadow-lg">
                  <div className="text-4xl sm:text-5xl mb-3 animate-bounce">
                    💥
                  </div>
                  <p className="font-bold text-red-800 text-lg sm:text-xl mb-2">
                    BOOM! 꽝 카드를 선택했습니다!
                  </p>
                  <p className="text-red-700 text-sm sm:text-base">
                    💣 폭발 효과가 발생했습니다! 💣
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 게임 재시작 버튼 */}
      {(gameState.status === "won" || gameState.status === "lost") && (
        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            🔄 다시 시작하기
          </button>
        </div>
      )}
    </div>
  );
};
