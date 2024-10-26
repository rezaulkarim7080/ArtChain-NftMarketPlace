import React, { useState } from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import images from "../../img";
import { MdCloudUpload, MdOutlineReport, MdVerified } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import Button from "./../../components/Navbar/Button/Button";
import { BsThreeDots } from "react-icons/bs";

const AuthorProfileCard = () => {
  const [report, setReport] = useState(false);
  const [share, setShare] = useState(false);

  const copyAddress = () => {
    const copyText = document.getElementById("myInput");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const openShare = () => {
    setShare(!share);
    setReport(false);
  };

  const openReport = () => {
    setReport(!report);
    setShare(false);
  };

  return (
    <div className="w-full z-[22222] mt-20">
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-center bg-main-bg-color p-10 rounded-lg gap-12">
        <div className="flex justify-center">
          <img
            src={images.nft_1}
            alt="profile"
            width={220}
            height={220}
            className="rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl mt-[-0.5rem]">
            Rezaul Karim{" "}
            <span>
              <MdVerified />
            </span>
          </h2>
          <div className="mt-[-1rem] flex items-center border-b border-transparent">
            <input
              type="text"
              id="myInput"
              value="0x343214asfskfs9fs9...A475"
              className="outline-none w-1/3 text-base bg-transparent border-none"
            />
            <FiCopy
              onClick={copyAddress}
              className="text-2xl ml-2 cursor-pointer transition-colors duration-300 ease-in hover:text-icons-color"
            />
          </div>
          <p className="text-lg w-11/12 mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, unde
            rerum aperiam quia, eligendi sunt quibusdam quae pariatur asperiores
            esse natus aut, cupiditate nihil aspernatur excepturi distinctio
            eius impedit consectetur?
          </p>
          <div className="flex items-center gap-4 text-2xl mt-4">
            <a
              href="#"
              className="bg-icons-color text-main-bg-color rounded-full p-2 border border-icons-color transition-colors duration-300 ease-in hover:bg-main-bg-color hover:text-icons-color"
            >
              <TiSocialFacebook />
            </a>
            <a
              href="#"
              className="bg-icons-color text-main-bg-color rounded-full p-2 border border-icons-color transition-colors duration-300 ease-in hover:bg-main-bg-color hover:text-icons-color"
            >
              <TiSocialLinkedin />
            </a>
            <a
              href="#"
              className="bg-icons-color text-main-bg-color rounded-full p-2 border border-icons-color transition-colors duration-300 ease-in hover:bg-main-bg-color hover:text-icons-color"
            >
              <TiSocialInstagram />
            </a>
            <a
              href="#"
              className="bg-icons-color text-main-bg-color rounded-full p-2 border border-icons-color transition-colors duration-300 ease-in hover:bg-main-bg-color hover:text-icons-color"
            >
              <TiSocialTwitter />
            </a>
            <a
              href="#"
              className="bg-icons-color text-main-bg-color rounded-full p-2 border border-icons-color transition-colors duration-300 ease-in hover:bg-main-bg-color hover:text-icons-color"
            >
              <TiSocialYoutube />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-8 relative">
          <Button btnName="Follow" handleClick={() => {}} />
          <MdCloudUpload
            onClick={openShare}
            className="text-3xl cursor-pointer"
          />
          {share && (
            <div className="absolute left-8 top-20 w-60 bg-main-bg-color rounded-lg p-2 z-[111111]">
              <p className="flex items-center gap-2 cursor-pointer p-2 transition-colors duration-300 ease-in hover:bg-icons-color hover:text-main-bg-color rounded-lg">
                <TiSocialFacebook className="text-xl" />
                FaceBook
              </p>
              <p className="flex items-center gap-2 cursor-pointer p-2 transition-colors duration-300 ease-in hover:bg-icons-color hover:text-main-bg-color rounded-lg">
                <TiSocialLinkedin className="text-xl" />
                Linkedin
              </p>
              <p className="flex items-center gap-2 cursor-pointer p-2 transition-colors duration-300 ease-in hover:bg-icons-color hover:text-main-bg-color rounded-lg">
                <TiSocialInstagram className="text-xl" />
                Instagram
              </p>
              <p className="flex items-center gap-2 cursor-pointer p-2 transition-colors duration-300 ease-in hover:bg-icons-color hover:text-main-bg-color rounded-lg">
                <TiSocialTwitter className="text-xl" />
                Twitter
              </p>
            </div>
          )}
          <BsThreeDots
            onClick={openReport}
            className="text-3xl cursor-pointer"
          />
          {report && (
            <div className="absolute left-20 top-16 w-40 bg-main-bg-color rounded-lg p-2 z-[111111]">
              <p className="flex items-center gap-2 cursor-pointer p-2 transition-colors duration-300 ease-in hover:bg-icons-color hover:text-main-bg-color rounded-lg">
                <MdOutlineReport className="text-xl" />
                Report abuse
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
