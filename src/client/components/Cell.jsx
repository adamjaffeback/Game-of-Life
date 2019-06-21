import React, {useState} from 'react';
import PropTypes from 'prop-types';

export default function Cell({handleCellClick}) {
  const [living, toggleLiving] = useState(false);
  const style = {
    height: '15px',
    width: '15px',
    fontSize: '.5px',
    backgroundColor: living ? 'yellow' : 'gray',
    margin: '-4px .5px',
    display: 'inline-block',
  };

  const handleClick = ev => {
    toggleLiving(!living);
    handleCellClick(ev);
  };

	return <div onClick={handleClick} style={style} />;
}

Cell.propTypes = {
  handleCellClick: PropTypes.func.isRequired,
};
