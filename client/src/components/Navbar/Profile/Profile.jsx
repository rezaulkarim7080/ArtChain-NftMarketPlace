import { useContext } from "react";
import { Link } from "react-router-dom";
import images from "../../../img";
import { MdHelpCenter } from "react-icons/md";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { TbDownload } from "react-icons/tb";
import { WalletContext } from "../../../context/wallet";

const Profile = ({ closeProfileMenu }) => {
  const { userAddress, connectWallet, isConnected, disconnectWallet } =
    useContext(WalletContext);

  // Function to handle link clicks
  const handleLinkClick = () => {
    closeProfileMenu();
  };

  return (
    <div className="absolute p-4 shadow-xl text-base w-60 rounded-xl md:left-[-10rem] top-16 bg-base-100 z-auto ">
      {/* User Account Section */}
      <div className="flex items-start gap-8 p-6">
        <img
          src={images.user1}
          alt="user profile"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">Rexa</p>
          {/* Check if userAddress is available */}
          {userAddress ? (
            <h1 className="text-gray-500">
              {userAddress.slice(0, 5)}...
              {userAddress.slice(userAddress.length - 5, userAddress.length)}
            </h1>
          ) : (
            <h1 className="text-gray-500">Not connected</h1>
          )}
        </div>
      </div>

      {/* Profile Menu Section */}
      <div className="space-y-4">
        {/* Profile Links Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-8 p-4 hover:bg-cyan-600 hover:text-white rounded-lg transition-all duration-300">
            <FaUserAlt />
            <p>
              <Link to={`/account`} onClick={handleLinkClick}>
                My profile
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-8 p-4 hover:bg-cyan-600 hover:text-white rounded-lg transition-all duration-300">
            <FaRegImage />
            <p>
              <Link to={`/my-items`} onClick={handleLinkClick}>
                My Items
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-8 p-4 hover:bg-cyan-600 hover:text-white rounded-lg transition-all duration-300">
            <FaUserEdit />
            <p>
              <Link to={`/upload-nft`} onClick={handleLinkClick}>
                Edit
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Menu Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-8 p-4 hover:bg-cyan-600 hover:text-white rounded-lg transition-all duration-300">
            <MdHelpCenter />
            <p>
              <Link to={`/upload-nft`} onClick={handleLinkClick}>
                Help
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-8 p-4 hover:bg-cyan-600 hover:text-white rounded-lg transition-all duration-300">
            <TbDownload />
            <p>
              <button onClick={disconnectWallet}>Disconnect</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
