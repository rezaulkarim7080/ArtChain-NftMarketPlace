import React from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import images from "../../img";

const CollectionProfile = () => {
  const cardArra = [1, 2, 3, 4, 5];
  return (
    <div className="w-full mt-20 bg-white bg-opacity-10 backdrop-filter  p-10 rounded-xl">
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-main-bg rounded-lg p-4 md:p-8">
        {/* Left Side */}
        <div>
          <img
            src={images.BigNft3}
            alt="profile"
            width={400}
            height={400}
            className="rounded-lg"
          />

          {/* ICONS  */}
          <div className="flex gap-4 text-lg items-center justify-center mt-2">
            <a
              href="#"
              className="bg-icons-color border border-icons-color rounded-full text-main-bg grid p-1.5 transition-all duration-300 ease-in hover:bg-main-bg hover:text-icons-color hover:bg-slate-200"
            >
              <TiSocialFacebook />
            </a>
            <a
              href="#"
              className="bg-icons-color border border-icons-color rounded-full text-main-bg grid p-1.5 transition-all duration-300 ease-in hover:bg-main-bg hover:text-icons-color hover:bg-slate-200"
            >
              <TiSocialLinkedin />
            </a>
            <a
              href="#"
              className="bg-icons-color border border-icons-color rounded-full text-main-bg grid p-1.5 transition-all duration-300 ease-in hover:bg-main-bg hover:text-icons-color hover:bg-slate-200"
            >
              <TiSocialInstagram />
            </a>
            <a
              href="#"
              className="bg-icons-color border border-icons-color rounded-full text-main-bg grid p-1.5 transition-all duration-300 ease-in hover:bg-main-bg hover:text-icons-color hover:bg-slate-200"
            >
              <TiSocialTwitter />
            </a>
            <a
              href="#"
              className="bg-icons-color border border-icons-color rounded-full text-main-bg grid p-1.5 transition-all duration-300 ease-in hover:bg-main-bg hover:text-icons-color hover:bg-slate-200"
            >
              <TiSocialYoutube />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid self-start">
          <h1 className="text-4xl">Awesome NFTs Collections</h1>
          <p className="leading-6 w-4/5 mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus, quia numquam ducimus explicabo doloribus illo, vel
            quisquam aperiam repudiandae, eaque sit obcaecati soluta non eius
            perferendis optio enim. Repudiandae, iure!
          </p>

          <div className="grid items-center md:grid-cols-4 md:gap-8 grid-cols-2 gap-5 bg-main-bg mt-4">
            {cardArra.map((el, i) => (
              <div
                key={i + 1}
                className="bg-main-bg p-4 rounded-2xl text-center"
              >
                <small className="block">Floor price</small>
                <p className="text-2xl">${i + 1}254</p>
                <span className="text-icons-color">+ {i + 2}.11%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionProfile;
