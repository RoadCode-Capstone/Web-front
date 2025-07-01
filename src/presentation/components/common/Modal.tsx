import React from "react";
import { useNavigate } from "react-router-dom";

interface ResultModalProps {
  isCorrect: boolean;
  onClose: () => void;
  setProblemPage: (value: boolean) => void;
  handleOrder: (order: number) => void;
  order: number; // 추가
}

const Modal = ({ isCorrect, onClose,setProblemPage, handleOrder, order  }: ResultModalProps) => {
  const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg text-center shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          {isCorrect ? "✅ 정답입니다!" : "❌ 틀렸습니다"}
        </h2>
        <div className="flex justify-center gap-x-4">
          
          <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다시 풀기
        </button>
        <button
            onClick={() => {
              setProblemPage(false);
              handleOrder(order+1)
              onClose();
            }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          메인 화면으로 돌아가기
        </button>
          </div>
      </div>
    </div>
  );
};

export default Modal