import { useState } from "react";
import { titleCase } from "../utils/utils";

const FollowerCount = ({tracks}) => {

  const [followerData, setFollowerData] = useState({
    followers: Math.floor(Math.random() * 1000 + 100),
    following: Math.floor(Math.random() * 1000 + 100),
    tracks: tracks.length,
  });

  return (
    <>
      <div className="sc-flex sc-flex-row">
        {Object.keys(followerData).map((key, index) => (
          <div key={index} className="sc-flex sc-flex-col sc-w-1/3">
            <div className="sc-flex sc-items-center sc-px-5">
              <h4 className="sc-text-gray-400 sc-text-xs sc-hover:font-bold">
                {titleCase(key)}
              </h4>
            </div>
            <div className="sc-flex sc-items-center sc-px-5 ">
              <h4 className="sc-text-gray-400 sc-text-xl sc-hover:font-bold">
                {followerData[key]}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FollowerCount;
