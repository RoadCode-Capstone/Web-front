import { RegisterForm } from "../components";

const Register = () => {
  return (
    <div className="bg-main min-h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-headlineL text-white mb-32">회원가입</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
