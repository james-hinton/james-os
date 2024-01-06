import { useEffect, useState } from "react";

const Navbar = ({ appRef }) => {
  const [hideNavButtons, setHideNavButtons] = useState(false);

  useEffect(() => {
    const appWidth = appRef?.current?.offsetWidth;
    if (appWidth < 1000) {
      setHideNavButtons(true);
    } else {
      setHideNavButtons(false);
    }
  }, [appRef?.current?.offsetWidth]);

  return (
    <div className="sc-bg-sc-gray sc-flex sc-justify-center sc-min-w-[1200px]">
      <div className="sc-w-[100%] sc-max-w-[1200px] sc-w-[1200px] sc-flex sc-bg-sc-gray sc-h-11 sc-text-sm sc-w-90 md:w-100">
        {/* Logo */}
        <div className="sc-logo sc-ml-10">
          <img className="sc-h-full" src="./soundcloud/logo.jpg" />
        </div>

        {/* Left Navigation Buttons */}
        {!hideNavButtons &&
          ["Home", "Stream", "Library"].map((item, index) => (
            <div
              key={index}
              className="sc-border-r-2 sc-border-r-black sc-px-10 sc-py-3 "
            >
              <h4 className="sc-text-gray-300 sc-cursor-pointer hover:sc-text-gray-100">
                {item}
              </h4>
            </div>
          ))}

        <div>
          {/* Search box */}
          <div className=" sc-flex sc-p-2 sc-w-100 ">
            <div className="sc-relative sc-w-[100%] ">
              <input
                className="h-7 sc-bg-gray-200 w-[100%] focus:outline-none focus:sc-shadow-outline sc-border sc-border-black-300 sc-rounded-lg sc-py-2 sc-px-4 sc-block"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>

          {/* Right Navigation Buttons */}
          {[
            { text: "Try Pro", hideOnMobile: true },
            { text: "Upload", hideOnMobile: true },
            { image: "./soundcloud/user.jpg", dropdown: true, rounded: true },
            { image: "./soundcloud/bell.svg" },
            { image: "./soundcloud/mailbox.svg" },
            { image: "./soundcloud/more.svg" },
          ].map((item, index) => {
            if (item.hideOnMobile && hideNavButtons) {
              return null;
            }

            return (
              <div
                key={index}
                className={
                  "sc-px-4 sc-py-3 sc-flex sc-items-center sc-min-w-max hover:sc-bg-gray-600 "
                }
              >
                {item.image ? (
                  <img
                    className={
                      "sc-w-5 sc-max-h-4 sc-object-contain" +
                      (item.rounded === true &&
                        " sc-rounded-full sc-object-cover")
                    }
                    src={item.image}
                  />
                ) : (
                  <h4 className="sc-text-gray-300">{item.text}</h4>
                )}
                {item.dropdown ? (
                  <div className="sc-absolute sc-right-0 sc-mt-2"></div>
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
