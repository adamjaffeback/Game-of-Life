import React from 'react';
import PropTypes from 'prop-types';

export default function Cell({handleCellClick, location}) {
  const style = {
    height: '15px',
    width: '15px',
    fontSize: '.5px',
    backgroundColor: 'gray',
    margin: '-4px .5px',
    display: 'inline-block',
  };

	return <div onClick={handleCellClick.bind(this, location)} style={style} />;
}

Cell.propTypes = {
  handleCellClick: PropTypes.func.isRequired,
};
