import { PlanningFeaturedCard } from "../components";
import logoC from "../assets/image/logo_C.svg";
import logoJAVA from "../assets/image/logo_JAVA.svg";
import logoPython from "../assets/image/logo_Python.svg";
import studyTypeAlgorithm from "../assets/image/study_type_algorithm.svg";
import studyTypeLanguage from "../assets/image/study_type_language.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudyLanguageSelect = ({
  onSelect,
}: {
  onSelect: (lang: string) => void;
}) => {
  const language = ["C", "JAVA", "Python"];

  const logoMap: Record<string, string> = {
    C: logoC,
    JAVA: logoJAVA,
    Python: logoPython,
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-y-16">
      <h1 className="text-headlineL">학습할 언어를 선택하세요</h1>
      <section className="flex gap-x-23">
        {language.map((item: string) => (
          <PlanningFeaturedCard
            label={item}
            imgUrl={logoMap[item]}
            cardStyle="py-[72px] !w-[343px] !h-[457px] justify-end"
            onActionClick={() => onSelect(item)}
            fontStyle={""}
            imageStyle="!h-[96px] !mb-[109px]"
          />
        ))}
      </section>
    </main>
  );
};

const StudyTypeSelect = ({
  onSelect,
}: {
  onSelect: (type: string) => void;
}) => {
  const studyType = ["알고리즘", "언어"];

  const studyTypeImg: Record<string, string> = {
    알고리즘: studyTypeAlgorithm,
    언어: studyTypeLanguage,
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-y-16">
      <h1 className="text-headlineL">학습 유형을 선택하세요</h1>
      <section className="flex gap-x-23">
        {studyType.map((item: string) => (
          <PlanningFeaturedCard
            label={item}
            imgUrl={studyTypeImg[item]}
            cardStyle="py-[72px] !w-[343px] !h-[457px] justify-end"
            onActionClick={() => onSelect(item)}
            fontStyle={""}
            imageStyle="!h-[96px] !mb-[109px]"
          />
        ))}
      </section>
    </main>
  );
};

//if studyType == "일고리즘"
const AlgorithmTypeSelect = ({
  onSelect,
}: {
  onSelect: (algoType: string) => void;
}) => {
  const algorithmType = ["스택/큐", "DFS/BFS", "탐욕법", "트리"];

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-y-16">
      <h1 className="text-headlineL">학습 유형을 선택하세요</h1>
      <section className="grid grid-cols-2 gap-x-23 gap-y-18">
        {algorithmType.map((item: string) => (
          <PlanningFeaturedCard
            label={item}
            cardStyle="py-[72px] !w-[343px] !h-[225px] justify-end"
            onActionClick={() => onSelect(item)}
            fontStyle={""}
            imageStyle="!h-[96px] !mb-[109px]"
          />
        ))}
      </section>
    </main>
  );
};

const StudyCountSelect = ({
  onSelect,
}: {
  onSelect: (count: number) => void;
}) => {
  const countOption = [1, 2, 3, 4, 5];

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-y-16">
      <h1 className="text-headlineL">학습 유형을 선택하세요</h1>
      <section className="flex gap-x-23">
        {countOption.map((item: number) => (
          <PlanningFeaturedCard
            label={item.toString()}
            cardStyle="!w-[80px] !h-[80px] !rounded-full"
            onActionClick={() => onSelect(item)}
            fontStyle={""}
            imageStyle="!h-[96px] !mb-[109px]"
          />
        ))}
      </section>
    </main>
  );
};

const Planning = () => {
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedStudyType, setSelectedStudyType] = useState<string | null>(
    null
  );
  const [selectedAlgorithmType, setSelectedAlgorithmType] = useState<
    string | null
  >(null);
  const [selectedCount, setSelectedCount] = useState<number | null>(null);

  // 5. 모든 선택 완료 → navigate 실행
  useEffect(() => {
    if (selectedCount !== null) {
      navigate("/levelTest", {
        state: {
          language: selectedLanguage,
          algorithm: selectedAlgorithmType,
        },
      });
    }
  }, [selectedCount]);

  if (!selectedLanguage) {
    return (
      <StudyLanguageSelect onSelect={(lang) => setSelectedLanguage(lang)} />
    );
  }

  if (!selectedStudyType) {
    return <StudyTypeSelect onSelect={(type) => setSelectedStudyType(type)} />;
  }

  if (selectedStudyType === "알고리즘" && !selectedAlgorithmType) {
    return (
      <AlgorithmTypeSelect
        onSelect={(algoType) => setSelectedAlgorithmType(algoType)}
      />
    );
  }

  if (!selectedCount) {
    return <StudyCountSelect onSelect={(count) => setSelectedCount(count)} />;
  }

  return null;
};

export default Planning;
