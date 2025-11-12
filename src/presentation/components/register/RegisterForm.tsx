import { ChangeEventHandler } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";

interface RegisterFormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  emailCheckResult: boolean | null;
  nicknameCheckResult: boolean | null;
  passwordCheckResult: boolean | null;
  onEmailChange: ChangeEventHandler<HTMLInputElement>;
  onCheckEmail: () => void;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordConfirmChange: ChangeEventHandler<HTMLInputElement>;
  onNicknameChange: ChangeEventHandler<HTMLInputElement>;
  onCheckNickname: () => void;
  onRegister: () => void;
}

export function RegisterForm(props: RegisterFormProps) {
  return (
    <div className="flex flex-col w-[512px] gap-y-6">
      <div className="flex flex-col gap-y-4 w-full">
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
              text={"중복 확인"}
              onClick={props.onCheckEmail}
              colorTheme={"point-secondary"}
              style="w-[128px]! h-[72px]!"
            />
          </div>
          {props.emailCheckResult !== null &&
            (props.emailCheckResult ? (
              <span className=" pl-3 text-sm text-green-400">
                사용 가능한 이메일입니다
              </span>
            ) : (
              <span className=" pl-3 text-sm text-red">
                중복된 이메일입니다
              </span>
            ))}
        </div>
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
          {props.nicknameCheckResult !== null &&
            (props.nicknameCheckResult ? (
              <span className=" pl-3 text-sm text-green-400">
                사용 가능한 닉네임입니다
              </span>
            ) : (
              <span className=" pl-3 text-sm text-red">
                중복된 닉네임입니다
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
