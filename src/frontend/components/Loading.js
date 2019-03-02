import React from 'react';
import ReactLoading from 'react-loading';

const loaderStyle = {
  left: '50%',
  margin: '0',
  position: 'fixed',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '500',
};

const overlayStyle = {
  background: 'black',
  height: '100%',
  left: '50%',
  opacity: 0.3,
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  zIndex: '400',
};

const LoadingIndicator = () => (
  <div>
    <div style={overlayStyle} />
    <div style={loaderStyle}>
      <ReactLoading
        color="#6297ff"
        height={100}
        type="spinningBubbles"
        width={100}
      />
    </div>
  </div>
);

export default LoadingIndicator;
