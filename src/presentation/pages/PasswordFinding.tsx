import { EmailVerification } from "../components";
import { useLocation } from "react-router-dom";

const PasswordFinding = () => {
  const location = useLocation();
  const rawTheme = location.state?.theme;

  // "main" 또는 "point"만 허용, 그 외는 "main"
  const theme = rawTheme === "point" ? "point" : "main";

  const bgColor = theme === "point" ? "bg-main" : "bg-white";
  const textColor = theme === "point" ? "text-white" : "text-black";

  return (
    <div
      className={`${bgColor} min-h-screen flex flex-col items-center justify-center`}
    >
      <h1 className={`text-headlineL ${textColor} mb-20`}>비밀번호 재설정</h1>
      <EmailVerification theme={theme} />
    </div>
  );
};

export default PasswordFinding;
