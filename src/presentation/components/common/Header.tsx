import Logo from "../../assets/image/logo.svg?react";
import AccountIcon from "../../assets/icons/account_circle.svg?react";

const Header = () => {
  return (
    <div
      className="
    flex w-full items-center justify-between h-[72px] px-[72px]
     bg-white border-b-2 border-[#d9d9d9]"
    >
      <Logo />
      <AccountIcon height={32} width={32} />
    </div>
  );
};

export default Header;
