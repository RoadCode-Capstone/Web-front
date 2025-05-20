import Button from "../common/Button";
import Icon from "../common/Icon";
import InputField from "../common/InputField";

const PasswordForm = () => {
  return (
    <form action="/" className="flex flex-col gap-y-6">
      <div className="flex gap-x-2">
        <InputField
          type="password"
          placeholder="새로운 비밀번호를 입력하세요"
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
      <Button
        type="submit"
        label="비밀번호 재설정"
        buttonStyle="max-w-[641px] w-full"
      />
    </form>
  );
};

export default PasswordForm;
