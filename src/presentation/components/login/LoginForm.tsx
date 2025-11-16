import { ChangeEventHandler } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onLogin: () => void;
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
}: LoginFormProps) {
  return (
    <div className="flex flex-col w-[400px] gap-y-6">
      <div className="flex flex-col gap-y-4 w-full">
        <InputField
          id="email"
          placeholder="이메일을 입력하세요"
          type="email"
          value={email}
          onChange={onEmailChange}
        />
        <InputField
          id="password"
          placeholder="비밀번호를 입력하세요"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <Button
        text={"로그인"}
        onClick={onLogin}
        colorTheme={"point-primary"}
        style="h-[72px]!"
      />
    </div>
  );
}
