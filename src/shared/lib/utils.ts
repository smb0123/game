import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스 이름을 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 조합하여 조건부 클래스와 Tailwind CSS 충돌을 해결합니다.
 *
 * @param inputs - 병합할 클래스 이름들
 * @returns 병합된 클래스 이름 문자열
 *
 * @example
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 * cn('text-red-500', { 'text-blue-500': isActive }) // 조건부 클래스 적용
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 숫자를 안전하게 파싱하는 함수
 * @param value - 파싱할 값
 * @param defaultValue - 파싱 실패 시 기본값
 * @returns 파싱된 숫자 또는 기본값
 */
export function safeParseInt(value: string | number | undefined, defaultValue: number = 0): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
}

/**
 * 배열을 무작위로 섞는 함수 (Fisher-Yates 알고리즘)
 * @param array - 섞을 배열
 * @returns 섞인 새 배열
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 지연 함수 (Promise 기반)
 * @param ms - 지연할 밀리초
 * @returns Promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 디바운스 함수
 * @param func - 디바운스할 함수
 * @param wait - 대기 시간 (밀리초)
 * @returns 디바운스된 함수
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
