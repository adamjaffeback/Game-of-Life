import React from 'react';
import Board from '../components/Board';
import Cell from '../classes/Cell';

export default function Game() {
  const CELL_SURFACE_AREA = 225;
  const gameSurfaceArea = window.innerHeight * window.innerWidth;
  const numCellsToFill = gameSurfaceArea / CELL_SURFACE_AREA;

  const cells = [];
  for (let i = 0; i < numCellsToFill; i++) {
    cells.push(new Cell());
  }
	return <div>
    <Board cells={new Set(cells)}/>
	</div>;
}
