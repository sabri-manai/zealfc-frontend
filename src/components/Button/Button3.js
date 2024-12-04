import React from 'react';
import './Button3.css';

function Button({
    variant = 'large',
    primaryText,
    secondaryText,
    onClick,
    styleType = 'default',
    disabled = false,
    onMouseEnter,
    onMouseLeave,
}) {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    const getSvgByVariant = (variant) => {
        switch (variant) {
            case 'medium':
                return (
                    <svg
                        className="button-polygon"
                        width="316"
                        height="66"
                        viewBox="0 0 316 66"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.41052 13.2377L18.3374 1.11809L297.907 1.11811L314.834 13.2377V52.422L297.907 64.5415L18.3373 64.5416L1.41052 52.4219V13.2377Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                );
            case 'small':
                return (
                    <svg
                        className="button-polygon"
                        width="283"
                        height="93"
                        viewBox="0 0 200 46"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.64062 9.71568L13.0408 1.55315L187.205 1.55317L198.605 9.7157V36.2768L187.205 44.4393L13.0408 44.4393L1.64062 36.2768V9.71568Z"
                            stroke="currentColor"
                            strokeWidth="2" /* Reduced stroke width */
                        />
                    </svg>
                );                
            case 'large':
            default:
                return (
                    <svg
                        className="button-polygon"
                        width="326"
                        height="94"
                        viewBox="0 0 326 94"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.22607 16.9188L23.1435 1.78824L302.732 1.78827L324.65 16.9188V77.0812L302.732 92.2116L23.1435 92.2117L1.22607 77.0812V16.9188Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                );
        }
    };

    return (
        <div
            className={`button-container ${variant} ${styleType} ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-disabled={disabled}
        >
            <div className="svg-container">{getSvgByVariant(variant)}</div>
            <div className="button-text">
                <span className="primary-text">{primaryText}</span>
                {secondaryText && (
                    <span className="secondary-text">{secondaryText}</span>
                )}
            </div>
        </div>
    );
}

export default Button;
