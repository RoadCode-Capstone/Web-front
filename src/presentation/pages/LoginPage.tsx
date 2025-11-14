import { Button, ImageButton, InputField } from "../components";
import { InputFieldProps } from "../components/common/InputField";
import Character from "../assets/character/sleep.svg?react";
import { LoginForm } from "@/presentation/components/login/LoginForm";
import WindowBox from "../components/common/WindowBox";
import BubbleBtn from "../components/common/CartoonButton";
import { useNavigate } from "react-router-dom";
import RoadcodeSleep from "../assets/character/roadcode_sleep.gif";
import { login } from "@/apis/auth";
import { useState } from "react";
import { addAttendance } from "@/apis/point";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await login({
        email,
        password,
      });
      const token = response.accessToken;
      localStorage.setItem("jwt", token);
      const attendance = await addAttendance();
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류입니다.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-main flex items-center justify-center">
      <div className="relative">
        {/* 1. 이 박스에 relative! z-10! 추가 */}
        <WindowBox
          height={672}
          width={640}
          content={
            <LoginForm
              email={email}
              password={password}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onLogin={handleLogin}
            />
          }
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
        <div className="absolute bottom-[-155px] right-[-277px] z-20!">
          <img src={RoadcodeSleep} alt="Character" />
        </div>

        {/* <Character className="absolute bottom-[-155px] right-[-277px] z-20!" /> */}
        {/* 4. 말풍선에 z-20! 추가 */}
        <BubbleBtn
          onClick={() => navigate("/register")}
          className="absolute! bottom-[145px]! right-[-196px]! w-[259px]! h-[111px]! z-20!"
          text={"회원가입"}
        />
        <BubbleBtn
          onClick={() => navigate("/reset")}
          className="absolute! bottom-[273px]! right-[-276px]! w-[259px]! h-[111px]! z-20!"
          text={"비밀번호 찾기"}
        />
      </div>
    </div>
  );
}
