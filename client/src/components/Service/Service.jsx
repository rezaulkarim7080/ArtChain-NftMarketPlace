import React from "react";
import images from "../../img";

const Service = () => {
  return (
    <div className="mt-10 mx-auto mb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
        {/* ///////////  item1  ///////    */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-10 rounded-xl flex flex-col items-center text-center">
          <img
            src={images.service10}
            alt="service1"
            className="w-24 h-24 mb-6"
          />
          <div className="mt-12 mb-8">
            <span className="px-6 py-2 rounded-full bg-blue-500 text-gray-800">
              Step-1
            </span>
            <h3 className="text-2xl font-semibold mt-4 ">
              {" "}
              Set up your wallet
            </h3>
            <p className="mt-2">
              Once you've set up your wallet of choice, connect it by clicking
              the wallet icon easily.
            </p>
          </div>
        </div>
        {/* ///////////  item2  ///////    */}
        <div className="flex flex-col items-center text-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-10 rounded-xl ">
          <img
            src={images.service11}
            alt="service2"
            className="w-24 h-24 mb-6"
          />
          <div className="mt-12 mb-8">
            <span className="px-6 py-2 rounded-full bg-blue-500 text-gray-800">
              Step-2
            </span>
            <h3 className="text-2xl font-semibold mt-4"> Create collection</h3>
            <p className="mt-2">
              Click my collections and set up your collection. Add social links
              a description and others.
            </p>
          </div>
        </div>
        {/* ///////////  item3  ///////    */}
        <div className="flex flex-col items-center text-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-10 rounded-xl ">
          <img
            src={images.service12}
            alt="service3"
            className="w-24 h-24 mb-6"
          />
          <div className="mt-12 mb-8">
            <span className="px-6 py-2 rounded-full bg-blue-500 text-gray-800">
              Step-3
            </span>
            <h3 className="text-2xl font-semibold mt-4"> Add your NFT</h3>
            <p className="mt-2">
              Upload your work (Image, art, video, audio, or 3D art) add a title
              and description.
            </p>
          </div>
        </div>
        {/* ///////////  item4  ///////    */}
        <div className="flex flex-col items-center text-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-10 rounded-xl ">
          <img
            src={images.service13}
            alt="service4"
            className="w-24 h-24 mb-6"
          />
          <div className="mt-12 mb-8">
            <span className="px-6 py-2 rounded-full bg-blue-500 text-gray-800">
              Step-4
            </span>
            <h3 className="text-2xl font-semibold mt-4"> List them sale</h3>
            <p className="mt-2">
              Choose between action, fixed-price listings & pricing listings. We
              help you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
