import React from 'react';

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div className="image-display">
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageDisplay;
