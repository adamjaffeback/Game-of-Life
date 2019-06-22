import React, {useReducer} from 'react';
import Board from '../components/Board';
import Cell from '../classes/Cell';

export default function Game() {
  const CELL_SURFACE_AREA = 225;
  const gameSurfaceArea = window.innerHeight * window.innerWidth;
  const numCellsToFill = gameSurfaceArea / CELL_SURFACE_AREA;

  const initialCells = [];
  for (let i = 0; i < numCellsToFill; i++) {
    initialCells.push(new Cell(i));
  }

  function reducer(state = [], action) {
    switch (action.type) {
      case 'TOOGLE_LIVING':
        return state.map(cell => {
          if (cell.identity === action.identity) {
            const newCell = new Cell(cell.identity, cell.living);
            newCell.click();
            return newCell;
          }

          return cell;
        });
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialCells);

  const handleCellClick = identity => {
    const message = {
      type: 'TOOGLE_LIVING',
      identity,
    };

    dispatch(message);
  };

	return <div>
    <Board cells={state} onCellClick={handleCellClick}/>
	</div>;
}
