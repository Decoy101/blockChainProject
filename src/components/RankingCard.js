import moneyImage from "../assets/images/money.png"
import crownImage from "../assets/images/crown.png"

function RankingCard(props) {
  return (
    <div className="flex justify-between items-center h-32 bg-[#3A3A40] my-8 px-8 py-4 rounded-md">
      <div className="flex items-center h-full">
        <p className="mr-12">{props.index}</p>
        <img src={moneyImage} alt="Money" className="h-full mr-8" />
        <p className="mr-8">{props.post?.artist}</p>
        <p className="font-light">{props.post?.category}</p>
      </div>

      <div className="flex items-center">
        <p>{props.post?.votes}</p>
        <img src={crownImage} alt="Money" className="h-8 ml-2" />
      </div>
    </div>
  );
}

export default RankingCard;
