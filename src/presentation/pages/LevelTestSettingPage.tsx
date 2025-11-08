import { Heading } from "../components/testSetting/Heading";
import { LanguageCards } from "../components/testSetting/cards/LanguageCards";
import ReturnBtn from "../components/testSetting/ReturnBtn";
import SkipBtn from "../components/testSetting/SkipBtn";
import { TypeCards } from "../components/testSetting/cards/TypeCards";
import { AlgorithmCards } from "../components/testSetting/cards/AlgorithmCards";
import { DailyCard } from "../components/testSetting/cards/DailyCard";
import { useEffect, useState } from "react";
import React from "react";

type LeveltestStepType = "language" | "type" | "algorithm" | "daily";

const LeveltestSettings: Record<LeveltestStepType, any> = {
  language: {
    heading: <Heading text="STEP 1. 학습할 언어를 선택하세요" />,
    cards: <LanguageCards />,
  },
  type: {
    heading: <Heading text="STEP 2. 학습 유형을 선택하세요" />,
    cards: <TypeCards />,
  },
  algorithm: {
    heading: <Heading text="STEP 2-2. 학습할 알고리즘을 선택하세요" />,
    cards: <AlgorithmCards />,
  },
  daily: {
    heading: <Heading text="STEP 3. 일일 학습 목표를 선택하세요" />,
    cards: <DailyCard />,
  },
};

const LEVELTEST_STEP_ORDER: LeveltestStepType[] = [
  "language",
  "type",
  "algorithm",
  "daily",
];

type SelectedValues = {
  language?: string;
  type?: string;
  algorithm?: string;
  daily?: string;
};

export function LeveltestSettingPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const currentStep = LEVELTEST_STEP_ORDER[currentStepIndex];
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({});

  const handleCardClick = (value: string | number) => {
    setSelectedValues((prev) => ({
      ...prev,
      [currentStep]: value,
    }));

    let nextStepIndex = currentStepIndex + 1;

    if (currentStep === "type") {
      value === "algorithm"
        ? (nextStepIndex = LEVELTEST_STEP_ORDER.indexOf("algorithm"))
        : (nextStepIndex = LEVELTEST_STEP_ORDER.indexOf("daily"));
    }

    if (nextStepIndex < LEVELTEST_STEP_ORDER.length) {
      setCurrentStepIndex(nextStepIndex);
    }
  };

  useEffect(() => {
    if (currentStepIndex === LEVELTEST_STEP_ORDER.length - 1) {
      console.log("현재까지 선택한 값들:", selectedValues);
    }
  }, [selectedValues, currentStepIndex]);

  return (
    <div
      className="
    flex flex-col w-full h-full gap-y-4
    pt-9 px-18"
    >
      <div className="flex justify-between w-full">
        <ReturnBtn />
        <SkipBtn />
      </div>
      <div className="flex flex-col gap-y-14">
        {LeveltestSettings[currentStep].heading}
        {React.cloneElement(LeveltestSettings[currentStep].cards, {
          onClick: handleCardClick,
        })}
      </div>
    </div>
  );
}
