import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

export default function Board({cells}) {
    const doCellClick = (location) => {
      console.log('clicked location', location);
    };
    const elements = [];
    cells.forEach(cell => {
      elements.push(
        <Cell
          key={cell.location}
          handleCellClick={doCellClick}
          location={cell.location} />
      );
    });

    return (
      <div style={{backgroundColor: 'DimGrey'}}>
        {elements}
      </div>
    );
}

Board.propTypes = {
  cells: PropTypes.any.isRequired,
};

Board.defaultProps = {
  cells: new Set(),
};
