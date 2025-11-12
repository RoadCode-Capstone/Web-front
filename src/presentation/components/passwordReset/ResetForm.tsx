import { ChangeEventHandler } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";

interface RegisterFormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  verifyCode: string;
  verifyCodeResult: boolean | null;
  passwordCheckResult: boolean | null;
  onEmailChange: ChangeEventHandler<HTMLInputElement>;
  onClickSendCode: () => void;
  onClickVerifyCode: () => void;
  onVerifyCodeChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordConfirmChange: ChangeEventHandler<HTMLInputElement>;
  onClickReset: () => void;
}

export function PasswordResetForm(props: RegisterFormProps) {
  return (
    <div className="flex flex-col w-[512px] gap-y-2">
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-4">
          <InputField
            id="email"
            placeholder="이메일을 입력하세요"
            type="email"
            value={props.email}
            onChange={props.onEmailChange}
          />

          <Button
            text={"인증코드 발송"}
            onClick={props.onClickSendCode}
            colorTheme={"point-secondary"}
            style="w-[160px]! h-[72px]!"
          />
        </div>
      </div>

      <div className="flex gap-x-4">
        <InputField
          id="email"
          placeholder="인증코드를 입력하세요"
          type="email"
          value={props.verifyCode}
          onChange={props.onVerifyCodeChange}
        />
        <Button
          text={"인증코드 확인"}
          onClick={props.onClickVerifyCode}
          colorTheme={"point-secondary"}
          style="w-[160px]! h-[72px]!"
        />
      </div>
      {props.verifyCodeResult && (
        <div className="flex flex-col w-[512px] gap-y-2">
          <InputField
            id="password"
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={props.password}
            onChange={props.onPasswordChange}
          />
          <div className="flex flex-col gap-y-1">
            <InputField
              id="passwordConfirm"
              placeholder="비밀번호를 한 번 더 입력하세요"
              type="password"
              value={props.passwordConfirm}
              onChange={props.onPasswordConfirmChange}
            />
            {props.passwordCheckResult !== null &&
              (props.passwordCheckResult ? (
                <span className=" pl-3 text-sm text-green-400">
                  비밀번호가 일치합니다
                </span>
              ) : (
                <span className=" pl-3 text-sm text-red">
                  비밀번호가 일치하지 않습니다
                </span>
              ))}
          </div>
          <Button
            text={"비밀번호 재설정"}
            onClick={props.onClickReset}
            colorTheme={"point-primary"}
            style="h-[72px]!"
          />
        </div>
      )}
    </div>
  );
}
