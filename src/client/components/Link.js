/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const Link = ({active, children, onClick}) => (
    <button
        disabled={active}
        onClick={onClick}
        style={{
            marginLeft: '4px'
        }}
    >
        {children}
    </button>
);

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;
/* eslint-enable react/button-has-type */
