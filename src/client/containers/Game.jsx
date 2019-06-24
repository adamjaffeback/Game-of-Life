import React, {useState, useReducer, useEffect} from 'react';
import Board from '../components/Board';
import Cell from '../classes/Cell';
import gameReducer from '../state/reducers/gameReducer';
import * as GameActions from '../state/actions/gameActions';

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

  const handleCellClick = identity => dispatch(GameActions.toggleLiving(identity));
  const dispatchGenerate = () => dispatch(GameActions.generate());
  const startGeneration = () => updateInterval(setInterval(dispatchGenerate, 500));
  const stopGeneration = () => updateInterval(clearInterval(interval));
  // before container unmounts, clear the interval
  useEffect(() => {
    return () => stopGeneration();
  }, []);

	return <div>
    <button onClick={startGeneration} disabled={interval !== undefined}>Start</button>
    <button onClick={dispatchGenerate}>Step</button>
    <button onClick={stopGeneration} disabled={interval === undefined}>Stop</button>
    <Board cells={state} onCellClick={handleCellClick}/>
	</div>;
}
