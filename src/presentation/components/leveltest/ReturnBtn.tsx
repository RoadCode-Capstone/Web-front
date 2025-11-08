import Button from "../common/Button";
import IconBack from "@assets/icons/chevron_backward.svg?react";

export default function ReturnBtn() {
  return (
    <Button
      leftIcon={<IconBack />}
      text={"돌아가기"}
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
      colorTheme={"point-primary"}
      style={
        "bg-transparent hover:bg-gray-50 hover:text-point text-point gap-x-1 w-[112px] h-[56px]"
      }
    ></Button>
  );
}
