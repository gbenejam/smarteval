import React from 'react';

import withResponsiveImage from '../../../hoc/withResponsiveImage/withResponsiveImage';

import classes from './textWithImage.module.css';

const TextWithImage = (props) => {
  const textFragment = (
    <div className={classes.Text}>
      <h2>{props.feature.title}</h2>
      <p>{props.feature.text}</p>
    </div>
  );

  const image = (
    <img className={classes.Image}
      src={props.feature.image.src} 
      alt={props.feature.image.imageAltText}
      height={props.imageSize.height}
      style={{
        objectFit: 'cover',
        objectPosition: 'center center',
        height: props.imageSize.height
      }}
    />
  );

  let textWithImage = textFragment;
  if (props.feature.image.imagePosRight) {
    textWithImage = (
      <div className={classes.TextWithImageContainer} >
        { textFragment }
        { image }
      </div>
    );
  } else {
    textWithImage = (
      <div className={classes.TextWithImageContainer} >
        { image }
        { textFragment }
      </div>
    );
  }

  return (
    <React.Fragment>
      { textWithImage }
    </React.Fragment>
  );
};

export default withResponsiveImage(TextWithImage, { height: 60 });