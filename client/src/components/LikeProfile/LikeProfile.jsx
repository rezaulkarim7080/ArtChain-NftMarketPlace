import React from "react";
import img from "../../img";

const LikeProfile = () => {
  const imageArray = [1, 2];
  return (
    <div className="flex items-center">
      {imageArray.map((el, i) => (
        <div
          className="border-3 border-gray-800 rounded-full gap-2"
          key={i + 1}
        >
          <img
            src={img.user1}
            alt=""
            className="w-6 h-6 rounded-full " // 24px width and height (15px is too small)
          />
        </div>
      ))}
    </div>
  );
};

export default LikeProfile;
