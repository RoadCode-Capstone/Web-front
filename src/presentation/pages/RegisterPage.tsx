import Character from "../assets/character/default_left_up.svg?react";
import WindowBox from "../components/common/WindowBox";
import BubbleBtn from "../components/common/CartoonButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterForm } from "@/presentation/components/register/RegisterForm";
import {
  signup,
  isExistEmail,
  isExistNickname,
  verifyEmail,
  verifyCode as verfiyCodeApi,
} from "@/apis";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [verifyCode, setVerifyCode] = useState<string>("");

  const [emailResult, setEmailResult] = useState<boolean | null>(null);
  const [passwordResult, setPasswordResult] = useState<boolean | null>(null);
  const [nicknameResult, setNicknameResult] = useState<boolean | null>(null);
  const [verfiyCodeResult, setVerifyCodeResult] = useState<boolean | null>(
    null
  );

  const navigate = useNavigate();

  const checkExistEmail = async () => {
    try {
      const response = await isExistEmail(email);
      if (response.duplicated) setEmailResult(false);
      else setEmailResult(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류입니다";
      alert(errorMessage);
    }
  };

  const sendVerifyCode = async () => {
    try {
      const response = await verifyEmail(email);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류입니다";
      alert(errorMessage);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await verfiyCodeApi(email, verifyCode);
      setVerifyCodeResult(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류입니다";
      alert(errorMessage);
    }
  };

  const checkExistNickname = async () => {
    try {
      const response = await isExistNickname(nickname);
      if (response.duplicated) setNicknameResult(false);
      else setNicknameResult(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류입니다";
      alert(errorMessage);
    }
  };

  const handleSignup = async () => {
    try {
      if (!(emailResult && passwordResult && nicknameResult)) {
        return;
      }
      const response = await signup({
        email,
        password,
        nickname,
      });
      alert(response);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류입니다.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-main flex items-center justify-center">
      <div className="relative">
        <WindowBox
          height={672}
          width={640}
          content={
            <RegisterForm
              email={email}
              password={password}
              passwordConfirm={passwordConfirm}
              nickname={nickname}
              emailCheckResult={emailResult}
              passwordCheckResult={passwordResult}
              nicknameCheckResult={nicknameResult}
              onEmailChange={(e) => setEmail(e.target.value)}
              onCheckEmail={checkExistEmail}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onPasswordConfirmChange={(e) => {
                setPasswordConfirm(e.target.value);
                if (e.target.value) {
                  setPasswordResult(password === e.target.value);
                } else {
                  setPasswordResult(null);
                }
              }}
              onNicknameChange={(e) => setNickname(e.target.value)}
              onCheckNickname={checkExistNickname}
              onRegister={handleSignup}
              verifyCode={verifyCode}
              verifyCodeResult={verfiyCodeResult}
              onClickSendCode={sendVerifyCode}
              onClickVerifyCode={handleVerifyCode}
              onVerifyCodeChange={(e) => setVerifyCode(e.target.value)}
            />
          }
          colorTheme={"point"}
          style="relative! z-10!"
        />
        <WindowBox
          height={672}
          width={640}
          content={<div></div>}
          colorTheme={"point-outline"}
          style="absolute! top-[-25px]! left-[-47px]! z-0!"
        />
        <Character className="absolute bottom-[-155px] right-[-284px] z-20!" />
        <BubbleBtn
          onClick={() => navigate("/login")}
          className="absolute! bottom-[180px]! right-[-249px]! w-[259px]! h-[111px]! z-20!"
          text={"로그인"}
        />
      </div>
    </div>
  );
}
