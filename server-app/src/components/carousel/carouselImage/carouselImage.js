import React from 'react';

import withResponsiveImage from '../../../hoc/withResponsiveImage/withResponsiveImage';

const CarouselImage = (props) => {
  return (<img
    className='d-block w-100 carousel-image'
    src={props.image}
    alt={props.alt}
    width={props.imageSize.width}
    height={props.imageSize.height}
    style={{
      objectFit: 'cover',
      objectPosition: 'center center',
      width: props.imageSize.width,
      height: props.imageSize.height
    }} />
  );
}

export default withResponsiveImage(CarouselImage);