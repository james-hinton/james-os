import { useState } from "react";

const Profile = () => {
  const [background, setBackground] = useState(
    "./soundcloud/profile-background-desert.jpg"
  );

  return (
    <div className="sc-w-[100%] sc-bg-sc-gray sc-flex sc-justify-center sc-relative">
      {/* Background */}
      <img className="sc-h-80 sc-w-[100%] sc-object-cover" src={background}></img>

      {/* Profile image over background */}
      <div className="sc-absolute sc-top-10 sc-left-20 sc-h-max sc-text-white sc-flex">
        {/* Profile image */}

        <img
          className="sc-h-60 sc-object-contain sc-rounded-full sc-mr-8"
          src="./soundcloud/user.jfif"
        />

        {/* Profile name */}
        <div className="sc-flex sc-flex-col sc-justify-center">
          <h1 className="sc-text-2xl">
            <span className="sc-text-gray-300">
              <h3 className="sc-bg-gray-900 sc-w-max sc-p-2 sc-mb-2  sc-font-bold">
                James Hinton
              </h3>
              <h6 className="sc-bg-gray-900 sc-w-max sc-p-1 sc-text-sm sc-mb-2">
                <a target="_blank" className="hover:sc-font-bold hover:sc-text-cyan-800 sc-text-gray-300
                " href="https://soundcloud.com/james-hinton-7">james-hinton-7</a>
              </h6>
              <h6 className="sc-bg-gray-900 sc-w-max sc-p-1 sc-text-sm">
                Hampshire, England
              </h6>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
