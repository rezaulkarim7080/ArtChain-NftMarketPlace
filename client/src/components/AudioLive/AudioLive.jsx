import AudioCard from "./AudioCard/AudioCard";
import AudioCardSmall from "./AudioCardSmall/AudioCardSmall";

const AudioLive = () => {
  return (
    <div className="w-full p-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left */}
        <div className="grid gap-6">
          <AudioCard />
          <AudioCard />
        </div>

        {/* Right */}
        <div className="grid gap-6">
          <AudioCardSmall />
          <AudioCardSmall />
          <AudioCardSmall />
        </div>
      </div>
    </div>
  );
};

export default AudioLive;
