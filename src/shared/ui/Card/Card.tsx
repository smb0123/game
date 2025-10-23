import { cn } from '@/shared/lib/utils';
import React from 'react';

// 카드 Props 인터페이스
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드가 선택 가능한지 여부 */
  selectable?: boolean;
  /** 카드가 선택되었는지 여부 */
  selected?: boolean;
  /** 카드에 호버 효과를 적용할지 여부 */
  hoverable?: boolean;
  /** 카드 내용 */
  children: React.ReactNode;
}

/**
 * 재사용 가능한 카드 컴포넌트
 * 게임 카드와 일반 카드 모두에 사용할 수 있습니다.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, selectable = false, selected = false, hoverable = true, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          // 기본 카드 스타일
          'bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-200',
          selectable && 'cursor-pointer select-none hover:shadow-xl hover:scale-105',
          selected && 'ring-2 ring-blue-500 shadow-xl',
          hoverable && 'hover:shadow-xl hover:scale-105',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
