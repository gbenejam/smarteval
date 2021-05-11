import React from "react";
import verge from 'verge';

const CarouselImage = (props) => {

  const mainNavHeight = 56;

  const getCarouselHeight = () => {
    return verge.viewportH() - mainNavHeight;
  }

  const getCarouselWidth = () => {
    return verge.viewportW();
  }

  return (
    <img
      className='d-block w-100 carousel-image'
      src={props.image}
      alt={props.alt}
      width={getCarouselWidth()}
      height={getCarouselHeight()}
      style={{
        objectFit: 'cover',
        objectPosition: 'center center',
        width: getCarouselWidth(),
        height: getCarouselHeight()
      }}
    />
  );
};

export default CarouselImage;