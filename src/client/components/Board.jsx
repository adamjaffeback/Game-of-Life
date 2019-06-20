import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

class Board extends React.Component {
  render() {
    const elements = [];
    this.props.cells.forEach(cell => {
      elements.push(<Cell key={cell.location} {...cell} />);
    });

    return (
      <div style={{backgroundColor: 'DimGrey'}}>
        {elements}
      </div>
    );
  }
}

Board.propTypes = {
  cells: PropTypes.any.isRequired,
};

Board.defaultProps = {
  cells: new Set(),
}

export default Board;
