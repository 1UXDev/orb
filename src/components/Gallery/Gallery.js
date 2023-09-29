import React, { useState } from "react";
import styles from "./Gallery.module.css";
import { images } from "../../../public/imageDB";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              index === activeIndex ? styles.active : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={`/0002/${image}`} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className={styles.stage}>
        <img
          src={`/0002/${images[activeIndex]}`}
          alt={`Image ${activeIndex + 1}`}
        />
      </div>
    </div>
  );
};

export default Gallery;
