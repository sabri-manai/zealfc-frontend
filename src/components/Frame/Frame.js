import React, { useRef, useEffect, useCallback } from "react";
import { Carousel } from "../Carousel/Carousel";
import { GameCard } from "../GameCard/GameCard";
import "./Frame.css";

// Import the images
import TuriaImage from "../../assets/images/turia.png";
import CarmenImage from "../../assets/images/carmen.png";
import BeteroImage from "../../assets/images/betero.png";

export const Frame = () => {
    const carouselRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    const startAutoScroll = useCallback(() => {
        stopAutoScroll(); // Stop any existing interval
        scrollIntervalRef.current = setInterval(() => {
            scrollRight();
        }, 3000); // Scroll every 3 seconds
    }, []);

    const stopAutoScroll = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            // Ensure the first card is fully visible by scrolling to the start
            carousel.scrollLeft = 0;

            // Start automatic scrolling
            startAutoScroll();
        }

        // Cleanup on component unmount
        return () => {
            stopAutoScroll();
        };
    }, [startAutoScroll]);

    const scrollRight = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            const cardWidth = carousel.offsetWidth / 5;
            const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;

            // Scroll right
            if (carousel.scrollLeft + carousel.offsetWidth < carousel.scrollWidth - cardWidth) {
                carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
            } else {
                // Scroll to show the last card fully
                carousel.scrollTo({ left: maxScrollLeft, behavior: "smooth" });

                // Pause before resetting to the start
                setTimeout(() => {
                    carousel.scrollTo({ left: 0, behavior: "smooth" });
                }, 1500); // Adjust delay as needed to fully display the last card
            }
        }
    };

    const scrollLeft = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            const cardWidth = carousel.offsetWidth / 5;
            carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
    };

    return (
        <div
            className="frame"
            onMouseEnter={stopAutoScroll} // Stop auto-scroll on hover
            onMouseLeave={startAutoScroll} // Resume auto-scroll when not hovering
        >
            <div className="carousel-header">
                <button className="carousel-nav left" onClick={scrollLeft}>{"<"}</button>
                <h2 className="carousel-title">UPCOMING GAMES</h2>
                <button className="carousel-nav right" onClick={scrollRight}>{">"}</button>
            </div>
            <Carousel ref={carouselRef}>
                {/* Your GameCard components go here */}
                <GameCard 
                    imageSrc={TuriaImage}
                    gameName="TURIA 1"
                    gameSubtitle="CHAMPIONS"
                    gameDay="Tuesday, 19:30"
                />
                <GameCard 
                    imageSrc={CarmenImage}
                    gameName="CARMEN 2"
                    gameSubtitle="BEGINNERS"
                    gameDay="Tuesday, 17:30"
                />
                <GameCard 
                    imageSrc={BeteroImage}
                    gameName="BETERO 3"
                    gameSubtitle="RISING"
                    gameDay="Wednesday, 11:30"
                />
                <GameCard 
                    imageSrc={TuriaImage}
                    gameName="TURIA 4"
                    gameSubtitle="CHAMPIONS"
                    gameDay="Tuesday, 19:30"
                />
                <GameCard 
                    imageSrc={CarmenImage}
                    gameName="CARMEN 5"
                    gameSubtitle="BEGINNERS"
                    gameDay="Tuesday, 17:30"
                />
                <GameCard 
                    imageSrc={TuriaImage}
                    gameName="TURIA 6"
                    gameSubtitle="CHAMPIONS"
                    gameDay="Tuesday, 19:30"
                />
                <GameCard 
                    imageSrc={CarmenImage}
                    gameName="CARMEN 7"
                    gameSubtitle="BEGINNERS"
                    gameDay="Tuesday, 17:30"
                />
                <GameCard 
                    imageSrc={TuriaImage}
                    gameName="TURIA 8"
                    gameSubtitle="CHAMPIONS"
                    gameDay="Tuesday, 19:30"
                />
                <GameCard 
                    imageSrc={CarmenImage}
                    gameName="CARMEN 9"
                    gameSubtitle="BEGINNERS"
                    gameDay="Tuesday, 17:30"
                />
            </Carousel>
        </div>
    );
};
