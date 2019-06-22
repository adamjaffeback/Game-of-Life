import getNeighbors from './neighbors';

function determineChanges(cells) {
  return cells.map(cell => {
    // for every cell, count alive neighbors
    const livingNeighbors = getNeighbors(cell, cells)
                            .reduce((neighbor, acc) => {
                              neighbor.living ? acc++ : acc;
                              return acc;
                            }, 0);

    // if cell is alive
    if (cell.living) {
      // if less than 2 live neighbors (underpop) or more than 3 live neighbors (overpop)
      if (livingNeighbors < 2 || livingNeighbors > 3) {
        cell.shouldToggle = true;
      }
    // else cell is dead and has 3 live neighbors (repro)
    } else if (!cell.living) {
      if (livingNeighbors === 3) {
        cell.shouldToggle = true;
      }
    }
  });
}

export default function generate (cells = []) {
  // evaluate dial to determine who lives, dies, and reproduces
  return determineChanges(cells);
  // TODO: make those changes
}
