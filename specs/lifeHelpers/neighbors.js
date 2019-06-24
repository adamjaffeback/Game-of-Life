import test from 'ava';
import {getNeighbors, isNeighborCell} from '../../src/client/lifeHelpers/neighbors';
import {block} from './patterns/stillLifes';

export default () => {
  test('isNeighborCell should return false if potentialNeighbor is home cell', t => {
    const cells = block(true).cells;
    let isNeighbor = isNeighborCell(cells[0], cells[0]);
    t.false(isNeighbor);
  });

  test('isNeighborCell should return false if potentialNeighbor is not a neighbor', t => {
    const cells = block(true).cells;
    let isNeighbor = isNeighborCell(cells[0], cells[4]);
    t.false(isNeighbor);
  });

  test('isNeighborCell should return true if potentialNeighbor is a neighbor', t => {
    const cells = block(true).cells;
    let isNeighbor = isNeighborCell(cells[0], cells[1]);
    t.true(isNeighbor);
  });

  test('getNeighbors should get neighbors', t => {
    const cells = block(true).cells;
    let neighbors = getNeighbors(cells[0], cells);
    t.deepEqual(neighbors, [cells[1], cells[2], cells[3]]);
  });
};
