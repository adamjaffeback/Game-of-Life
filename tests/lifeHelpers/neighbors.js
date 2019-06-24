import test from 'ava';
import countLivingNeighbors, {getNeighbors, isNeighborCell} from '../../src/client/lifeHelpers/neighbors';
import {block} from './patterns/stillLifes';
import {twoPeriodBlinker} from './patterns/oscillators';

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

test('countLivingNeighbors should throw if no array is passed', t => {
  t.throws(countLivingNeighbors);
});

test('countLivingNeighbors should return a number (0)', t => {
  const count = countLivingNeighbors({}, []);
  t.is(typeof count, 'number');
  t.is(count, 0);
});

test('countLivingNeighbors should find 3 living neighbors for a block', t => {
  const cells = block(false).cells;
  const count = countLivingNeighbors(cells[0], cells);
  t.is(count, 3);
});

test('countLivingNeighbors should find 2 living neighbors for an oscillator', t => {
  const cells = twoPeriodBlinker().cells;
  const count = countLivingNeighbors(cells[1], cells);
  t.is(count, 2);
});
