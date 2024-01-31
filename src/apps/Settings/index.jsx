import { useContext, useState } from "react";
import "./Settings.scss";
import { PhoneContext } from "../../context/PhoneContext";

const Settings = () => {

  const [availableBackgrounds, setAvailableBackgrounds] = useState(['background.jpg', '2.png', '3.png', '4.png', '5.png', '6.png']);

  const { background, setBackground } = useContext(PhoneContext);

  const handleSelectWallpaper = (wallpaper) => {
    console.log("Setting background to", wallpaper);
    setBackground(wallpaper);
  };

  return (
    <div className="settings">
      <div className="wallpaper-grid">
        {availableBackgrounds.map((wallpaper, index) => (
          <img
            key={index}
            src={`/assets/wallpapers/${wallpaper}`}
            alt={`Wallpaper ${index + 1}`}
            className={`wallpaper ${
              background === wallpaper ? "selected" : ""
            }`}
            onClick={() => handleSelectWallpaper(wallpaper)}
          />
        ))}
      </div>
    </div>
  );
};

export default Settings;
