import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.image && props.detail.image.length > 0) {
      let images = [];

      props.detail.image &&
        props.detail.image.map((item) => {
          return images.push({
            original: `http://localhost:3001/image_product/${item}`,
            thumbnail: `http://localhost:3001/image_product/${item}`,
          });
        });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
