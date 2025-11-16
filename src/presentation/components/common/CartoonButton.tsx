// src/components/BubbleBtn.tsx

import { cn } from "@/utils/tailwind";

type Position = "top" | "bottom" | "left" | "right";

interface BubbleBtnProps {
  text: string;
  position?: Position;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  lineStyles?: string[]; // 추가
}

export default function BubbleBtn({
  text,
  position = "bottom",
  className,
  onClick,
  style,
  lineStyles = [], // 기본 빈 배열
}: BubbleBtnProps) {
  const lines = text.split("\n"); // 줄 단위 분리

  const baseStyle =
    "w-full h-full relative flex items-center justify-center rounded-full bg-[#B9DDFF] font-medium transition-all px-[2em] py-[2em]";

  const positionStyles: Record<Position, string> = {
    top: "before:absolute before:content-[''] before:left-[4em] before:bottom-full before:border-x-[2em] before:border-b-[2em] before:border-x-transparent before:border-b-[#B9DDFF]",
    bottom:
      "before:absolute before:content-[''] before:left-[4em] before:top-full before:border-r-[32px] before:border-t-[32px] before:border-r-transparent before:border-t-[#B9DDFF]",
    left: "before:absolute before:content-[''] before:left-[var(--tail-offset,4rem)] before:top-full before:border-r-[32px] before:border-t-[32px] before:border-r-transparent before:border-t-[var(--tail-color,#b9ddff)]",
    right:
      "before:absolute before:content-[''] before:right-[var(--tail-offset,4rem)] before:top-full before:border-l-[32px] before:border-t-[32px] before:border-l-transparent before:border-t-[var(--tail-color,#b9ddff)]",
  };

  const buttonClassName = [baseStyle, positionStyles[position]]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      onClick={onClick}
      style={style}
      className={cn(
        buttonClassName,
        "drop-shadow-[10px_20px_0px_rgba(0,0,0,0.25)]",
        "flex flex-col",
        className
      )}
    >
      {lines.map((line, idx) => (
        <div key={idx} className={lineStyles[idx] || ""}>
          {line}
        </div>
      ))}
    </button>
  );
}
