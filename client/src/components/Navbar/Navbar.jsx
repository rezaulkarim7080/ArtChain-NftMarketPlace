import { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { CgMenuRight } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";
import {
  Discover,
  HelpCenter,
  Profile,
  Notification,
  SideBar,
} from "./AllComponentsIndex";
import Button from "./Button/Button";
import images from "../../img";
import { Link } from "react-router-dom";
import { WalletContext } from "../../context/wallet";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const { connectWallet, isConnected } = useContext(WalletContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const openSideBar = () => {
    setOpenSideMenu(true);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Navbar scroll effect
  const [show, setShow] = useState("translate-y-0");
  const [lastScrolly, setLastScrolly] = useState(0);

  // scrolling down navbar effect

  const controllNavbar = () => {
    if (
      window.scrollY > lastScrolly &&
      window.scrollY > window.scrollY.length
    ) {
      // Hide navbar when scrolling down past 100px
      setShow("-translate-y-[80px]");
    } else {
      // Show navbar when scrolling up or below 100px
      setShow("translate-y-0 shadow-sm");
    }
    setLastScrolly(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controllNavbar);
    return () => {
      window.removeEventListener("scroll", controllNavbar);
    };
  }, [lastScrolly]);

  ////
  //////
  ///
  return (
    <div className="fixed top-0 w-full z-[2000000] h-16">
      <div
        className={`transition-transform duration-300 ease-in-out ${show} w-full h-16 bg-white bg-opacity-20 backdrop-filter flex justify-between px-5`}
      >
        {/* Left Side */}
        <div className="flex items-center gap-5">
          {/* Logo */}
          <Link to="/" className="flex gap-4">
            <svg
              className="w-8 text-cyan-700"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth={2}
              strokeLinecap="round"
              strokeMiterlimit={10}
              stroke="currentColor"
              fill="none"
            >
              <rect x={3} y={1} width={7} height={12} />
              <rect x={3} y={17} width={7} height={6} />
              <rect x={14} y={1} width={7} height={6} />
              <rect x={14} y={11} width={7} height={12} />
            </svg>
            <h1 className="text-3xl text-cyan-700 font-semibold">ArtChain</h1>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-10">
            {/* Discover */}
            <div className="relative">
              <p
                className="cursor-pointer flex items-center gap-1"
                onClick={() => toggleDropdown("discover")}
              >
                Discover
                <TiArrowSortedDown
                  className={`transition-transform ${
                    openDropdown === "discover" ? "rotate-180" : ""
                  }`}
                />
              </p>
              {openDropdown === "discover" && (
                <div className="absolute bg-base-200 top-12 p-4 rounded-lg shadow-lg w-48 z-10">
                  <Discover />
                </div>
              )}
            </div>

            {/* Help Center */}
            <div className="relative">
              <p
                className="cursor-pointer flex items-center gap-1"
                onClick={() => toggleDropdown("helpCenter")}
              >
                Help Center
                <TiArrowSortedDown
                  className={`transition-transform ${
                    openDropdown === "helpCenter" ? "rotate-180" : ""
                  }`}
                />
              </p>
              {openDropdown === "helpCenter" && (
                <div className="absolute bg-base-200 top-12 p-4 rounded-lg shadow-lg w-48 z-10">
                  <HelpCenter />
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <MdNotifications
                className="text-2xl cursor-pointer"
                onClick={() => toggleDropdown("notifications")}
              />
              {openDropdown === "notifications" && (
                <div>
                  <Notification />
                </div>
              )}
            </div>

            {/* Create Button */}
            {!isConnected ? (
              <Button btnName="Connect" handleClick={connectWallet} />
            ) : (
              <Link to="/upload-nft">
                <Button btnName="Create" />
              </Link>
            )}

            {/* Profile */}
            <div className="relative">
              <img
                src={images.user1}
                alt="User Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => toggleDropdown("profile")}
              />
              {openDropdown === "profile" && (
                <div>
                  <Profile />
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>

          {/* Hamburger Menu Button - Visible on smaller screens */}
          {!openSideMenu && (
            <div className="md:hidden">
              <CgMenuRight
                className="text-3xl cursor-pointer"
                onClick={openSideBar}
              />
            </div>
          )}
        </div>
      </div>

      {/* Sidebar and Overlay */}
      {openSideMenu && (
        <>
          <div
            className="w-full h-full inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setOpenSideMenu(false)}
          ></div>
          <div className="fixed left-5 right-0 top-0 bottom-0 bg-base-100 shadow-lg z-50">
            <SideBar setOpenSideMenu={setOpenSideMenu} />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
