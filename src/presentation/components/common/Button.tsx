import { ReactNode } from "react";

export type ButtonTheme =
  | "point-primary"
  | "point-secondary"
  | "point-teritary"
  | "main-primary"
  | "main-secondary"
  | "main-teritary";

export interface ButtonProps {
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  label: string;
  onClick: () => void;
  colorTheme: ButtonTheme;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      data-theme={props.colorTheme}
      className="flex justify-center items-center gap-x-3 py-3 w-full h-full
      rounded-2xl
      font-medium text-base
      bg-btn-default hover:bg-btn-hover 
      text-btn-text hover:text-btn-text-hover"
    >
      {props.leftIcon}
      {props.label}
      {props.rightIcon}
    </button>
  );
}
