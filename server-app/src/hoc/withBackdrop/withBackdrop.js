import React from 'react';

import classes from './withBackdrop.module.css';

function withBackdrop(Component) {
  return (props) => {
    return (
      <div className={classes.Container} >
        <div className={classes.Backdrop} />
        <Component {...props} />
      </div>
    );
  }
}

export default withBackdrop;