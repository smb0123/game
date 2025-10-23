import { useGame } from '@/entities/game/hooks/useGame';
import type { GameSettings } from '@/entities/game/types';
import { GameBoard } from '@/features/game-board/GameBoard';
import { GameSettingsForm } from '@/features/game-settings/GameSettingsForm';
import { GameStatus } from '@/features/game-status/GameStatus';
import React, { useState } from 'react';

/**
 * 메인 게임 페이지 컴포넌트
 */
export const GamePage: React.FC = () => {
  const { gameState, gameResult, isPlaying, setGameSettings, startGame, selectCard, resetGame } = useGame();

  // 게임 설정 완료 상태
  const [isSettingsComplete, setIsSettingsComplete] = useState(false);

  // 게임 설정 완료 핸들러
  const handleSettingsComplete = (settings: GameSettings) => {
    setGameSettings(settings);
    setIsSettingsComplete(true);
  };

  // 게임 시작 핸들러
  const handleStartGame = () => {
    startGame();
  };

  // 게임 재시작 핸들러
  const handleRestart = () => {
    resetGame();
    setIsSettingsComplete(false);
  };

  return (
    <div className="min-h-screen bg-background-primary py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 게임 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">카드 선택 게임</h1>
          <p className="text-gray-600">안전한 카드를 모두 찾아보세요! 꽝 카드를 선택하면 게임이 끝납니다.</p>
        </div>

        {/* 게임 설정 폼 또는 게임 보드 */}
        {!isSettingsComplete ? (
          <GameSettingsForm onSettingsComplete={handleSettingsComplete} onStartGame={handleStartGame} />
        ) : (
          <>
            {/* 게임 상태 표시 */}
            <GameStatus gameState={gameState} gameResult={gameResult} onRestart={handleRestart} />

            {/* 게임 보드 */}
            <GameBoard cards={gameState.cards} onCardSelect={selectCard} isPlaying={isPlaying} cardSize="md" />
          </>
        )}
      </div>
    </div>
  );
};
