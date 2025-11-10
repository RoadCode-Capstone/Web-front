import Logo from "../../assets/image/logo.svg?react";
import AccountIcon from "../../assets/icons/account_circle.svg?react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div
      className=" relative
    flex w-full items-center justify-between min-h-[72px] px-[72px]
     bg-white drop-shadow-sm"
    >
      <Link to="/">
        <Logo />
      </Link>
      <div className="flex gap-x-20">
        <li className="flex items-center gap-x-22 font-medium text-base">
          <Link to="/">로드맵 조회</Link>
          <Link to="/ranking">순위</Link>
          <Link to="/">출석</Link>
        </li>
        <button onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}>
          <AccountIcon height={32} width={32} />
          <HeaderModal isOpen={isModalOpen} />
        </button>
      </div>
    </div>
  );
};

const HeaderModal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    isOpen && (
      <div
        className="absolute bottom-[-96px] right-[72px] 
    bg-white px-5 py-2 rounded-xl drop-shadow-md"
      >
        <li className="w-full flex flex-col text-xs ">
          <Link to="/" className="py-2 pr-1 text-left">
            마이페이지
          </Link>
          <Link to="/logout" className="py-2  text-left">
            로그아웃
          </Link>
        </li>
      </div>
    )
  );
};

export default Header;
