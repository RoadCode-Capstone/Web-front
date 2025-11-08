import { Outlet } from "react-router-dom";
import WindowBox from "../presentation/components/common/WindowBox";
import Character from "../presentation/assets/character/default_left_up.svg?react";
import BubbleBtn from "../presentation/components/common/CartoonButton";

export default function AuthLayout() {
  return (
    <div className="min-h-screen min-w-screen bg-main flex items-center justify-center">
      <div className="relative">
        <WindowBox
          height={672}
          width={640}
          content={<Outlet />}
          colorTheme={"point"}
        />
        <Character className="absolute bottom-[-123px] right-[-284px]" />
      </div>
    </div>
  );
}
