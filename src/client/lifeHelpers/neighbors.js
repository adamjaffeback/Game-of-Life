export function isNeighborCell (home, potentialNeighbor) {
  if (home.identity === potentialNeighbor.identity) {
    return false;
  } else {
    const hLoc = home.location;
    const nLoc = potentialNeighbor.location;

    return (nLoc.x >= hLoc.x - 16 && nLoc.x <= hLoc.x + 16) &&
           (nLoc.y >= hLoc.y - 18 && nLoc.y <= hLoc.y + 18);
  }
}

export function getNeighbors (home, cells) {
  const CELL_COUNT = cells.length;
  const neighbors = [];

  // break once you find all the neighbors
  for (let i = 0; i < CELL_COUNT && neighbors.length < 8; i++) {
    let potentialNeighbor = cells[i];
    if (isNeighborCell(home, potentialNeighbor)) {
      neighbors.push(potentialNeighbor);
    }
  }

  return neighbors;
};

export default function countLivingNeighbors (home, cells) {
  return getNeighbors(home, cells)
  .reduce((acc, neighbor) => {
    return neighbor.living ? acc + 1 : acc;
  }, 0);
};
