import React, { useState, useEffect } from "react";
import { RiAwardLine, RiUserFollowFill } from "react-icons/ri";
import FollowerTabCard from "./FollowerTabCard/FollowerTabCard";
import images from "../../img";

const FollowerTab = ({ creators }) => {
  const [activeTab, setActiveTab] = useState("popular");
  const [followedUsers, setFollowedUsers] = useState([]);

  const cardData = {
    popular: creators,
    following: [
      {
        background: images.creatorbackground30,
        user: images.user6,
        seller: "0x5C6...b1C7E3",
        total: 5.5,
      },
      {
        background: images.creatorbackground31,
        user: images.user3,
        seller: "0x3D5ew...be83E",
        total: 5.5,
      },
      {
        background: images.creatorbackground32,
        user: images.user5,
        seller: "0x06weD..5B2E7",
        total: 5.5,
      },
      {
        background: images.creatorbackground34,
        user: images.user1,
        seller: "0xC6trb...29E19",
        total: 5.5,
      },
    ],
    news: [
      {
        background: images.creatorbackground1,
        user: images.user6,
        seller: "0x9Fer0c...A8B34",
        total: 5.5,
      },
      {
        background: images.creatorbackground2,
        user: images.user3,
        seller: "0x4E0....8C55c2",
        total: 5.5,
      },
      {
        background: images.creatorbackground6,
        user: images.user8,
        seller: "0xF1Ad6...A2eC",
        total: 5.5,
      },
    ],
  };

  // Load followed users from local storage on mount
  useEffect(() => {
    const savedFollowedUsers =
      JSON.parse(localStorage.getItem("followedUsers")) || [];
    setFollowedUsers(savedFollowedUsers);
    console.log("Followed Users from localStorage:", savedFollowedUsers);
  }, []);

  // Update local storage when followed users change
  useEffect(() => {
    localStorage.setItem("followedUsers", JSON.stringify(followedUsers));
  }, [followedUsers]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full py-5 relative">
      <div className="w-1/2 mx-auto pb-16 text-center">
        <h2 className="text-2xl md:text-3xl mb-16">Top Creators List</h2>
        {/* ///// */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-2 rounded-full shadow-md">
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-lg">
            <button
              className={`${
                activeTab === "popular"
                  ? "bg-slate-950 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-3 rounded-full border border-gray-300 cursor-pointer transition-all duration-300 ease-in flex items-center justify-center gap-2 `}
              onClick={() => handleTabChange("popular")}
            >
              <RiUserFollowFill />
              Popular
            </button>
            <button
              className={`${
                activeTab === "following"
                  ? "bg-slate-950 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-3 rounded-full border border-gray-300 cursor-pointer transition-all duration-300 ease-in flex items-center justify-center gap-2`}
              onClick={() => handleTabChange("following")}
            >
              <RiUserFollowFill />
              Following
            </button>
            <button
              className={`${
                activeTab === "news"
                  ? "bg-slate-950 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-3 rounded-full border border-gray-300 cursor-pointer transition-all duration-300 ease-in flex items-center justify-center gap-2`}
              onClick={() => handleTabChange("news")}
            >
              <RiAwardLine />
              News
            </button>
          </div>
        </div>
        {/* /////// */}
      </div>

      {/* Render cards based on the active tab */}
      <div className="w-4/5 mx-auto grid md:grid-cols-3 grid-cols-1 gap-8">
        {cardData[activeTab].map((el, i) => (
          <FollowerTabCard
            key={i}
            i={i}
            el={el}
            followedUsers={followedUsers}
            setFollowedUsers={setFollowedUsers}
          />
        ))}
      </div>
    </div>
  );
};

export default FollowerTab;
