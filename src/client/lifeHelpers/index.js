import getNeighbors from './neighbors';

function determineChanges(cells) {
  return cells.map(cell => {
    // for every cell, count alive neighbors
    const livingNeighbors = getNeighbors(cell, cells)
                            .reduce((acc, neighbor) => {
                              return neighbor.living ? acc + 1 : acc;
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

    return cell;
  });
}

export default function generate (cells = []) {
  // evaluate cells to determine who lives, dies, and reproduces,
  return determineChanges(cells)
  // then toggle those cells' living status
  .map(cell => cell.shouldToggle ? cell.toggleLiving() : cell);
}
