import countLivingNeighbors, {getNeighbors} from './neighbors';
import {evaluateLivingCells, evaluateDeadCells} from './evaluators';

function determineChanges (cells) {
  // Sets contain identities of cells which need updating
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

export default function generate (cells = []) {
  // evaluate cells to determine who lives, dies, and reproduces
  return determineChanges(cells)
  // then toggle those cells' living status
  .map(cell => cell.shouldToggle ? cell.toggleLiving() : cell);
}
