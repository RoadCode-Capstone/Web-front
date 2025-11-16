import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import IconBack from "@assets/icons/chevron_backward.svg?react";

export default function ReturnBtn() {
  const navigate = useNavigate();

  return (
    <Button
      leftIcon={<IconBack />}
      text={"돌아가기"}
      onClick={() => navigate("/")}
      colorTheme={"point-primary"}
      style={
        "bg-transparent hover:bg-gray-50 hover:text-point text-point gap-x-1 w-[112px] h-[56px]"
      }
    ></Button>
  );
}
