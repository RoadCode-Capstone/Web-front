import MinimizeIcon from "../../assets/icons/minimize.svg?react";
import CheckBoxIcon from "../../assets/icons/check_box.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import { ReactNode } from "react";

type WindowTheme = "point" | "main" | "point-outline";

interface WindowProps {
  height?: number;
  width?: number;
  content?: ReactNode;
  colorTheme: WindowTheme;
  style?: string;
}

const MAIN_BG_COLOR = {
  point: "bg-white",
  main: "bg-main",
  "point-outline": "bg-transparent",
};

const HEADER_COLOR = {
  point: "bg-point",
  main: "bg-main",
  "point-outline": "bg-transparent",
};

const HEADER_BORDER = {
  point: "",
  main: "",
  "point-outline": "border-b-4 border-point",
};

const BORDER = {
  point: "",
  main: "",
  "point-outline": "border-4 border-point",
};

export default function WindowBox(props: WindowProps) {
  const { height = 672, width = 500 } = props;
  const headerStyle =
    HEADER_COLOR[props.colorTheme] + " " + HEADER_BORDER[props.colorTheme];
  const mainStyle = " " + MAIN_BG_COLOR[props.colorTheme];
  const boxStyle =
    "flex flex-col rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.25)] overflow-hidden " +
    BORDER[props.colorTheme] +
    " " +
    props.style;

  return (
    <div
      // 3. 동적 스타일은 style 속성으로 전달
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
      // 4. 정적인 스타일만 className에 남김
      className={boxStyle}
    >
      <WindowHeader style={headerStyle} colorTheme={props.colorTheme} />
      <WindowMain content={props.content} style={mainStyle} />
    </div>
  );
}

function WindowHeader({
  style,
  colorTheme,
}: {
  style?: string;
  colorTheme: WindowTheme;
}) {
  const { iconWidth, iconHeight } = {
    iconWidth: 24,
    iconHeight: 24,
  };
  const headerStyle =
    "flex gap-x-4 justify-end items-center max-h-14 w-full py-4 px-8 " + style;
  return (
    <div className={headerStyle}>
      <MinimizeIcon
        color={`${colorTheme === "point" ? "black" : "#F2C53D"}`}
        width={iconWidth}
        height={iconHeight}
      />
      <CheckBoxIcon
        color={`${colorTheme === "point" ? "black" : "#F2C53D"}`}
        width={iconWidth}
        height={iconHeight}
      />
      <CloseIcon
        color={`${colorTheme === "point" ? "black" : "#F2C53D"}`}
        width={iconWidth}
        height={iconHeight}
      />
    </div>
  );
}

function WindowMain({
  content,
  style,
}: {
  content?: ReactNode;
  style?: string;
}) {
  const mainStyle =
    "flex flex-col w-full flex-grow items-center justify-center " + style;
  return <div className={mainStyle}>{content}</div>;
}
