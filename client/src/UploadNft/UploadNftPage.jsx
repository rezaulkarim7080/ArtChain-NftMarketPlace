import React, { useContext, useState } from "react";
import { MdOutlineHttp } from "react-icons/md";
import { TiSocialInstagram, TiSocialTwitter, TiTick } from "react-icons/ti";
import { FaPercent } from "react-icons/fa";
import Button from "../components/Navbar/Button/Button";

import images from "../img";
import { PiCurrencyEthThin } from "react-icons/pi";
import { WalletContext } from "../context/wallet";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../components/pinata";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import marketplace from "../../marketplace.json";
//////////////////
//////////
//////////

const UploadNftPage = () => {
  const [formParams, updateFormParams] = useState({
    name: "",
    website: "",
    description: "",
    royalties: "20",
    stock: "1",
    properties: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState();
  const [message, updateMessage] = useState("");
  const [btn, setBtn] = useState(false);
  ///
  const [active, setActive] = useState(0);
  const [category, setCategory] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(images.nft_1);
  ///
  const [btnContent, setBtnContent] = useState("List NFT");
  const router = useNavigate();
  const { isConnected, signer } = useContext(WalletContext);

  ////// ----- FILE UPLOAD FUNCTIONS

  async function onFileChange(e) {
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.set("file", file);
      setBtn(false);
      updateMessage("Uploading image... ");
      const response = await uploadFileToIPFS(data);

      //
      if (response.success === true) {
        setBtn(true);
        updateMessage("");
        setFileURL(response.pinataURL);
      }
      //
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } catch (e) {
      console.log("Error during file upload...", e);
    }
  }

  ///////////////////////------------------

  async function uploadMetadataToIPFS() {
    const { name, description, stock, price, royalties, website, properties } =
      formParams;
    if (!name || !website || !description || !price || !fileURL) {
      alert("Please fill all the fields!");
      updateMessage("Please fill all the fields!");
      return -1;
    }
    // !royalties ||  !stock || !properties ||
    const nftJSON = {
      name,
      website,
      description,
      royalties,
      stock,
      properties,
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

  /////////////////////  listNFT //

  ////
  /////
  async function listNFT(e) {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      setBtnContent("Processing...");
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;

      updateMessage("Uploading NFT...!");

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
      updateFormParams({
        name: "",
        website: "",
        description: "",
        royalties: "20",
        stock: "1",
        properties: "",
        price: "",
        image: "",
      });
      alert("Successfully listed your NFT!");
    } catch (e) {
      alert("Upload error", e);
    }
  }
  // State management for form inputs

  ////

  // Category options for the user to select
  const categoryArray = [
    { image: images.nft_image_2, category: "Sports" },
    { image: images.slider10, category: "Art" },
    { image: images.hero13, category: "Music" },
    { image: images.hero11, category: "Photography" },
    { image: images.hero12, category: "Games" },
  ];

  ////////////////
  ///

  // Handle category selection and update properties in formParams
  const handleCategorySelect = (i, el) => {
    setActive(i + 1);
    setCategory(el.category);
    updateFormParams({ ...formParams, properties: el.category });
  };
  ////
  ///////
  return (
    <form
      onSubmit={listNFT}
      className="border-[1px] border-slate-300 md:py-5 glass-effect "
    >
      {/* UPLOAD NFT IMAGE */}
      <div className="md:w-4/5 mx-auto md:mt-8">
        <label htmlFor="avatar_upload" className="block  font-medium mb-2">
          Choose NFT Image
        </label>
        <div className="flex items-center">
          <div className="mr-3">
            <figure className="w-24 h-24">
              <img
                src={avatarPreview}
                className="rounded-full object-cover w-full h-full "
                alt="Avatar Preview"
              />
            </figure>
          </div>
          <div className="relative">
            <input
              type="file"
              name="image"
              className="block w-full text-sm  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file: file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              id="customFile"
              onChange={onFileChange}
            />
          </div>
        </div>
        <div className="text-teal-600 font-medium ">{message}</div>
      </div>
      {/* Form for NFT details */}
      <div className="w-4/5 mx-auto mt-8">
        {/* Item Name Input */}
        <div className="mb-6">
          <label htmlFor="nft" className="block text-lg ">
            Item Name
          </label>
          <input
            type="text"
            placeholder="rasea akrm"
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formParams.name}
            onChange={(e) =>
              updateFormParams({ ...formParams, name: e.target.value })
            }
          />
        </div>
        {/* Website Input */}
        <div className="mb-6">
          <label htmlFor="website" className="block text-lg ">
            Website
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <div className="p-2">
              <MdOutlineHttp className="" />
            </div>
            <input
              type="text"
              placeholder="Website"
              className="w-full px-4 py-2 border-0 rounded-r-lg focus:outline-none"
              value={formParams.website}
              onChange={(e) =>
                updateFormParams({ ...formParams, website: e.target.value })
              }
            />
          </div>
        </div>
        {/* Description Input */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-lg ">
            Description
          </label>
          <textarea
            cols="30"
            rows="6"
            placeholder="Something about yourself"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            value={formParams.description}
            onChange={(e) =>
              updateFormParams({ ...formParams, description: e.target.value })
            }
          ></textarea>
          <p className="text-sm  mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
            deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur animi porro magni fuga
          </p>
        </div>
        {/* Category Selection */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg ">
            Choose Collection
          </label>

          <div className="flex gap-4 overflow-x-auto mt-4">
            {categoryArray.map((el, i) => (
              <div
                key={i + 1}
                onClick={() => handleCategorySelect(i, el)}
                className={`flex items-center gap-4 p-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 ${
                  active === i + 1 ? "bg-teal-500 text-white" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16">
                    <img
                      src={el.image}
                      alt="category"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full ${
                      active === i + 1
                        ? "bg-gray-600 text-white"
                        : "bg-transparent"
                    }`}
                  >
                    <TiTick />
                  </div>
                </div>
                <p className="">Crypto Legend - {el.category}</p>
              </div>
            ))}
          </div>
        </div>
        {/* /////// */}
        {/* Social Media Inputs */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
          {/* Royalties Input */}
          <div>
            <label htmlFor="royalties" className="block text-lg ">
              Royalties
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <div className="p-2">
                <FaPercent className="" />
              </div>
              <input
                type="number"
                placeholder="20%" // Default value set
                className="w-full px-4 py-2 border-0 rounded-r-lg focus:outline-none"
                value={formParams.royalties || 20} // Set default value to 20%
                onChange={(e) =>
                  updateFormParams({ ...formParams, royalties: e.target.value })
                } // Allow user to change
              />
            </div>
          </div>
          {/* Size Input */}
          <div>
            <label htmlFor="size" className="block text-lg ">
              Stock
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <div className="p-2">
                <TiSocialTwitter className="" />
              </div>
              <input
                type="number"
                placeholder="Stock size"
                className="w-full px-4 py-2 border-0 rounded-r-lg focus:outline-none"
                value={formParams.stock || 1}
                onChange={(e) =>
                  updateFormParams({ ...formParams, stock: e.target.value })
                }
              />
            </div>
          </div>

          {/* Property Input */}

          <div>
            <label htmlFor="properties" className="block text-lg ">
              Properties
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <div className="p-2">
                <TiSocialInstagram className="" />
              </div>
              <input
                type="text"
                placeholder="Property"
                className="w-full px-4 py-2 border-0 rounded-r-lg focus:outline-none"
                value={formParams.properties} // Auto-filled with category
                readOnly
              />
            </div>
          </div>

          {/* Price Input */}
          <div>
            <label htmlFor="Price" className="block text-lg ">
              Price
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <div className="p-2">
                <PiCurrencyEthThin className="" />
              </div>
              <input
                type="number"
                placeholder="Price"
                className="w-full px-4 py-2 border-0 rounded-r-lg focus:outline-none"
                value={formParams.price}
                onChange={(e) =>
                  updateFormParams({ ...formParams, price: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        {/* Upload Button */}{" "}
        <div className="text-teal-600 font-medium ">{message}</div>
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6"> */}
        <div className="mb-6">
          {/* Submit Button */}
          <button
            type="submit"
            className={`${
              btn
                ? "btn btn-primary w-full text-lg  py-3"
                : "btn w-full text-lg  py-3 bg-gray-400 text-gray-300 cursor-not-allowed opacity-50"
            } flex items-center justify-center`}
            disabled={!btn}
          >
            {btnContent === "Processing..." && (
              <span className="inline-block border-4 border-gray-300 border-t-white rounded-full w-6 h-6 mr-2 animate-spin" />
            )}
            {btnContent}
          </button>

          {/* Preview Button */}
          {/* <button
            className="btn btn-secondary w-full py-3 text-lg "
            onClick={() => {}}
          >
            Preview
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default UploadNftPage;
