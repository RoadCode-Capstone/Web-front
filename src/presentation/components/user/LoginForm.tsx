import Button from "../common/Button";
import InputField from "../common/InputField";
import { Link } from "react-router-dom";

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

      <Button label="로그인" buttonStyle="w-[456px] mt-6" />
    </form>
  );
};

export default LoginForm;
