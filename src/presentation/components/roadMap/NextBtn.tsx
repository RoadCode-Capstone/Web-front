import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import IconNext from "@assets/icons/chevron_forward.svg?react";

export default function NextBtn() {
  const navigate = useNavigate();

  return (
    <Button
      rightIcon={<IconNext />}
      text={"이전 문제"}
      onClick={() => {}}
      colorTheme={"point-primary"}
      style={
        "bg-transparent hover:bg-gray-50 text-black gap-x-1 w-[112px] h-[56px]"
      }
    ></Button>
  );
}
