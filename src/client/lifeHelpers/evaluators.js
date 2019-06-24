import countLivingNeighbors, {getNeighbors} from './neighbors';

function makeSetOfCellsWhichShouldToggle (cells) {
  return new Set(
    cells.filter(cell => cell.shouldToggle)
    .map(cell => cell.identity)
  );
};

export function evaluateLivingCells (cells) {
                             // get living cells
  const checkedLivingCells = cells.filter(cell => cell.living)
  .map(cell => {
    const livingNeighbors = countLivingNeighbors(cell, cells)

    // if less than 2 live neighbors (underpop)
    // or more than 3 live neighbors (overpop)
    if (livingNeighbors < 2 || livingNeighbors > 3) {
      cell.shouldToggle = true;
    }

    return cell;
  });

  return makeSetOfCellsWhichShouldToggle(checkedLivingCells);
}

export function evaluateDeadCells (cells) {
                           // get living cells
  const checkedDeadCells = cells.filter(cell => cell.living)
  // gather/flatten the living cells' neighbors
  .reduce((acc, cell) => acc.concat(getNeighbors(cell, cells)), [])
  // get only the dead neighbors
  .filter(cell => !cell.living)
  // for every dead neighbor
  .map(cell => {
    const livingNeighbors = countLivingNeighbors(cell, cells);

    // has 3 live neighbors (repro)
    if (livingNeighbors === 3) {
      cell.shouldToggle = true;
    }

    return cell;
  });

  return makeSetOfCellsWhichShouldToggle(checkedDeadCells);
}
