import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineContentCopy, MdOutlineHttp } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti";
import Button from "../../components/Navbar/Button/Button";

const Form = () => {
  return (
    <div className="w-full">
      <div className="md:p-8">
        <form>
          <div className="mt-2">
            <label htmlFor="name" className="block text-xl font-bold ml-4">
              UserName
            </label>
            <input
              type="text"
              placeholder="rasea akrm"
              className="w-full border border-gray-400 p-4 rounded-xl mt-2 outline-none"
            />
          </div>
          <div className="mt-8">
            <label htmlFor="email" className="block text-xl font-bold ml-4">
              Email
            </label>
            <div className="w-full border border-gray-400 rounded-xl flex items-center gap-4 overflow-hidden mt-2">
              <div className="text-2xl bg-gray-400 p-2 text-white cursor-pointer">
                <HiOutlineMail />
              </div>
              <input
                type="text"
                placeholder="email"
                className="w-9/12 bg-transparent border-none outline-none"
              />
            </div>
          </div>
          <div className="mt-8">
            <label
              htmlFor="description"
              className="block text-xl font-bold ml-4"
            >
              Description
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="Something about yourself"
              className="w-full bg-transparent border border-gray-400 rounded-xl p-4 mt-2 outline-none"
            ></textarea>
          </div>

          <div className="mt-8">
            <label htmlFor="website" className="block text-xl font-bold ml-4">
              Website
            </label>
            <div className="w-full border border-gray-400 rounded-xl flex items-center gap-4 overflow-hidden mt-2">
              <div className="text-2xl bg-gray-400 p-2 text-white cursor-pointer">
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder="Website"
                className="w-9/12 bg-transparent border-none outline-none"
              />
            </div>
          </div>
          {/* /// */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8">
            <div>
              <label
                htmlFor="facebook"
                className="block text-xl font-bold ml-4"
              >
                Facebook
              </label>
              <div className="w-full border border-gray-400 rounded-xl flex items-center gap-4 overflow-hidden mt-2">
                <div className="text-2xl bg-gray-400 p-2 text-white cursor-pointer">
                  <TiSocialFacebook />
                </div>
                <input
                  type="text"
                  placeholder="http://facebook"
                  className="w-9/12 bg-transparent border-none outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="twitter" className="block text-xl font-bold ml-4">
                Twitter
              </label>
              <div className="w-full border border-gray-400 rounded-xl flex items-center gap-4 overflow-hidden mt-2">
                <div className="text-2xl bg-gray-400 p-2 text-white cursor-pointer">
                  <TiSocialTwitter />
                </div>
                <input
                  type="text"
                  placeholder="http://twitter"
                  className="w-9/12 bg-transparent border-none outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="instagram"
                className="block text-xl font-bold ml-4"
              >
                Instagram
              </label>
              <div className="w-full border border-gray-400 rounded-xl flex items-center gap-4 overflow-hidden mt-2">
                <div className="text-2xl bg-gray-400 p-2 text-white cursor-pointer">
                  <TiSocialInstagram />
                </div>
                <input
                  type="text"
                  placeholder="http://instagram"
                  className="w-9/12 bg-transparent border-none outline-none"
                />
              </div>
            </div>
          </div>
          <div className="mt-16">
            <label htmlFor="wallet" className="block text-xl font-bold ">
              Wallet Address
            </label>
            <div className="w-full border border-gray-400 rounded-xl flex items-center gap-4 overflow-hidden mt-2">
              <div className="text-2xl bg-gray-400 p-2 text-white cursor-pointer">
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                placeholder="0x244fs442sf54fffws737"
                className="md:w-9/12 bg-transparent border-none outline-none"
              />
              <MdOutlineContentCopy className="text-2xl cursor-pointer" />
            </div>
          </div>
          <div className="mt-16">
            <Button
              btnName="Upload Profile"
              handleClick={() => {}}
              className="w-full flex justify-center text-2xl"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
