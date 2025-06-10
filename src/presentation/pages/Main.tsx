import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const Main = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen w-full bg-main flex flex-col items-center ">
      <div className="w-[80%]">
        <section className="text-displayL text-white text-left flex items-start mt-40">
          진행 중인
          <br />
          학습 로드맵이 없습니다
        </section>
        <section className="mt-40 flex flex-col items-end">
          <Button
            label="완료한 학습 로드맵 목록 조회 >>"
            buttonStyle="bg-transparent text-displayS !text-point"
          />
          <Button
            label="학습 로드맵 만들기 >>"
            buttonStyle="bg-transparent text-displayS !text-point"
            onClick={() => navigate("/newRoadMap")}
          />
        </section>
      </div>
    </main>
  );
};

export default Main;
