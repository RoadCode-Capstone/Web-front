import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import InputField from "../common/InputField";

export interface themeProps {
  theme?: "main" | "point";
}

const EmailVerification: React.FC<themeProps> = ({ theme = "main" }) => {
  const color = theme === "point" ? "bg-point" : "bg-main";
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 form 제출 막고
    navigate("/passwordSetting", { state: { theme } }); // theme 넘기며 이동
  };

  return (
    <div className="flex flex-col gap-y-6">
      <form className="flex gap-x-6">
        <InputField
          type="text"
          placeholder="이메일을 입력하세요"
          iconProps={{ name: "email", size: 24 }}
          containerStyle="w-[456px]"
        />
        <Button
          label="인증번호 발송"
          buttonStyle={`w-[160px] h-[72px] ${color}`}
        />
      </form>
      <form onSubmit={handleSubmit} className="flex gap-x-6">
        <InputField
          type="text"
          placeholder="인증번호를 입력하세요"
          containerStyle="w-[456px]"
        />
        <Button
          type="submit"
          label="확인"
          buttonStyle={`w-[160px] h-[72px] ${color}`}
        />
      </form>
    </div>
  );
};

export default EmailVerification;
