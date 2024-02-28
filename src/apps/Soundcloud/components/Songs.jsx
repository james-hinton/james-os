import { useState } from "react";
import Song from "./Song";
import SongDescription from "./SongDescription";

const Songs = ({ tracks, hideSidebar }) => {
  return (
    <>
      <div className="sc-flex sc-flex-col">
        {/* Title */}
        <div className="sc-flex sc-items-center sc-px-5 sc-py-1 sc-border-b-[0.5px] sc-mr-2 sc-border-b-black-300">
          <h4 className="sc-text-gray-800  sc-text-xl">Songs</h4>
        </div>

        {tracks.map((track, index) => (
          <div key={"track" + index} className="sc-p-2">
            <SongDescription description={track.description} />
            <Song track={track} large hideSidebar={hideSidebar} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Songs;
