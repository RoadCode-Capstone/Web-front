import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components";

interface ResultItem {
  result: boolean;
}

const LevelTestResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data: ResultItem[] = state?.results || [];

  const tableColumns = ["문제 번호", "결과"];

  const handleSubmit = () => {
    navigate("/main");
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center gap-y-10">
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
          {data.map(({ result }, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{idx + 1}번</td>
              <td className="border px-4 py-2">{result ? "통과" : "실패"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button label={"학습 시작하기"} onClick={handleSubmit} type="button" />
    </main>
  );
};

export default LevelTestResult;
