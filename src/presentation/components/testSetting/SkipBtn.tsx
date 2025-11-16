import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import IconSkip from "@assets/icons/chevron_forward.svg?react";

export default function SkipBtn() {
  const navigate = useNavigate();

  return (
    <Button
      rightIcon={<IconSkip />}
      text={"건너뛰기"}
      onClick={() => navigate("/leveltest")}
      colorTheme={"point-primary"}
      style={
        "bg-transparent hover:bg-gray-50 hover:text-point text-point gap-x-1 w-[112px] h-[56px]"
      }
    ></Button>
  );
}
