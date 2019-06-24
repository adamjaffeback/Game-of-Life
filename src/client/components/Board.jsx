import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

export default function Board ({cells, onCellClick}) {
  const cellComponents = cells.map(cell =>
    <Cell
      key={cell.identity}
      identity={cell.identity}
      isLiving={cell.living}
      onRender={cell.setLocation.bind(cell)}
      handleCellClick={onCellClick.bind(null, cell.identity)} />
  );

  return (
    <div style={{backgroundColor: 'DimGrey'}}>
      {cellComponents}
    </div>
  );
}

Board.propTypes = {
  cells: PropTypes.array.isRequired,
  onCellClick: PropTypes.func.isRequired,
};

Board.defaultProps = {
  cells: [],
};
