import React from 'react';

import classes from './text.module.css';

const Text = (props) => {
  return (
    <div className={classes.TextContainer} >
      <h2>{props.feature.title}</h2>
      <p>{props.feature.text}</p>
    </div>
  );
};

export default Text;