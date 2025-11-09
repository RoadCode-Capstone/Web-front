// src/components/BubbleBtn.tsx

import { cn } from "@/utils/tailwind";

// 1. Props 타입에서 'size' 제거
type Position = "top" | "bottom" | "left" | "right";

interface BubbleBtnProps {
  text: string;
  position?: Position;
  className?: string;
  onClick?: () => void;
}

// 2. 컴포넌트 구현
export default function BubbleBtn({
  text,
  position = "bottom",
  className,
  onClick,
}: BubbleBtnProps) {
  // 3. 기본 스타일과 위치별 스타일 정의 (em 단위 유지)
  const baseStyle =
    "w-full h-full relative flex items-center justify-center rounded-full bg-[#B9DDFF] font-medium transition-all px-[2em] py-[2em]";

  const positionStyles: Record<Position, string> = {
    top: "before:absolute before:content-[''] before:left-[4em] before:bottom-full before:border-x-[2em] before:border-b-[2em] before:border-x-transparent before:border-b-[#B9DDFF]",
    bottom:
      "before:absolute before:content-[''] before:left-[4em] before:top-full before:border-r-[32px] before:border-t-[32px] before:border-r-transparent before:border-t-[#B9DDFF]",
    left: "before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2 before:right-full before:border-y-[2em] before:border-r-[2em] before:border-y-transparent before:border-r-[#B9DDFF]",
    right:
      "before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2 before:left-full before:border-y-[2em] before:border-l-[2em] before:border-y-transparent before:border-l-[#B9DDFF]",
  };

  // 4. 클래스 조합
  const buttonClassName = [baseStyle, positionStyles[position]]
    .filter(Boolean)
    .join(" ");

  // 5. 이제 외부 div가 컨테이너 역할을 하므로, 내부에서는 button만 반환
  return (
    <button
      onClick={onClick}
      className={cn(
        buttonClassName,
        "drop-shadow-[10px_20px_0px_rgba(0,0,0,0.25)]",
        className
      )}
    >
      {text}
    </button>
  );
}
