import React from "react";
import "./ImageCard.css";

const ImageCard = ({ image }) => {
  return (
    <div className="image">
      <div className="imageCard">
        <img src={image.download_url} alt="画像" />
      </div>
      <h3 className="imageCardName">{image.author}</h3>
    </div>
  );
};

export default ImageCard;