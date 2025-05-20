import Button from "../common/Button";
import Icon from "../common/Icon";
import InputField from "../common/InputField";

const RegisterForm = () => {
  return (
    <form action="/registerSuccess">
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-2">
          <InputField
            type="text"
            placeholder="이메일을 입력하세요"
            iconProps={{ name: "user", size: 24 }}
            containerStyle="w-[641px]"
          />
          <Icon name="check" size={32} color={"#f2c53d"} />
        </div>
        <div className="flex gap-x-2">
          <InputField
            type="password"
            placeholder="비밀번호를 입력하세요"
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
