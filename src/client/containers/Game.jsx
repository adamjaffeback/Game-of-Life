import React, {useState, useReducer} from 'react';
import Board from '../components/Board';
import Cell from '../classes/Cell';
import gameReducer from '../state/reducers/gameReducer';

export default function Game() {
  const CELL_SURFACE_AREA = 225;
  const gameSurfaceArea = window.innerHeight * window.innerWidth;
  const numCellsToFill = gameSurfaceArea / CELL_SURFACE_AREA;

  const initialCells = [];
  for (let i = 0; i < numCellsToFill; i++) {
    initialCells.push(new Cell(i));
  }

  const [state, dispatch] = useReducer(gameReducer, initialCells);
  const [interval, updateInterval] = useState();

  const handleCellClick = identity => dispatch({type: 'TOOGLE_LIVING', identity});
  const dispatchGenerate = () => dispatch({type: 'GENERATE'});
  const startGeneration = () => updateInterval(setInterval(dispatchGenerate, 1000));
  const stopGeneration = () => updateInterval(clearInterval(interval));

	return <div>
    <button onClick={startGeneration}>Start</button>
    <button onClick={dispatchGenerate}>Step</button>
    <button onClick={stopGeneration}>Stop</button>
    <Board cells={state} onCellClick={handleCellClick}/>
	</div>;
}
