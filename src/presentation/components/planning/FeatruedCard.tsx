import ImageButton from "../common/ImageButton";

interface FeaturedCardProps {
  label: string;
  imgUrl?: string;
  cardStyle: string;
  imageStyle?: string;
  onActionClick: () => void;
  fontStyle: string;
}
const FeaturedCard = (props: FeaturedCardProps) => {
  return (
    <button
      onClick={props.onActionClick}
      className={`bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] rounded-2xl 
        flex flex-col items-center justify-center
        ${props.cardStyle}`}
    >
      {props.imgUrl && (
        <ImageButton
          src={props.imgUrl}
          buttonStyle={`bg-transparent ${props.imageStyle}`}
        />
      )}
      <h1 className={`text-titleL !${props.fontStyle}`}>{props.label}</h1>
    </button>
  );
};

export default FeaturedCard;
