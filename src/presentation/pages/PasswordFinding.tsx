import { EmailVerification } from "../components";

const PasswordFinding = () => {
  return (
    <div className="bg-main min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-headlineL text-white mb-20">비밀번호 찾기</h1>
      <EmailVerification />
    </div>
  );
};

export default PasswordFinding;
