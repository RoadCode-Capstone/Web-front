import { ChangeEventHandler } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";

interface RegisterFormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  verifyCode: string;
  emailCheckResult: boolean | null;
  verifyCodeResult: boolean | null;
  nicknameCheckResult: boolean | null;
  passwordCheckResult: boolean | null;
  onEmailChange: ChangeEventHandler<HTMLInputElement>;
  onCheckEmail: () => void;
  onClickSendCode: () => void;
  onClickVerifyCode: () => void;
  onVerifyCodeChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordConfirmChange: ChangeEventHandler<HTMLInputElement>;
  onNicknameChange: ChangeEventHandler<HTMLInputElement>;
  onCheckNickname: () => void;
  onRegister: () => void;
}

export function RegisterForm(props: RegisterFormProps) {
  return !props.verifyCodeResult ? (
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
          {!props.emailCheckResult ? (
            <Button
              text={"중복 확인"}
              onClick={props.onCheckEmail}
              colorTheme={"point-secondary"}
              style="w-[160px]! h-[72px]!"
            />
          ) : (
            <Button
              text={"인증코드 발송"}
              onClick={props.onClickSendCode}
              colorTheme={"point-secondary"}
              style="w-[160px]! h-[72px]!"
            />
          )}
        </div>
        {props.emailCheckResult === null && (
          <span className=" pl-3 text-sm text-red">
            이메일 중복 확인이 필요합니다
          </span>
        )}
        {props.emailCheckResult !== null &&
          (props.emailCheckResult ? (
            <span className=" pl-3 text-sm text-green-400">
              사용 가능한 이메일입니다
            </span>
          ) : (
            <span className=" pl-3 text-sm text-red">
              사용할 수 없는 이메일입니다
            </span>
          ))}
      </div>
      {props.emailCheckResult && (
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
      )}
    </div>
  ) : (
    <div className="flex flex-col w-[512px] gap-y-6">
      <div className="flex flex-col gap-y-4 w-full">
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
        <div className="flex flex-col gap-y-1">
          <div className="flex w-full gap-x-4 items-center">
            <InputField
              id="nickname"
              placeholder="사용할 닉네임을 입력하세요"
              type="text"
              value={props.nickname}
              onChange={props.onNicknameChange}
            />
            <Button
              text={"중복 확인"}
              onClick={props.onCheckNickname}
              colorTheme={"point-secondary"}
              style="w-[128px]! h-[72px]!"
            />
          </div>
          {props.nicknameCheckResult === null && (
            <span className=" pl-3 text-sm text-red">
              닉네임 중복 확인이 필요합니다
            </span>
          )}
          {props.nicknameCheckResult !== null &&
            (props.nicknameCheckResult ? (
              <span className=" pl-3 text-sm text-green-400">
                사용 가능한 닉네임입니다
              </span>
            ) : (
              <span className=" pl-3 text-sm text-red">
                사용할 수 없는 닉네임입니다
              </span>
            ))}
        </div>
      </div>
      <Button
        text={"회원가입"}
        onClick={props.onRegister}
        colorTheme={"point-primary"}
        style="h-[72px]!"
      />
    </div>
  );
}
