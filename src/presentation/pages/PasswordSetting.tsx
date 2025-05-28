import { useLocation } from "react-router-dom";
import { PasswordForm } from "../components";
import { themeProps } from "../components/user/EmailVerification";

const PasswordSetting = () => {
  const location = useLocation();
  const theme = (location.state?.theme ?? "main") as themeProps["theme"];

  const bgColor = theme === "point" ? "bg-main" : "bg-white";
  const textColor = theme === "point" ? "text-white" : "text-black";

  return (
    <div
      className={`${bgColor} min-h-screen flex flex-col items-center justify-center`}
    >
      <h1 className={`text-headlineL ${textColor} mb-20`}>비밀번호 재설정</h1>
      <PasswordForm theme={theme} />
    </div>
  );
};

export default PasswordSetting;
