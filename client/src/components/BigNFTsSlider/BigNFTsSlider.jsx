import { useCallback, useState } from "react";
import images from "../../img";
import Button from "../Navbar/Button/Button";
import { AiFillFire, AiFillHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";

const BigNFTsSlider = () => {
  const [idNumber, setIdNumber] = useState(0);

  const sliderData = [
    {
      title: "Board NFT",
      id: 1,
      name: "Kabir",
      collection: "GEM",
      price: "0002045 ETH",
      like: 653,
      image: images.user1,
      nftImage: images.BigNft,
      time: {
        days: 24,
        hours: 3,
        minutes: 32,
        seconds: 24,
      },
    },
    {
      title: "NFT",
      id: 2,
      name: "Kabir",
      collection: "GEM",
      price: "0002045 ETH",
      like: 653,
      image: images.user2,
      nftImage: images.BigNft1,
      time: {
        days: 24,
        hours: 3,
        minutes: 32,
        seconds: 24,
      },
    },
    {
      title: "Hello NFT",
      id: 3,
      name: "Rezaul",
      collection: "GEM",
      price: "0002045 ETH",
      like: 653,
      image: images.user3,
      nftImage: images.BigNft2,
      time: {
        days: 24,
        hours: 3,
        minutes: 32,
        seconds: 24,
      },
    },
  ];

  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);

  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  return (
    <div className="w-full">
      <div className="mx-auto w-4/5 py-16 pb-40 grid md:grid-cols-12 grid-cols-1 gap-4 ">
        {/* Left Side */}
        <div className="col-span-6 shadow-xl rounded-lg p-8 h-[90vh] z-10 bg-opacity-10 backdrop-filter backdrop-blur-lg">
          <h2 className="text-3xl font-bold">{sliderData[idNumber].title}</h2>
          <div className="grid grid-cols-2 gap-4 items-center mt-6">
            <div className="flex items-center gap-4">
              <img
                src={sliderData[idNumber].image}
                alt="profile"
                className="rounded-full"
                width={50}
                height={50}
              />
              <div>
                <p className="text-sm">Creator</p>
                <h4 className="text-lg font-semibold">
                  {sliderData[idNumber].name} <MdVerified className="inline" />
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <AiFillFire className="text-4xl text-primary" />
              <div>
                <p className="text-sm">Collection</p>
                <h4 className="text-lg">{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="border-3 border-gray-700 rounded-lg px-4 py-2 mb-4">
              <small className="bg-gray-700 text-white px-4 py-1 rounded-lg font-semibold">
                Current Bid
              </small>
              <p className="mt-2 text-lg">
                {sliderData[idNumber].price}{" "}
                <span className="text-gray-600">$1242</span>
              </p>
            </div>
            <p className="flex items-center gap-2 text-gray-600 mb-4">
              <MdTimer className="text-2xl" />
              Auction Ending In
            </p>
            <div className="flex items-center gap-12 border-b border-gray-700 py-4">
              <div className="text-center">
                <p className="text-2xl font-extrabold">
                  {sliderData[idNumber].time.days}
                </p>
                <span>Days</span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold">
                  {sliderData[idNumber].time.hours}
                </p>
                <span>Hours</span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold">
                  {sliderData[idNumber].time.seconds}
                </p>
                <span>Seconds</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-16 mt-8">
              <Button btnName="Place" handleClick={() => {}} />
              <Button btnName="View" handleClick={() => {}} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8">
            <TbArrowBigLeftLines
              className="text-5xl text-white cursor-pointer bg-gray-500 rounded-full   hover:bg-gray-700 hover:rounded-full p-2 transition-all"
              onClick={() => dec()}
            />
            <TbArrowBigRightLines
              className="text-5xl text-white cursor-pointer bg-gray-500 rounded-full  hover:bg-gray-700 hover:rounded-full p-2 transition-all"
              onClick={() => inc()}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-6 p-4 bg-base-100 rounded-2xl shadow-lg">
          <div className="relative">
            <img
              src={sliderData[idNumber].nftImage}
              alt="NFT"
              className="rounded-2xl w-full h-full"
              width={500}
              height={500}
            />
            <div className="absolute top-3 right-3 bg-primary text-base-100 px-3 py-1 rounded-full flex items-center gap-2">
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTsSlider;
