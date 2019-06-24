import test from 'ava';
import {
  makeSetOfCellsWhichShouldToggle,
  evaluateLivingCells,
  evaluateDeadCells
} from '../../src/client/lifeHelpers/evaluators';
import {block} from './patterns/stillLifes';
import {beacon} from './patterns/oscillators';

test.before(t => {
  t.context.blockCells = block(true).cells;
  t.context.beaconCells = beacon().cells;
});

test('makeSetOfCellsWhichShouldToggle should be a function', t => {
  const type = typeof makeSetOfCellsWhichShouldToggle;
  t.is(type, 'function');
});

test('makeSetOfCellsWhichShouldToggle should throw if no array is passed', t => {
  t.throws(makeSetOfCellsWhichShouldToggle);
});

test('makeSetOfCellsWhichShouldToggle should return a Set', t => {
  const isInstance = makeSetOfCellsWhichShouldToggle([]) instanceof Set;
  t.true(isInstance);
});

test(`makeSetOfCellsWhichShouldToggle include cells\' identities \
which need toggling`, t => {
  const set = makeSetOfCellsWhichShouldToggle([
    {identity: 0, shouldToggle: true},
    {identity: 1, shouldToggle: false},
    {identity: 2, shouldToggle: true},
  ]);
  t.true(set.has(0));
  t.false(set.has(1));
  t.true(set.has(2));
});

test('evaluateLivingCells should be a function', t => {
  const type = typeof evaluateLivingCells;
  t.is(type, 'function');
});

test('evaluateLivingCells should throw if no array is passed', t => {
  t.throws(evaluateLivingCells);
});

test('evaluateLivingCells should return a Set', t => {
  const isInstance = evaluateLivingCells([]) instanceof Set;
  t.true(isInstance);
});

test('evaluateLivingCells should include no cells as need toggling', t => {
  let set = evaluateLivingCells(t.context.blockCells);
  t.context.blockCells.forEach(cell => t.false(set.has(cell.identity)));
});

test('evaluateLivingCells should include two cells as need toggling', t => {
  let set = evaluateLivingCells(t.context.beaconCells);
  t.is(set.size, 2);
  t.true(set.has(0));
  t.true(set.has(4));
});

test('evaluateDeadCells should be a function', t => {
  const type = typeof evaluateDeadCells;
  t.is(type, 'function');
});

test('evaluateDeadCells should throw if no array is passed', t => {
  t.throws(evaluateDeadCells);
});

test('evaluateDeadCells should return a Set', t => {
  const isInstance = evaluateDeadCells([]) instanceof Set;
  t.true(isInstance);
});

test('evaluateDeadCells should include no cells as need toggling', t => {
  let set = evaluateDeadCells(t.context.blockCells);
  t.context.blockCells.forEach(cell => t.false(set.has(cell.identity)));
});

test('evaluateDeadCells should include two cells as need toggling', t => {
  const offBeacon = [...t.context.beaconCells];
  offBeacon[0].living =  false;
  offBeacon[4].living =  false;
  let set = evaluateDeadCells(offBeacon);
  t.is(set.size, 2);
  t.true(set.has(0));
  t.true(set.has(4));
});
