const Song = ({ track, large, hover, hideSidebar }) => {
  return (
    <>
      <div
        className={
          "sc-flex sc-mr-2 sc-bg-white sc-p-2" +
          (hover ? " sc-hover:bg-gray-200 sc-hover:font-bold" : "")
        }
      >
        {/* Image on left */}
        {!hideSidebar && (
          <div className="sc-w-1/4 sc-h-max">
            <img
              src={track.image}
              alt={track.title}
              onClick={() => {
                track.link && window.open(track.link);
              }}
              className={
                "sc-h-[10em] sc-rounded sc-w-full sc-object-cover" +
                (track.link ? " sc-cursor-pointer" : "") +
                (!large ? " sc-h-[5em]" : "")
              }
            />
          </div>
        )}

        {/* Song info on right */}
        <div
          className={`${hideSidebar ? "sc-w-full" : "sc-w-3/4"} ${
            large ? "sc-flex sc-flex-col sc-justify-center" : ""
          }`}
          style={
            hideSidebar
              ? {
                  backgroundImage: `url(${track.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "0.5rem",
                }
              : {}
          }
          
        >
          <div className="sc-flex sc-flex-col sc-w-100"
          
          >
            {/* Title */}
            <div
              className={
                "sc-flex sc-items-start sc-flex-col sc-py-3 sc-w-100" +
                (large && " sc-px-5")
              }
              style={
                hideSidebar
                  ? {
                      backdropFilter: "blur(10px)",
                      margin: '0.5rem 0.5rem',
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      borderRadius: "0.5rem",
                    }
                  : {}
              }
            >
              <div className="sc-flex sc-flex-row sc-mb-4"

              >
                <div className="sc-mr-4">
                  {track.song && (
                    <div className="sc-flex sc-items-center sc-justify-center sc-h-8 sc-w-8 sc-rounded-full sc-bg-orange-500 sc-text-white">
                      <p className={"sc-text-xs"}>{track.title[0]}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h5 className={`sc-text-gray-400 sc-text-sm ${hideSidebar ? 'sc-text-gray-800' : ''}`}>
                    {track.artist ? track.artist : "James Hinton"}
                  </h5>
                  <h4
                    className={
                      "sc-text-gray-800" +
                      (large ? " sc-text-xl" : " sc-text-sm")
                    }
                  >
                    {track.title}
                  </h4>
                </div>
              </div>

              {/* song */}
              {track.song && (
                <audio className="sc-w-full" controls>
                  <source src={track.song} type="audio/mpeg" />
                </audio>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Song;
