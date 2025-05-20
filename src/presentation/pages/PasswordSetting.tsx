import { PasswordForm } from "../components";

const PasswordSetting = () => {
  return (
    <div className="bg-main min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-headlineL text-white mb-20">비밀번호 재설정</h1>
      <PasswordForm />
    </div>
  );
};

export default PasswordSetting;
