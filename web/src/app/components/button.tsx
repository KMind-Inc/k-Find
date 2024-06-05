import React from 'react';

interface ButtonProps {
    onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ onClick }) => {
    const buttonStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4081F8',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 20px',
        color: '#ffffff',
        fontFamily: 'PingFang SC',
        fontSize: '16px',
        borderRadius: '4px',
        width: 'auto',
        height: 'auto',
    };

    const svgStyle: React.CSSProperties = {
        marginRight: '8px',
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
          <svg
            style={svgStyle}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            // stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#ffffff"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          搜索
        </button>
    );
}


