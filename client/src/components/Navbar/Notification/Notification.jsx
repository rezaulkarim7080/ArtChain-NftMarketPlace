import images from "../../../img";

const Notification = () => {
  return (
    <div className="absolute p-4 shadow-lg text-base w-80 rounded-xl left-[-17rem] top-12 bg-base-100 transition-all duration-200 z-50">
      <p className="text-lg font-semibold mb-8">Notification</p>
      <div className="flex items-start gap-4 p-4 hover:bg-cyan-600 hover:text-white rounded-lg transition-all duration-300">
        <div>
          <img
            src={images.user1}
            alt="profile image"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="leading-none mt-[-0.8rem]">
          <h4 className="font-semibold">Rezaul Karim</h4>
          <p className="text-sm my-3">Measure action your user...</p>
          <small className="text-gray-500">3 minutes ago</small>
        </div>
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
      </div>
    </div>
  );
};

export default Notification;
