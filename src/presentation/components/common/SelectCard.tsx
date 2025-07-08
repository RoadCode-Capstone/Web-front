interface CardProps {
  title: string;
  imgSrc?: string;
  cardStyle?: string;
}

const SelectCard: React.FC<CardProps> = ({
  title,
  imgSrc = "",
  cardStyle = "",
}) => {
  return (
    <div className={`${cardStyle}`}>
      <h1 className={`text-displayL`}>{title}</h1>
      <div></div>
    </div>
  );
};
