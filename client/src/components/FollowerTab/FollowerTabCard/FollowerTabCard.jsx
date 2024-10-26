import React, { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import img from "../../../img";

const FollowerTabCard = ({ i, el, followedUsers, setFollowedUsers }) => {
  const isFollowed = followedUsers.includes(el.user);
  const [following, setFollowing] = useState(isFollowed);

  useEffect(() => {
    setFollowing(isFollowed);
  }, [followedUsers, isFollowed]);

  const toggleFollow = () => {
    const updatedUsers = following
      ? followedUsers.filter((user) => user !== el.user)
      : [...followedUsers, el.user];

    setFollowedUsers(updatedUsers);
    localStorage.setItem("followedUsers", JSON.stringify(updatedUsers));

    // Save or remove the entire FollowerTabCard data from local storage
    if (!following) {
      const existingFollowingData =
        JSON.parse(localStorage.getItem("followingData")) || [];
      const newFollowingData = [...existingFollowingData, el];
      localStorage.setItem("followingData", JSON.stringify(newFollowingData));
    } else {
      const existingFollowingData =
        JSON.parse(localStorage.getItem("followingData")) || [];
      const newFollowingData = existingFollowingData.filter(
        (data) => data.user !== el.user
      );
      localStorage.setItem("followingData", JSON.stringify(newFollowingData));
    }
  };

  return (
    <div className="relative cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg rounded-2xl overflow-hidden bg-base-100">
      {/* Ranking Badge */}
      <div className="absolute top-4 left-4 z-10 bg-gray-800 text-white text-xs px-3 py-1 rounded-full border border-gray-800 transition-colors duration-300 ease-in hover:bg-white hover:text-gray-800">
        <p>
          #{i + 1} <span>🏆</span>
        </p>
      </div>

      {/* Background Image */}
      <div className="relative w-full h-auto">
        <img
          src={el.background || img.creatorbackground31}
          alt="profile background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Picture and Link */}
      <div className="relative text-center -mt-12">
        <Link to={`/collection/${el.seller}`}>
          <img
            src={el.user || img.user10}
            alt="profile"
            className="rounded-full w-24 h-24 border-4 border-white shadow-lg z-20"
          />
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <Link to={`/collection/${el.seller}`}>
            <h4 className="text-lg font-medium flex items-center gap-2">
              {el.name} <MdVerified className="text-blue-500" />
            </h4>
          </Link>
          {/* <p className="text-gray-500 text-sm">{el.seller || 0} ETH</p> */}
          {/* <p className="text-gray-500 text-sm">{el.total || 0} ETH</p> */}

          {/* //// */}
          {/* /// */}
          <p className="text-gray-500 text-sm">
            {el.seller.substring(0, 5)}...
            {el.seller.substring(el.seller.length - 5, el.seller.length)}ETH
          </p>
          <p className="text-gray-500 text-sm">{el.total || 0} ETH</p>
        </div>

        {/* Follow/Unfollow Button */}
        <div>
          <button
            onClick={toggleFollow}
            className={`flex items-center gap-2 ${
              following ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
            } px-4 py-2 rounded-full border transition-all duration-300 ease-in`}
          >
            {following ? (
              <>
                <TiTick className="text-cyan-400" /> Following
              </>
            ) : (
              "Follow"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowerTabCard;
