import Button from "../common/Button";
import InputField from "../common/InputField";

const EmailVerification = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <form className="flex gap-x-6">
        <InputField
          type="text"
          placeholder="이메일을 입력하세요"
          iconProps={{ name: "user", size: 24 }}
          containerStyle="w-[456px]"
        />
        <Button label="인증번호 발송" buttonStyle="w-[160px] h-[72px]" />
      </form>
      <form action="/passwordSetting" className="flex gap-x-6">
        <InputField
          type="text"
          placeholder="인증번호를 입력하세요"
          containerStyle="w-[456px]"
        />
        <Button type="submit" label="확인" buttonStyle="w-[160px] h-[72px]" />
      </form>
    </div>
  );
};

export default EmailVerification;
