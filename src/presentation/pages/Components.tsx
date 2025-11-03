import { Button, InputField } from "../components";
import ForWardIcon from "../assets/icons/chevron_forward.svg?react";
import BackWardIcon from "../assets/icons/chevron_backward.svg?react";
import { ButtonTheme } from "../components/common/Button";
import WindowBox from "../components/common/WindowBox";

export default function Components() {
  const btnColorTheme: ButtonTheme[] = [
    "point-primary",
    "point-secondary",
    "point-teritary",
    "main-primary",
    "main-secondary",
    "main-teritary",
  ];

  return (
    <div className="flex flex-col gap-y-5">
      <div>
        <div className="grid grid-cols-3 gap-4">
          {btnColorTheme.map((theme) => {
            return (
              <div key={theme} className="w-full h-[72px]">
                <Button
                  leftIcon={<BackWardIcon width={24} height={24} />}
                  rightIcon={<ForWardIcon width={24} height={24} />}
                  text={"텍스트를 입력하세요"}
                  onClick={() => {}}
                  colorTheme={theme}
                />
              </div>
            );
          })}
        </div>
      </div>

      <InputField
        id={"input"}
        placeholder={"텍스트를 입력하세요"}
        type={"text"}
      />

      <WindowBox />
    </div>
  );
}
