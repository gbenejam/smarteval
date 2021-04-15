import React from "react";
import Carousel from "react-bootstrap/Carousel";

const carousel = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/3184163/pexels-photo-3184163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=1000"
            alt="Stage component"
          />
          <Carousel.Caption>
            <h3>This is a test</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default carousel;