import Button from "../common/Button";
import InputField from "../common/InputField";

const LoginForm = () => {
  return (
    <form action="#" method="GET" className="w-[456px]">
      <div className="flex flex-col gap-y-6">
        <InputField
          iconProps={{ name: "user", size: 24 }}
          placeholder="이메일을 입력하세요"
          type="text"
          containerStyle="w-[456px]"
        />
        <InputField
          iconProps={{ name: "lock", size: 24 }}
          placeholder="비밀번호를 입력하세요"
          type="password"
          containerStyle="w-[456px]"
        />
      </div>
      <div className="flex justify-end my-2">
        <a href="/passwordFinding" className="text-sm text-white">
          비밀번호를 잊어버리셨습니까?
        </a>
      </div>

      <Button label="로그인" buttonStyle="w-[456px] my-6" />
    </form>
  );
};

export default LoginForm;
