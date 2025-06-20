import { useState } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";
import { login } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import { API_TEST_EMAIL, API_TEST_PASSWORD } from "../../../constants/api";

const LoginForm = () => {
  const [email, setEmail] = useState<string>(API_TEST_EMAIL);
  const [password, setPassword] = useState<string>(API_TEST_PASSWORD);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginResult = await login({ email, password });
    // localStorage.setItem("token", loginResult.accessToken);
    navigate("/main");
  };

  return (
    <form onSubmit={handleLogin} className="w-[456px]">
      <div className="flex flex-col gap-y-6">
        <InputField
          iconProps={{ name: "user", size: 24 }}
          placeholder="이메일을 입력하세요"
          type="email"
          onActionChange={(e) => setEmail(e.target.value)}
          containerStyle="w-[456px]"
        />
        <InputField
          iconProps={{ name: "lock", size: 24 }}
          placeholder="비밀번호를 입력하세요"
          type="password"
          onActionChange={(e) => setPassword(e.target.value)}
          containerStyle="w-[456px]"
        />
      </div>

      <Button label="로그인" type="submit" buttonStyle="w-[456px] mt-6" />
    </form>
  );
};

export default LoginForm;
