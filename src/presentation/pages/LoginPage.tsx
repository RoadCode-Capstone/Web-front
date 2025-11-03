import { Button, ImageButton, InputField, LoginForm } from "../components";
import { Link, useNavigate } from "react-router-dom";
import WindowBox from "../components/common/WindowBox";

const AuthInputProps = [
  {
    id: "id",
    placeholder: "아이디를 입력하세요",
    type: "text",
  },
  {
    id: "password",
    placeholder: "비밀번호를 입력하세요",
    type: "pasword",
  },
];

export default function LoginPage() {
  return (
    <form className="flex flex-col w-[400px] gap-y-6">
      <div className="flex flex-col gap-y-4">
        {AuthInputProps.map((props) => (
          <InputField {...props} />
        ))}
      </div>
      <Button
        text={"로그인"}
        onClick={() => {}}
        colorTheme={"point-primary"}
        style="h-[72px]!"
      />
    </form>
  );
}
