import getNeighbors from './neighbors';

function determineChanges (cells) {
  const livingCellSet = evaluateLivingCells(cells);
  const deadCellsSet = evaluateDeadCells(cells);

  return cells.map(cell => {
    const identity = cell.identity;

    if (livingCellSet.has(identity) || deadCellsSet.has(identity)) {
      cell.shouldToggle = true;
    }

    return cell;
  });
}

function makeSetOfCellsWhichShouldToggle (cells) {
  return new Set(
    cells.filter(cell => cell.shouldToggle)
    .map(cell => cell.identity)
  );
};

function evaluateLivingCells (cells) {
                             // get living cells
  const checkedLivingCells = cells.filter(cell => cell.living)
  .map(cell => {
                            // get their neighbors
    const livingNeighbors = getNeighbors(cell, cells)
                            // count which of those neighbors are living
                            .reduce((acc, neighbor) => {
                              return neighbor.living ? acc + 1 : acc;
                            }, 0);

    // if less than 2 live neighbors (underpop)
    // or more than 3 live neighbors (overpop)
    if (livingNeighbors < 2 || livingNeighbors > 3) {
      cell.shouldToggle = true;
    }

    return cell;
  });

  return makeSetOfCellsWhichShouldToggle(checkedLivingCells);
}

function evaluateDeadCells (cells) {
                           // get living cells
  const checkedDeadCells = cells.filter(cell => cell.living)
  // gather/flatten the living cells' neighbors
  .reduce((acc, cell) => acc.concat(getNeighbors(cell, cells)), [])
  // get only the dead neighbors
  .filter(cell => !cell.living)
  // for every dead neighbor
  .map(cell => {
    const livingNeighbors = getNeighbors(cell, cells)
                            .reduce((acc, neighbor) => {
                              return neighbor.living ? acc + 1 : acc;
                            }, 0);

    // has 3 live neighbors (repro)
    if (livingNeighbors === 3) {
      cell.shouldToggle = true;
    }

    return cell;
  });

  return makeSetOfCellsWhichShouldToggle(checkedDeadCells);
}

export default function generate (cells = []) {
  // evaluate cells to determine who lives, dies, and reproduces,
  return determineChanges(cells)
  // then toggle those cells' living status
  .map(cell => cell.shouldToggle ? cell.toggleLiving() : cell);
}
