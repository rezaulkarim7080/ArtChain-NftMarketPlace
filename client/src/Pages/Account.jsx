import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";

import images from "../img";
import Form from "./../AccountPage/Form/Form";
import { WalletContext } from "../context/wallet";

const Account = () => {
  const [fileUrl, setFileUrl] = useState(null);

  //////
  /////
  const { userAddress, connectWallet, isConnected, disconnectWallet } =
    useContext(WalletContext);

  ////
  //
  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 500000,
  });
  ///////
  //////
  /////
  return (
    <div className=" p-5">
      <div className="md:w-1/2 mx-auto border-b border-icons-color pb-4 ">
        <h1 className="text-2xl">Profile Setting</h1>
        <p className=" w-4/5 pb-2">
          You can set preferred display name, create your profile URL and manage
          other personal settings.
        </p>
      </div>
      <div className="md:w-1/2 mx-auto grid grid-cols-1fr-5fr md:gap-8 md:mt-6 items-start glass-effect">
        <div
          className="mt-5 cursor-pointer relative text-center flex items-center gap-5"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <img
            src={images.user1}
            alt="userImage"
            className="w-36 h-36 rounded-full"
          />
          <p className="text-xl">Change Image</p>
        </div>
        <div>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Account;
