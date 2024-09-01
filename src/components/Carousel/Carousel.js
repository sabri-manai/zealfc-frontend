import React, { forwardRef } from "react";
import "./Carousel.css";

export const Carousel = forwardRef(({ children }, ref) => {
  return (
    <div className="carousel-container" ref={ref}>
      <div className="carousel-track">
        {children}
      </div>
    </div>
  );
});
