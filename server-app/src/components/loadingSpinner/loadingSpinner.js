import React from "react";

import classes from './loadingSpinner.module.css';

const LoadingSpinner = (props) => {
  return (
    <div style={props.style} className={classes.lds_ellipsis}>
      <div style={props.nestedDivsStyle}></div>
      <div style={props.nestedDivsStyle}></div>
      <div style={props.nestedDivsStyle}></div>
      <div style={props.nestedDivsStyle}></div>
    </div>
  );
};

export default LoadingSpinner;