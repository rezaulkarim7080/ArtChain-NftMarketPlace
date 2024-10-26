import React from "react";

const Banner = ({ bannerImage }) => {
  return (
    <div>
      <div className="w-full">
        <img
          src={bannerImage}
          alt="banner"
          className="object-cover w-full h-[300px] md:h-[300px]"
        />
      </div>
      {/* Mobile Banner */}
      {/* <div className="hidden sm:block">
        <img
          src={bannerImage}
          alt="banner"
          className="object-cover w-full h-[900px]"
        />
      </div> */}
    </div>
  );
};

export default Banner;
