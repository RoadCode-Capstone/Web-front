import { Button, ImageButton, InputField, LoginForm } from "../components";
import { InputFieldProps } from "../components/common/InputField";
import Character from "../assets/character/default_left_up.svg?react";
import WindowBox from "../components/common/WindowBox";
import BubbleBtn from "../components/common/CartoonButton";
import { useNavigate } from "react-router-dom";

const authInputProps: Record<string, InputFieldProps> = {
  email: {
    id: "email",
    placeholder: "이메일을 입력하세요",
    type: "email",
  },
  password: {
    id: "password",
    placeholder: "비밀번호를 입력하세요",
    type: "pasword",
  },
  passwordConfirm: {
    id: "password-confirm",
    placeholder: "비밀번호를 한 번 더 입력하세요",
    type: "pasword",
  },
  nickname: {
    id: "nickname",
    placeholder: "사용할 닉네임을 입력하세요",
    type: "text",
  },
};

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen min-w-screen bg-main flex items-center justify-center">
      <div className="relative">
        <WindowBox
          height={672}
          width={640}
          content={<RegisterForm />}
          colorTheme={"point"}
        />
        <Character className="absolute bottom-[-123px] right-[-284px]" />
        <BubbleBtn
          onClick={() => navigate("/login")}
          className="absolute! bottom-[200px]! right-[-249px]! w-[259px]! h-[111px]!"
          text={"로그인"}
        />
      </div>
    </div>
  );
}

function RegisterForm() {
  return (
    <form className="flex flex-col w-[512px] gap-y-6">
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex w-full gap-x-4 items-center">
          <InputField {...authInputProps.email} />
          <Button
            text={"중복 확인"}
            onClick={() => {}}
            colorTheme={"point-secondary"}
            style="w-[128px]! h-[72px]!"
          />
        </div>
        {<InputField {...authInputProps.password} />}
        {<InputField {...authInputProps.passwordConfirm} />}
        <div className="flex w-full gap-x-4 items-center">
          <InputField {...authInputProps.nickname} />
          <Button
            text={"중복 확인"}
            onClick={() => {}}
            colorTheme={"point-secondary"}
            style="w-[128px]! h-[72px]!"
          />
        </div>
      </div>
      <Button
        text={"회원가입"}
        onClick={() => {}}
        colorTheme={"point-primary"}
        style="h-[72px]!"
      />
    </form>
  );
}
