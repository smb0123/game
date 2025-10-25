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
          "cursor-pointer select-none flex items-center justify-center font-bold text-gray-700",
          // 크기별 스타일
          size === "sm" && "w-16 h-20 text-sm",
          size === "md" && "w-20 h-24 text-base",
          size === "lg" && "w-24 h-28 text-lg",
          // 상태별 스타일
          state === "hidden" && "hover:bg-gray-50",
          state === "safe" && "bg-green-100 border-green-200",
          state === "bomb" && "bomb-card bomb-explosion",
          state === "selected" &&
            "ring-2 ring-blue-500 shadow-xl bg-yellow-100",
          isClickable && "hover:scale-105 active:scale-95",
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
        {/* 카드 내용 */}
        <div className="text-center">
          {state === "hidden" && <span className="text-gray-400">?</span>}
          {state === "safe" && (
            <span className="text-green-700 font-bold">✓</span>
          )}
          {state === "bomb" && <span className="text-red-700 text-xl">💣</span>}
          {state === "selected" && content && (
            <span className="text-blue-700 font-bold">{content}</span>
          )}
        </div>
      </Card>
    );
  }
);

GameCard.displayName = "GameCard";
