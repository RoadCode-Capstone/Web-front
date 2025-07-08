import Button from "../common/Button";
import Icon from "../common/Icon";
import InputField from "../common/InputField";
import { themeProps } from "./EmailVerification";

const PasswordForm: React.FC<themeProps> = ({ theme = "main" }) => {
  const color = theme === "point" ? "bg-point" : "bg-main";
  const iconColor = theme === "point" ? "#f2c53d" : "#2b3440";

  return (
    <form action="/" className="flex flex-col gap-y-6">
      <div className="flex gap-x-2">
        <InputField
          type="password"
          placeholder="새로운 비밀번호를 입력하세요"
          iconProps={{ name: "lock", size: 24 }}
          containerStyle="w-[641px]"
        />
        <Icon name="check" size={32} color={iconColor} />
      </div>
      <div className="flex gap-x-2">
        <InputField
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
          iconProps={{ name: "lock", size: 24 }}
          containerStyle="w-[641px]"
        />
        <Icon name="check" size={32} color={iconColor} />
      </div>
      <Button
        type="submit"
        label="비밀번호 재설정"
        buttonStyle={`max-w-[641px] w-full ${color}`}
      />
    </form>
  );
};

export default PasswordForm;
