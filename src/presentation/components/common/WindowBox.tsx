import MinimizeIcon from "../../assets/icons/minimize.svg?react";
import CheckBoxIcon from "../../assets/icons/check_box.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import { ReactNode } from "react";

interface WindowProps {
  height?: number;
  width?: number;
  content?: ReactNode;
}
// 수정된 WindowBox 컴포넌트
export default function WindowBox(props: WindowProps) {
  // 1. props로 수정 (prosp 오타 수정)
  // 2. 기본값 설정 (height, width가 없을 경우 대비)
  const { height = 672, width = 500 } = props;

  return (
    <div
      // 3. 동적 스타일은 style 속성으로 전달
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
      // 4. 정적인 스타일만 className에 남김
      className="flex flex-col rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.25)] overflow-hidden"
    >
      <WindowHeader />
      <WindowMain content={props.content} />
    </div>
  );
}

function WindowHeader() {
  const { iconWidth, iconHeight } = {
    iconWidth: 24,
    iconHeight: 24,
  };
  return (
    <div className="flex gap-x-4 justify-end items-center max-h-14 w-full py-4 px-8 bg-point">
      <MinimizeIcon width={iconWidth} height={iconHeight} />
      <CheckBoxIcon width={iconWidth} height={iconHeight} />
      <CloseIcon width={iconWidth} height={iconHeight} />
    </div>
  );
}

function WindowMain({ content }: { content?: ReactNode }) {
  return (
    <div className="flex flex-col w-full flex-grow items-center justify-center bg-white">
      {content}
      {/* <h1 className="font-bold text-[45px]">{title}</h1>
      <p className="font-light text-[22px]">{context}</p> */}
    </div>
  );
}
