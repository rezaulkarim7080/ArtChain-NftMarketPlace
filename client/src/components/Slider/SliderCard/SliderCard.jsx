import { motion } from "framer-motion";
import images from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile";

const SliderCard = ({ el }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg transition-all duration-300 ease-in hover:shadow-lg rounded-2xl">
      <div className="rounded-b-2xl pb-4">
        <div className="rounded-2xl overflow-hidden w-[180px] h-[180px] md:w-[350px] md:h-[300px]">
          <img
            src={el.background}
            alt="NFT Background"
            className="rounded-2xl transition-all duration-300 ease-in"
          />
        </div>
        <div className="flex items-center justify-center gap-4 py-4">
          <p className="text-xl md:font-bold ">NFT Video #2414</p>
          <div className="flex items-center gap-2">
            <LikeProfile />
            <small>1 out of 100</small>
          </div>
        </div>
        <div className="flex justify-between px-4 md:px-8 mt-4 text-right">
          <div className="border border-gray-400 px-2 py-1 rounded-sm">
            <small className="bg-gray-400 text-white px-2 py-1 rounded-sm">
              Current Bid
            </small>
            <p className="text-xl md:font-semibold mt-2 leading-none">
              1.000 ETH
            </p>
          </div>
          <div className="flex flex-col items-end">
            <small className="mb-1">Remaining Time</small>
            <p className="text-xl font-medium md:font-bold">3h : 15m : 20s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
