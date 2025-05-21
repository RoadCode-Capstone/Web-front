import { IconType } from "react-icons";
import * as Fa6Icons from "react-icons/fa6";

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const IconList: Record<string, keyof typeof Fa6Icons> = {
  user: "FaUser",
  lock: "FaLock",
};

const Icon: React.FC<IconProps> = ({ name, size = 20, color = "black" }) => {
  const iconName = IconList[name];
  let IconComponent: IconType | undefined = Fa6Icons[iconName];

  // icon 불러오기 실패
  if (!IconComponent) {
    IconComponent = Fa6Icons["FaGhost"];
    // TODO: ERROR 처리
    console.log(`Icon {name}을 불러오는 것을 실패하였습니다.`);
  }

  return (
    <div className="inline-flex justify-center items-center">
      <IconComponent size={size} color={color} />
    </div>
  );
};

export default Icon;
