import { useState, useEffect } from "react";
import "./Gallery.scss";

// Images
import image1 from "../../../../../assets/gallery/jellyfish.jpg";
import image2 from "../../../../../assets/gallery/shark.jpg";
import image3 from "../../../../../assets/gallery/turtle.jpg";

const images = [image1, image2, image3];

const GalleryWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="widget gallery">
      <div className="gallery">
        <img src={images[currentIndex]} alt={`Gallery Slide ${currentIndex}`} />
      </div>
    </div>
  );
};

export default GalleryWidget;
