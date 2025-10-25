import { cn } from "@/shared/lib/utils";
import React, { useEffect, useState } from "react";

// 폭탄 모달 Props 인터페이스
export interface BombModalProps {
  /** 모달이 열려있는지 여부 */
  isOpen: boolean;
  /** 모달이 닫힐 때 호출되는 함수 */
  onClose: () => void;
  /** 자동으로 닫히는 시간 (밀리초, 0이면 자동 닫힘 없음) */
  autoCloseDelay?: number;
}

/**
 * 화면 중앙에 나타나는 폭탄 모달 컴포넌트
 * 꽝 카드 선택 시 임팩트 있는 효과를 제공합니다.
 */
export const BombModal: React.FC<BombModalProps> = ({
  isOpen,
  onClose,
  autoCloseDelay = 2000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShowExplosion(true);

      // 자동 닫기
      if (autoCloseDelay > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
      setShowExplosion(false);
    }
  }, [isOpen, autoCloseDelay]);

  const handleClose = () => {
    setIsVisible(false);
    setShowExplosion(false);
    setTimeout(() => {
      onClose();
    }, 300); // 애니메이션 완료 후 닫기
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black bg-opacity-50 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      onClick={handleClose}
    >
      {/* 폭탄 컨테이너 */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center",
          "transform transition-all duration-500",
          isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 폭발 효과 배경 */}
        {showExplosion && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bomb-explosion-effect w-96 h-96 rounded-full bg-red-500 opacity-20 animate-ping" />
            <div className="bomb-explosion-effect w-80 h-80 rounded-full bg-orange-500 opacity-30 animate-ping animation-delay-100" />
            <div className="bomb-explosion-effect w-64 h-64 rounded-full bg-yellow-500 opacity-40 animate-ping animation-delay-200" />
          </div>
        )}

        {/* 메인 폭탄 */}
        <div
          className={cn(
            "relative z-10 flex flex-col items-center justify-center",
            "bg-linear-to-br from-red-500 to-red-700",
            "rounded-full shadow-2xl border-4 border-red-800",
            "w-48 h-48 sm:w-56 sm:h-56",
            "transform transition-all duration-500",
            showExplosion && "bomb-pulse"
          )}
        >
          {/* 폭탄 이모지 */}
          <div className="text-6xl sm:text-7xl mb-2 animate-bounce">💣</div>

          {/* BOOM 텍스트 */}
          <div className="text-white font-bold text-xl sm:text-2xl animate-pulse">
            BOOM!
          </div>
        </div>

        {/* 폭발 파티클 효과 */}
        {showExplosion && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-2 h-2 bg-yellow-400 rounded-full",
                  "animate-ping",
                  `animation-delay-${i * 100}`
                )}
                style={{
                  top: `${20 + i * 10}%`,
                  left: `${20 + i * 8}%`,
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        )}

        {/* 하단 메시지 */}
        <div
          className={cn(
            "mt-6 text-center text-white",
            "transform transition-all duration-500 delay-300",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <p className="text-2xl sm:text-3xl font-bold mb-2">💥💥💥</p>
          <p className="text-lg sm:text-xl font-semibold">꽝입니다!</p>
          <p className="text-sm sm:text-base mt-2 opacity-80">
            화면을 클릭하여 닫기
          </p>
        </div>
      </div>
    </div>
  );
};
