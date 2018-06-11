import React from 'react';
import ReactLoading from 'react-loading';

const loaderStyle = {
    left: '50%',
    margin: '0',
    position: 'fixed',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '500'
};

const LoadingIndicator = () => (
    <div style={loaderStyle}>
        <ReactLoading
            type={'spinningBubbles'}
            color={'#ff0000'}
            height={100}
            width={100}
        />
    </div>
);

export default LoadingIndicator;
