import { cn } from '@/shared/lib/utils';
import React from 'react';

// 버튼 크기 타입 정의
export type ButtonSize = 'sm' | 'md' | 'lg';

// 버튼 변형 타입 정의
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

// 버튼 Props 인터페이스
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 버튼 스타일 변형 */
  variant?: ButtonVariant;
  /** 로딩 상태 */
  loading?: boolean;
  /** 버튼 내용 */
  children: React.ReactNode;
}

/**
 * 재사용 가능한 버튼 컴포넌트
 * 다양한 크기와 스타일 변형을 지원합니다.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = 'md', variant = 'primary', loading = false, disabled, children, ...props }, ref) => {
    // 로딩 중이거나 비활성화된 경우 disabled 처리
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          // 기본 버튼 스타일
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          // 크기별 스타일
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-4 py-2 text-base',
          size === 'lg' && 'px-6 py-3 text-lg',
          // 변형별 스타일
          variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 shadow-lg',
          variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
          variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
          variant === 'success' && 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
          loading && 'cursor-wait',
          className
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
