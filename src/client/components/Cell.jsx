import React from 'react';
import PropTypes from 'prop-types';

export default function Cell({handleClick}) {
  const style = {
    height: '15px',
    width: '15px',
    fontSize: '.5px',
    backgroundColor: 'gray',
    margin: '-4px .5px',
    display: 'inline-block',
  };

	return <div onClick={handleClick} style={style} />;
}

Cell.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
