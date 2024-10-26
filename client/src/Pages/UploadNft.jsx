import UploadNftPage from "./../UploadNft/UploadNftPage";

const UploadNft = () => {
  return (
    <div className="w-full  md:my-10 z-[2]">
      <div className="md:w-3/5 mx-auto">
        <div className="  pb-8">
          <h1 className="text-3xl">Create New Item</h1>
          <p className="text-base w-4/5">
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>

        <div>
          <UploadNftPage />
        </div>
      </div>
    </div>
  );
};

export default UploadNft;
