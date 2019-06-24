import test from 'ava'
import gameReducer from '../../../src/client/state/reducers/gameReducer';
import * as GameActions from '../../../src/client/state/actions/gameActions';
import Cell from '../../../src/client/classes/Cell';

test.before(t => {
   t.context.cells = [new Cell(0, false), new Cell(1, false)];
});

test('gameReducer should exist', t => {
  t.false(gameReducer === undefined);
});

test('gameReducer should be a function', t => {
  t.is(typeof gameReducer, 'function');
});

test('gameReducer should throw if action isn\'t supported', t => {
  t.throws(gameReducer.bind(null, {type: 'BLAH'}));
});

test('gameReducer should toggle the living status of a single cell', t => {
  let value = gameReducer(t.context.cells, GameActions.toggleLiving(0));
  t.deepEqual(value, [
    new Cell(0, true),
    new Cell(1, false),
  ]);
});

test.todo(`write a test for gameReducer.GENERATE functionality. Ava doesn\'t \
naturally support stubbing: https://github.com/avajs/ava/issues/1825`);
