import { useState } from "react";
import Song from "./Song";
const Likes = () => {
  const [tracks, setTracks] = useState([
    {
      artist: "Jimi Hendrix",
      title: "Voodoo Child",
      image: "./soundcloud/hendrix.jfif",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
			artist: "Gregory Alan Isakov",
      title: "Astronaut",
      image: "./soundcloud/gregory.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
		{
			artist: "Bee Gees",
			title: "Stayin' Alive",
			image: "./soundcloud/bee.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		},
		{
			artist: "Ben Howard",
			title: "Promise",
			image: "./soundcloud/ben.png",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		},
		{
			artist: "Arctic Monkeys",
			title: "I Wanna Be Yours",
			image: "./soundcloud/arctic.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		},
		{
			artist: "Tame Impala",
			title: "Less I Know The Better",
			image: "./soundcloud/tame.png",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		},
		{
			artist: "Disclosure",
			title: "Help Me Lose My Mind",
			image: "./soundcloud/disclosure.png",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		},
		

  ]);

  return (
    <>
      <div className="sc-flex sc-flex-col sc-items-start sc-ml-5 sc-mt-6">
        {/* Title */}
        <div className="sc-flex sc-flex-col ">
          <div className="sc-flex sc-justify-center">
            <div className="sc-text-gray-400 sc-text-sm sc-flex sc-items-center">
              <img src="./soundcloud/heart.svg" alt="heart" className="sc-w-4 sc-h-4 sc-mr-2" />
              {tracks.length} Likes</div>
          </div>
        </div>

        {/* Tracks */}
        <div className="sc-flex sc-flex-col sc-w-full">
          {tracks.map((track, index) => (
            <div key={'song-'+index} className="sc-my-4 sc-h-[4em]">
              <Song  track={track} hover />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Likes;
