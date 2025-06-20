import { useState } from "react";
import Button from "../common/Button";
import Icon from "../common/Icon";
import InputField from "../common/InputField";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../apis/auth";

const RegisterForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickName] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const registerResult = await signup({ email, password, nickname });
    alert(registerResult);
    navigate("/main");
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-2">
          <InputField
            type="email"
            placeholder="이메일을 입력하세요"
            onActionChange={(e) => setEmail(e.target.value)}
            iconProps={{ name: "user", size: 24 }}
            containerStyle="w-[641px]"
          />
          <Icon name="check" size={32} color={"#f2c53d"} />
        </div>
        <div className="flex gap-x-2">
          <InputField
            type="password"
            placeholder="비밀번호를 입력하세요"
            onActionChange={(e) => setPassword(e.target.value)}
            iconProps={{ name: "lock", size: 24 }}
            containerStyle="w-[641px]"
          />
          <Icon name="check" size={32} color={"#f2c53d"} />
        </div>
        <div className="flex gap-x-2">
          <InputField
            type="password"
            placeholder="비밀번호를 한 번 더 입력하세요"
            iconProps={{ name: "lock", size: 24 }}
            containerStyle="w-[641px]"
          />
          <Icon name="check" size={32} color={"#f2c53d"} />
        </div>
        <div className="flex gap-x-2">
          <InputField
            type="text"
            placeholder="사용할 닉네임을 입력하세요"
            onActionChange={(e) => setNickName(e.target.value)}
            iconProps={{ name: "user", size: 24 }}
            containerStyle="w-[641px]"
          />
          <Icon name="check" size={32} color={"#f2c53d"} />
        </div>
      </div>
      <Button
        type="submit"
        label="회원가입"
        buttonStyle="max-w-[641px] w-full mt-10"
      />
    </form>
  );
};

export default RegisterForm;
