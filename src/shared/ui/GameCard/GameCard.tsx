import { cn } from "@/shared/lib/utils";
import React from "react";
import { Card } from "../Card";

// 게임 카드 상태 타입
export type GameCardState = "hidden" | "safe" | "bomb" | "selected";

// 게임 카드 Props 인터페이스
export interface GameCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "id" | "onClick" | "content"
  > {
  /** 카드 ID */
  id: string | number;
  /** 카드 상태 */
  state: GameCardState;
  /** 카드가 클릭 가능한지 여부 */
  clickable?: boolean;
  /** 카드 클릭 핸들러 */
  onClick?: (id: string | number) => void;
  /** 카드 내용 (숫자 등) */
  content?: React.ReactNode;
  /** 카드 크기 */
  size?: "sm" | "md" | "lg";
}

/**
 * 게임 전용 카드 컴포넌트
 * 카드 선택 게임에서 사용되는 특별한 카드입니다.
 */
export const GameCard = React.forwardRef<HTMLDivElement, GameCardProps>(
  (
    {
      className,
      id,
      state = "hidden",
      clickable = true,
      onClick,
      content,
      size = "md",
      ...props
    },
    ref
  ) => {
    // 카드 클릭 핸들러
    const handleClick = () => {
      if (clickable && onClick) {
        onClick(id);
      }
    };

    // 카드가 클릭 가능한지 여부
    const isClickable = clickable && state === "hidden";

    return (
      <Card
        className={cn(
          // 게임 카드 전용 스타일
          "cursor-pointer select-none flex items-center justify-center font-bold text-gray-700 relative overflow-hidden",
          // 크기별 스타일 - 반응형 적용
          size === "sm" && "w-12 h-16 sm:w-16 sm:h-20 text-xs sm:text-sm",
          size === "md" &&
            "w-16 h-20 sm:w-24 sm:h-24 md:w-24 md:h-28 text-sm sm:text-base",
          size === "lg" &&
            "w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 text-base sm:text-lg",
          // 상태별 스타일
          state === "hidden" &&
            "bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 shadow-lg hover:shadow-xl",
          state === "safe" &&
            "bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-400 shadow-lg",
          state === "bomb" &&
            "bomb-card bomb-explosion bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-400",
          state === "selected" &&
            "ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400",
          isClickable &&
            "hover:scale-105 active:scale-95 hover:-translate-y-1 transition-all duration-200",
          !isClickable && "cursor-default",
          // 카드 공개 애니메이션
          state !== "hidden" && "card-reveal",
          className
        )}
        selectable={isClickable}
        selected={state === "selected"}
        hoverable={isClickable}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {/* 카드 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-2 w-2 h-2 bg-current rounded-full"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-current rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-current rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-current rounded-full"></div>
        </div>

        {/* 카드 내용 */}
        <div className="text-center relative z-10">
          {state === "hidden" && (
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-2xl mb-1">❓</span>
              <span className="text-gray-400 text-xs font-semibold">?</span>
            </div>
          )}
          {state === "safe" && (
            <div className="flex flex-col items-center">
              <span className="text-green-600 text-2xl mb-1">✅</span>
              <span className="text-green-700 font-bold text-sm">SAFE</span>
            </div>
          )}
          {state === "bomb" && (
            <div className="flex flex-col items-center">
              <span className="text-red-600 text-3xl mb-1 animate-pulse">
                💣
              </span>
              <span className="text-red-700 font-bold text-xs">BOOM!</span>
            </div>
          )}
          {state === "selected" && content && (
            <div className="flex flex-col items-center">
              <span className="text-blue-600 text-2xl mb-1">🎯</span>
              <span className="text-blue-700 font-bold text-lg">{content}</span>
            </div>
          )}
        </div>
      </Card>
    );
  }
);

GameCard.displayName = "GameCard";
