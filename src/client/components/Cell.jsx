import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Cell ({identity, isLiving, onRender, handleCellClick}) {
  const cellRef = useRef(identity);
  const style = {
    height: '15px',
    width: '15px',
    fontSize: '.5px',
    backgroundColor: isLiving ? 'yellow' : 'gray',
    margin: '-4px .5px',
    display: 'inline-block',
  };

  // on render, update the cell's location
  useEffect(() => onRender(cellRef.current.getBoundingClientRect()));

	return <div ref={cellRef} onClick={handleCellClick} style={style} />;
}

Cell.propTypes = {
  identity: PropTypes.number.isRequired,
  isLiving: PropTypes.bool.isRequired,
  onRender: PropTypes.func.isRequired,
  handleCellClick: PropTypes.func.isRequired,
};

function areEqual(prevProps, nextProps) {
  return prevProps.isLiving === nextProps.isLiving;
}

// only rerender when needed, using .memo
export default React.memo(Cell, areEqual);
