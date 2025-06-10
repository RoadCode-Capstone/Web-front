import { Button } from "../components";
import { useLocation } from "react-router-dom";

interface LevelTestProps {
  language?: string;
  algorithm?: string;
}
const LevelTest = () => {
  const location = useLocation();
  const { language = "C", algorithm } = location.state as LevelTestProps;
  return (
    <main className="min-h-screen flex flex-col justify-start items-center gap-y-24 mt-10">
      <h1 className="text-headlineL">레벨테스트를 진행하겠습니다</h1>
      <div className="flex flex-col gap-y-7">
        <section
          className="w-[998px] h-[275px] bg-[#F9F9F9] 
        flex flex-col justify-center items-center p-8 gap-y-9
        rounded-2xl border-[0.5px] border-main border-solid"
        >
          <h2 className="text-titleL">레벨테스트 주의사항</h2>
          <div className="w-full py-2 text-left">
            <ul className="list-disc pl-6 text-bodyL">
              <li>제한 시간은 1시간이에요.</li>
              <li>사용 언어는 {language}에요.</li>
              <li>
                테스트 내용은 ‘{algorithm ? algorithm : language + " 문법"}
                ’(이)에요.
              </li>
              <li>제한 시간이 종료되거나, 종료 버튼을 누르면 종료돼요.</li>
            </ul>
          </div>
        </section>
        <Button label={"테스트 시작"} buttonStyle="!w-[998px]" />
      </div>
    </main>
  );
};

export default LevelTest;
