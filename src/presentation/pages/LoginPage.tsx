import { Button, ImageButton, InputField } from "../components";
import { InputFieldProps } from "../components/common/InputField";
import Character from "../assets/character/sleep.svg?react";
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
};
export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen min-w-screen bg-main flex items-center justify-center">
      <div className="relative">
        {/* 1. 이 박스에 relative! z-10! 추가 */}
        <WindowBox
          height={672}
          width={640}
          content={<LoginForm />}
          colorTheme={"point"}
          style="relative! z-10!"
        />
        {/* 2. 이 박스에 z-0! 추가 */}
        <WindowBox
          height={672}
          width={640}
          content={<div></div>}
          colorTheme={"point-outline"}
          style="absolute! top-[-25px]! left-[-47px]! z-0!"
        />
        {/* 3. 캐릭터에 z-20! 추가 */}
        <Character className="absolute bottom-[-155px] right-[-277px] z-20!" />
        {/* 4. 말풍선에 z-20! 추가 */}
        <BubbleBtn
          onClick={() => navigate("/register")}
          className="absolute! bottom-[145px]! right-[-196px]! w-[259px]! h-[111px]! z-20!"
          text={"회원가입"}
        />
        <BubbleBtn
          onClick={() => navigate("/login")}
          className="absolute! bottom-[273px]! right-[-276px]! w-[259px]! h-[111px]! z-20!"
          text={"비밀번호 찾기"}
        />
      </div>
    </div>
  );
}
function LoginForm() {
  return (
    <form className="flex flex-col w-[400px] gap-y-6">
      <div className="flex flex-col gap-y-4 w-full">
        <InputField {...authInputProps.email} />
        {<InputField {...authInputProps.password} />}
      </div>
      <Button
        text={"로그인"}
        onClick={() => {}}
        colorTheme={"point-primary"}
        style="h-[72px]!"
      />
    </form>
  );
}
