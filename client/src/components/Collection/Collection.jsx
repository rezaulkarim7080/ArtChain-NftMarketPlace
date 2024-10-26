import { useState } from "react";
import images from "../../img";
import DaysComponents from "./DaysComponents/DaysComponents";
import {
  BsCalendar2,
  BsCalendar3,
  BsFillAlarmFill,
  BsFillCalendar2DayFill,
} from "react-icons/bs";

const Collection = () => {
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const cardArray = [
    {
      background: images.creatorbackground30,
      user: images.user3,
      name: "Ethan Blaze",
      collection: "Neon Realms",
    },
    {
      background: images.creatorbackground31,
      user: images.user2,
      name: "Luna Starling",
      collection: "Abstract Dimensions",
    },
    {
      background: images.creatorbackground32,
      user: images.user5,
      name: "Kai Drifter",
      collection: "Cosmic Wanderers",
    },
    {
      background: images.creatorbackground33,
      user: images.user1,
      name: "Aurora Muse",
      collection: "Prism Gardens",
    },
    {
      background: images.creatorbackground34,
      user: images.user6,
      name: "Leo Stratos",
      collection: "Echoes of Eternity",
    },
  ];

  const followingArray = [
    {
      background: images.creatorbackground30,
      user: images.user6,
      name: "Ethan Blaze",
      collection: "Neon Realms",
    },
    {
      background: images.creatorbackground36,
      user: images.user3,
      name: "Luna Starling",
      collection: "Echoes of Eternity",
    },
    {
      background: images.creatorbackground35,
      user: images.user5,
      name: "Aurora Muse",
      collection: "Abstract Dimensions",
    },
    {
      background: images.creatorbackground34,
      user: images.user1,
      name: "Leo Stratos",
      collection: "Cosmic Wanderers",
    },
  ];

  const newsArray = [
    {
      background: images.creatorbackground36,
      user: images.user3,
      name: "Ethan Blaze",
      collection: "Cosmic Wanderers",
    },
    {
      background: images.creatorbackground35,
      user: images.user5,
      name: "Luna Starling",
      collection: "Echoes of Eternity",
    },
    {
      background: images.creatorbackground34,
      user: images.user8,
      name: "Leo Stratos",
      collection: "Neon Realms",
    },
  ];

  const openPopular = () => {
    setPopular(true);
    setFollowing(false);
    setNews(false);
  };

  const openFollower = () => {
    setPopular(false);
    setFollowing(true);
    setNews(false);
  };

  const openNews = () => {
    setPopular(false);
    setFollowing(false);
    setNews(true);
  };

  return (
    <div className="w-full py-12 pb-10">
      <div className="w-1/3 mx-auto pb-12 md:pb-24 text-center">
        <h2 className="text-2xl md:text-3xl mb-10 md:mb-16">
          Top List Creators
        </h2>
        <div>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-2 rounded-full flex flex-wrap md:justify-around gap-4 items-center text-lg shadow-md">
            <button
              onClick={openPopular}
              className={`${
                popular
                  ? "bg-slate-950 text-white"
                  : "bg-gray-200 text-gray-800"
              } md:py-2 md:px-4 px-3 py-1 rounded-full border border-gray-300 cursor-pointer transition-all duration-300 ease-in`}
            >
              <BsFillAlarmFill /> 24 Hours
            </button>
            <button
              onClick={openFollower}
              className={`${
                following
                  ? "bg-slate-950 text-white"
                  : "bg-gray-200 text-gray-800"
              } md:py-2 md:px-4 px-3 py-1 rounded-full border border-gray-300 cursor-pointer transition-all duration-300 ease-in`}
            >
              <BsCalendar3 /> 7 Days
            </button>
            <button
              onClick={openNews}
              className={`${
                news ? "bg-slate-950 text-white" : "bg-gray-200 text-gray-800"
              } md:py-2 md:px-4 px-3 py-1 rounded-full border border-gray-300 cursor-pointer transition-all duration-300 ease-in`}
            >
              <BsFillCalendar2DayFill /> 90 Days
            </button>
          </div>
        </div>
      </div>

      {/* Popular */}
      {popular && (
        <div className="w-4/5 mx-auto grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-5">
          {cardArray.map((el, i) => (
            <DaysComponents key={i + 1} el={el} i={i} />
          ))}
        </div>
      )}
      {/* Following */}
      {following && (
        <div className="w-4/5 mx-auto grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-5">
          {followingArray.map((el, i) => (
            <DaysComponents key={i + 1} el={el} i={i} />
          ))}
        </div>
      )}
      {/* News */}
      {news && (
        <div className="w-4/5 mx-auto grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-5">
          {newsArray.map((el, i) => (
            <DaysComponents key={i + 1} el={el} i={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
