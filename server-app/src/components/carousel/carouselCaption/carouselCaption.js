import React from "react";

import classes from './carouselCaption.module.css';

const CarouselCaption = (props) => {
  return (
    <div className={classes.CarouselCaptionContainer} >
      <div className={classes.CarouselCaptionWrapper}>
        {props.children}
      </div>
    </div>
  );
};

export default CarouselCaption;