import React, { Component } from 'react';

import Text from '../../components/features/text/text';
import TextWithImage from '../../components/features/textWithImage/textWithImage';

import classes from './features.module.css';
import getData from './featuresData';


class Features extends Component {
  
  constructor(props) {
    super(props);
    this.state = { features: [] };
    this.initFeatures();
  }

  initFeatures () {
    getData().filter(obj => obj && obj.title && obj.text)
      .forEach(feature => this.state.features.push(feature));
  }

  render () {
    const featuresJSX = this.state.features.map((feature, index) => {
      if (feature.image) {
        return <TextWithImage 
          key={index}
          feature={feature} />;
      } else {
        return <Text 
          key={index}
          feature={feature} />;
      }
    });

    return (
      <div className={classes.Features} >
        <h1>Features</h1>
        { featuresJSX }
      </div>
    );
  }
}

export default Features;