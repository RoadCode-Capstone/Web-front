import Icon from "./Icon";

const Header = () => {
  return (
    <div className="relative h-18 bg-main flex items-center justify-center">
      <div className="absolute left-18">
        <span className="text-white">로고</span>
      </div>
      <div className="absolute right-18">
        <Icon name="user" size={24} color="white"></Icon>
      </div>
    </div>
  );
};

export default Header;
