import React from 'react';
import './Button.css';

function Button({ text, onClick, styleType = 'default', disabled = false, onMouseEnter, onMouseLeave }) {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    return (
        <div
            className={`button-container ${styleType} ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-disabled={disabled} // Accessibility support
        >
            <div className="svg-container">
                <svg
                    className="button-polygon"
                    width="100%"
                    height="100%"
                    viewBox="0 0 309 245"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17.578 103.297L34.5048 91.1772L274.075 91.1772L291.001 103.297L291.001 142.481L274.075 154.601L34.5048 154.601L17.578 142.481L17.578 103.297Z"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                </svg>
            </div>
            <span className="button-text">{text}</span>
        </div>
    );
}

export default Button;
