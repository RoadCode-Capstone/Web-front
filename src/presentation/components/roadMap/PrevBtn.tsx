import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import IconBack from "@assets/icons/chevron_backward.svg?react";

export default function PrevBtn() {
  const navigate = useNavigate();

  return (
    <Button
      leftIcon={<IconBack />}
      text={"이전 문제"}
      onClick={() => {}}
      colorTheme={"point-primary"}
      style={
        "bg-transparent hover:bg-gray-50 text-black gap-x-1 w-[112px] h-[56px]"
      }
    ></Button>
  );
}
