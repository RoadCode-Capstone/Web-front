import { Button, ImageButton, LoginForm } from "../components";

const Login = () => {
  return (
    <div className="w-full min-h-screen bg-main px-[156px] py-8 flex flex-col">
      <div className="flex justify-end">
        <Button
          type="button"
          label="회원가입"
          onClick={() => {
            window.location.href = "/register"; // 예시
          }}
        />
      </div>
      <div className=" w-[456px] flex flex-col gap-y-20 ">
        <h1 className=" text-headlineL text-white mb-2">로그인</h1>
        <LoginForm />
        <div className="flex flex-col gap-y-4">
          <ImageButton
            src="src\presentation\assets\naverLoginImg\btnG_완성형.png"
            buttonStyle="bg-naver w-full"
          />
          <ImageButton
            src="src\presentation\assets\kakaoLoginImg\kakao_login_large_narrow_ko.png"
            buttonStyle="bg-kakao w-full"
          />
          <ImageButton
            src="src\presentation\assets\googleLoginImg\web_neutral_sq_ctn.svg"
            buttonStyle="bg-google w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
