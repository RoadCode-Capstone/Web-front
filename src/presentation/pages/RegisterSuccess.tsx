import { Button } from "../components";

const RegisterSuccess = () => {
  return (
    <div className="bg-main min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-displayL text-point mb-25">
        OOO님, 가입을 축하드립니다!
      </h1>
      <p className="text-displayS text-white mb-10">
        지금 바로 로드코드를 사용해보세요
      </p>
      <Button
        label="로그인"
        buttonStyle="w-[535px]"
        onClick={() => {
          window.location.href = "/";
        }}
      />
    </div>
  );
};

export default RegisterSuccess;
