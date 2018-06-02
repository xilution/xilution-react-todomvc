import React from 'react';
import ReactLoading from 'react-loading';

const type = "spinningBubbles";
const color = "#ff0000";
const loaderStyle = {
    margin: '0',
    position: 'fixed',
    left: '50%',
    top: '50%',
    zIndex: '500',
    transform: 'translate(-50%, -50%)'
};

const LoadingIndicator = () => (
    <div style={loaderStyle}>
    <ReactLoading
        type={type}
        color={color}
        height={100}
        width={100}
    />
    </div>
);

export default LoadingIndicator;
