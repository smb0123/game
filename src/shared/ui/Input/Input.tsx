import { cn } from "@/shared/lib/utils";
import React from "react";

// 입력 필드 타입 정의
export type InputType = "text" | "number" | "email" | "password";

// 입력 필드 Props 인터페이스
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 타입 */
  type?: InputType;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 필수 입력 여부 */
  required?: boolean;
}

/**
 * 재사용 가능한 입력 필드 컴포넌트
 * 폼 입력에 사용되며 에러 상태와 라벨을 지원합니다.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      error = false,
      errorMessage,
      label,
      helperText,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    // 고유한 ID 생성 (id가 없을 경우)
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {/* 라벨 */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* 입력 필드 */}
        <input
          id={inputId}
          type={type}
          className={cn(
            "w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />

        {/* 에러 메시지 또는 도움말 텍스트 */}
        {(errorMessage || helperText) && (
          <p
            className={cn(
              "mt-1 text-xs sm:text-sm",
              error ? "text-red-600" : "text-gray-500"
            )}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
