import React, { useState, useContext } from "react";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
} from "react-icons/ti";
import images from "../../../img";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { WalletContext } from "../../../context/wallet";
import { Profile } from "../AllComponentsIndex";
import ThemeToggle from "../../ThemeToggle";

const SideBar = ({ setOpenSideMenu }) => {
  const { userAddress, connectWallet, isConnected } = useContext(WalletContext);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const discover = [
    { name: "Collection", link: "collection" },
    { name: "Search", link: "search" },
  ];
  const helpCenter = [
    { name: "Contact Us", link: "contact-us" },
    { name: "Blog", link: "blog" },
    { name: "Subscription", link: "subscription" },
  ];

  // Close the sidebar
  const closeSideBar = () => setOpenSideMenu(false);

  return (
    <div className="p-8 border-b border-primary relative bg-white w-full">
      <div className=" absolute top-3 left-5 transition-all duration-200 cursor-pointer ">
        <ThemeToggle />
      </div>
      {/* Close Button */}
      <GrClose
        className="w-7 h-7 absolute top-3 right-8 transition-all duration-200 cursor-pointer shadow-lg bg-cyan-600 rounded-full hover:rotate-45"
        onClick={closeSideBar}
      />

      {/* Sidebar Logo and Description */}
      <div className="text-center">
        <p className="mt-4 text-base text-gray-600">
          Discover the most outstanding articles on all topics of NFT. Share
          your own stories.
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-8 mt-6">
          <a href="#">
            <TiSocialFacebook className="text-2xl" />
          </a>
          <a href="#">
            <TiSocialLinkedin className="text-2xl" />
          </a>
          <a href="#">
            <TiSocialInstagram className="text-2xl" />
          </a>
          <a href="#">
            <TiSocialTwitter className="text-2xl" />
          </a>
          <a href="#">
            <TiSocialYoutube className="text-2xl" />
          </a>
        </div>
      </div>

      {/* Sidebar Menus */}
      <div className="mt-8">
        {/* Discover Menu */}
        <div>
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 hover:text-primary rounded-lg"
            onClick={() => toggleDropdown("discover")}
          >
            <p className="font-medium">Discover</p>
            <TiArrowSortedDown
              className={`transition-transform ${
                openDropdown === "discover" ? "rotate-180" : ""
              }`}
            />
          </div>
          {openDropdown === "discover" && (
            <div className="mt-2 bg-white shadow-lg rounded-lg z-10">
              {discover.map((item, index) => (
                <Link
                  key={index}
                  to={`/${item.link}`}
                  className="block py-2 px-4 hover:bg-gray-200 hover:text-primary text-gray-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Help Center Menu */}
        <div className="mt-4">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 hover:text-primary rounded-lg"
            onClick={() => toggleDropdown("helpCenter")}
          >
            <p className="font-medium">Help Center</p>
            <TiArrowSortedDown
              className={`transition-transform ${
                openDropdown === "helpCenter" ? "rotate-180" : ""
              }`}
            />
          </div>
          {openDropdown === "helpCenter" && (
            <div className="mt-2 bg-white shadow-lg rounded-lg z-10">
              {helpCenter.map((item, index) => (
                <Link
                  key={index}
                  to={`/${item.link}`}
                  className="block py-2 px-4 hover:bg-gray-200 hover:text-primary text-gray-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="mt-4">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 hover:text-primary rounded-lg"
            onClick={() => toggleDropdown("profile")}
          >
            <img
              src={images.user1} // Your profile image
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            />
            <TiArrowSortedDown
              className={`transition-transform ${
                openDropdown === "profile" ? "rotate-180" : ""
              }`}
            />
          </div>
          {openDropdown === "profile" && (
            <div className="mt-2 bg-white shadow-lg rounded-lg z-10">
              <Profile />
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Buttons */}
      <div className="flex flex-col mt-6">
        {!isConnected ? (
          <Button btnName="Connect" handleClick={connectWallet} />
        ) : (
          <Link to="/upload-nft">
            <Button btnName="Create" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBar;
