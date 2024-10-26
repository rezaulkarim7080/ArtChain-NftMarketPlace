import { useContext, useState } from "react";
import { WalletContext } from "./../context/wallet";
import { useNavigate } from "react-router-dom";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./pinata";
import { ethers } from "ethers";
import marketplace from "../../marketplace.json";

const SellNFT = () => {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState();
  const [message, updateMessage] = useState("");
  const [btn, setBtn] = useState(false);
  const [btnContent, setBtnContent] = useState("List NFT");
  const router = useNavigate();
  const { isConnected, signer } = useContext(WalletContext);

  async function onFileChange(e) {
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.set("file", file);
      setBtn(false);
      updateMessage("Uploading image... Please don't click anything!");
      const response = await uploadFileToIPFS(data);
      if (response.success === true) {
        setBtn(true);
        updateMessage("");
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload...", e);
    }
  }

  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    if (!name || !description || !price || !fileURL) {
      updateMessage("Please fill all the fields!");
      return -1;
    }

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      console.log("Error uploading JSON metadata: ", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      setBtnContent("Processing...");
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;

      updateMessage("Uploading NFT...Please don't click anything!");

      let contract = new ethers.Contract(
        marketplace.address,
        marketplace.abi,
        signer
      );
      const price = ethers.parseEther(formParams.price);

      let transaction = await contract.createToken(metadataURL, price);
      await transaction.wait();

      setBtnContent("List NFT");
      setBtn(false);
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      alert("Successfully listed your NFT!");
    } catch (e) {
      alert("Upload error", e);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-400 to-purple-400">
      {isConnected ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold text-orange-500 uppercase text-center mb-10">
              Upload your NFT
            </h2>
            <form onSubmit={listNFT}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg font-bold text-orange-500"
                >
                  NFT Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter the NFT name."
                  className="border border-gray-300 p-3 w-full rounded-md"
                  value={formParams.name}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="block mb-2 text-lg font-bold text-orange-500"
                >
                  NFT Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter the NFT description."
                  className="border border-gray-300 p-3 w-full rounded-md"
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="price"
                  className="block mb-2 text-lg font-bold text-orange-500"
                >
                  Price (in Eth)
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter the price."
                  className="border border-gray-300 p-3 w-full rounded-md"
                  value={formParams.price}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, price: e.target.value })
                  }
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="file"
                  className="block mb-2 text-lg font-bold text-orange-500"
                >
                  Upload NFT
                </label>
                <input
                  type="file"
                  name="file"
                  className="border border-gray-300 p-3 w-full rounded-md"
                  onChange={onFileChange}
                />
              </div>
              <div className="text-red-500 text-center mb-3">{message}</div>
              <button
                type="submit"
                className={`w-full py-3 rounded-md font-bold text-white ${
                  btn
                    ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                    : "bg-gray-500 cursor-not-allowed opacity-50"
                } flex items-center justify-center`}
              >
                {btnContent === "Processing..." && (
                  <span className="inline-block border-4 border-gray-300 border-t-transparent border-solid rounded-full w-6 h-6 animate-spin mr-2"></span>
                )}
                {btnContent}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-4xl font-bold text-red-600 text-center mt-20">
          Connect Your Wallet to Continue...
        </div>
      )}
    </div>
  );
};

export default SellNFT;
