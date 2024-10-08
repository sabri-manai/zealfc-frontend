// src/components/Carousel/Carousel.js
import React from "react";
import "./Carousel.css";

export const Carousel = React.forwardRef(({ children, className }, ref) => (
  <div className={`carousel-container ${className}`} ref={ref}>
    <div className="carousel-track">
      {children}
    </div>
  </div>
));
