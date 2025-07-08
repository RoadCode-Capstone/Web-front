import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { postRoadmap } from "../../apis/roadMap";
import { RoadmapPostRequest } from "../../types/roadmap";
import { Spinner } from "../components/common/spinner";
import { useState } from "react";

interface LevelTestResultProps {
  type: string;
  category: string;
  dailyGoal: number;
  problemIdList: number[];
  passedCount: number;
  levelTestResult: boolean[];
}

const LevelTestResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state as LevelTestResultProps;

  const tableColumns = ["문제 번호", "결과"];

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const passedIds = data.levelTestResult
        .map((result, index) => (result ? data.problemIdList[index] : null))
        .filter((id): id is number => id !== null);

      const totalScore = passedIds.reduce((sum, id) => sum + id, 0);
      const averageScore = totalScore / data.passedCount ;

      console.log(`LevelTestResult:  
        type: ${data.type},
        category: ${data.category},
        dailyGoal: ${data.dailyGoal},
        levelTestResult: ${averageScore}`
      )

      const request = {
        type: data.type,
        category: data.category,
        dailyGoal: data.dailyGoal,
        levelTestResult:  isNaN(averageScore) ? 0 : averageScore,
      };

      await postRoadmap(request);
      navigate("/main");
    } catch (err) {
      console.error("실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center gap-y-10">
      {isLoading && <Spinner />}
      <table className="border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {tableColumns.map((column) => (
              <th key={column} className="border px-4 py-2 text-left">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.levelTestResult.map((result, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{idx + 1}번</td>
              <td className="border px-4 py-2">{result ? "통과" : "실패"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button label={"로드맵 생성하기"} onClick={handleSubmit} type="button" />
    </main>
  );
};

export default LevelTestResult;
