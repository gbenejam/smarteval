import React, { Component } from 'react';
import Carousel from "react-bootstrap/Carousel";

import CarouselImage from '../../components/carousel/carouselImage/carouselImage';
import CarouselCaption from '../../components/carousel/carouselCaption/carouselCaption';
import carouselImg1 from '../../assets/carousel-1.jpg';
import carouselImg2 from '../../assets/carousel-2.jpg';
import withBackdrop from '../../hoc/withBackdrop/withBackdrop';

class Main extends Component {

  render () {
    return (
      <Carousel pause={false} interval={10000} >
        <Carousel.Item>
          <CarouselImage
            image={carouselImg1}
            alt='Girl sitting behind a desk in front of a computer' />
          <CarouselCaption>
            <h3>This is a test 1</h3>
            <p>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
              Nulla vitae elit libero, a pharetra augue mollis interdum.
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </CarouselCaption>
        </Carousel.Item>
        <Carousel.Item>
          <CarouselImage
            image={carouselImg2}
            alt='Girl sitting on a sofa with a laptop' />
          <CarouselCaption>
            <h3>This is a test 2</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </CarouselCaption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default withBackdrop(Main);