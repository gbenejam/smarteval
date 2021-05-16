import React from 'react';
import verge from 'verge';
import { MAIN_NAV_HEIGHT as mainNavHeight } from '../../components/navigation/navbar/navbarConstants';

/**
 * sizeRelativeToVieport = {
 *    height: (0-100],
 *    width: (0-100]
 * };
 * They indicate the percentage relative to the available viewport that the image should take.
 * If maintainAspectRatio is 'true' then only height is taken into account.
 */ 
function withResponsiveImage(WrappedComponent, sizeRelativeToViewport, maintainAspectRatio = true) {

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.updateSize = this.updateSize.bind(this);
      this.sizeRelativeToViewport = this.calculateImagePercentages();
      this.state = {
        height: 0,
        width: 0,
        aspectRatio: maintainAspectRatio
      };
    }

    calculateImagePercentages() {
      const height = sizeRelativeToViewport && sizeRelativeToViewport.height
        ? sizeRelativeToViewport.height : 100;
      let width = 100;
      if (!maintainAspectRatio) {
        width = sizeRelativeToViewport && sizeRelativeToViewport.width
          ? sizeRelativeToViewport.width : 100;
      }
      return {
        height: height / 100,
        width: width / 100
      }
    }

    getImageHeight = () => {
      const availableHeight = verge.viewportH() - mainNavHeight;
      return availableHeight * this.sizeRelativeToViewport.height;
    }
  
    getImageWidth() {
      return verge.viewportW() * this.sizeRelativeToViewport.width;
    }
  
    updateSize() {
      this.setState({
        height: this.getImageHeight(),
        width: this.getImageWidth()
      })
    }
  
    componentDidMount() {
      this.updateSize();
      window.addEventListener("resize", this.updateSize);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateSize);
    }

    render() {
      return <WrappedComponent imageSize={this.state} {...this.props} />;
    }
  };
}

export default withResponsiveImage;