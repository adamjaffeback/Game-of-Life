import test from 'ava';
import generate from '../../src/client/lifeHelpers';
import Cell from '../../src/client/classes/Cell';

export default () => {
  let cells = [];

  test.afterEach(t => {
    cells = [];
  });

  test('should keep a block alive', t => {
    const bounds = [
      {bottom: 26, height: 15, left: 8.5, right: 23.5, top: 11, width: 15, x: 8.5, y: 11},
      {bottom: 26, height: 15, left: 24.5, right: 39.5, top: 11, width: 15, x: 24.5, y: 11},
      {bottom: 44, height: 15, left: 8.5, right: 23.5, top: 29, width: 15, x: 8.5, y: 29},
      {bottom: 44, height: 15, left: 24.5, right: 39.5, top: 29, width: 15, x: 24.5, y: 29},
    ];
    // upper-left
    const UL = new Cell(0, true, bounds[0]);
    const UR = new Cell(2, true, bounds[1]);
    const LL = new Cell(3, true, bounds[2]);
    const LR = new Cell(4, true, bounds[3]);
    cells = [UL, UR, LL, LR];
    let nextGeneration = generate(cells);
    t.deepEqual(nextGeneration, cells);
  });

  test('should keep a block alive with spaces', t => {
    const bounds = [
      {bottom: 26, height: 15, left: 8.5, right: 23.5, top: 11, width: 15, x: 8.5, y: 11},
      {bottom: 26, height: 15, left: 24.5, right: 39.5, top: 11, width: 15, x: 24.5, y: 11},
      {bottom: 44, height: 15, left: 8.5, right: 23.5, top: 29, width: 15, x: 8.5, y: 29},
      {bottom: 44, height: 15, left: 24.5, right: 39.5, top: 29, width: 15, x: 24.5, y: 29},
      // spaces
      {bottom: 62, height: 15, left: 24.5, right: 39.5, top: 47, width: 15, x: 24.5, y: 47},
      {bottom: 44, height: 15, left: 40.5, right: 55.5, top: 29, width: 15, x: 40.5, y: 29},
    ];
    // upper-left
    const UL = new Cell(0, true, bounds[0]);
    const UR = new Cell(1, true, bounds[1]);
    const LL = new Cell(2, true, bounds[2]);
    const LR = new Cell(3, true, bounds[3]);
    const spaceOne = new Cell(4, false, bounds[4]);
    const spaceTwo = new Cell(5, false, bounds[5]);
    cells = [UL, spaceTwo, UR, LL, LR, spaceOne];
    let nextGeneration = generate(cells);
    t.deepEqual(nextGeneration, cells);
  });

  test('should keep a beehive alive', t => {
    const bounds = [
     {bottom: 80, height: 15, left: 136.5, right: 151.5, top: 65, width: 15, x: 136.5, y: 65},
     {bottom: 80, height: 15, left: 152.5, right: 167.5, top: 65, width: 15, x: 152.5, y: 65},
     {bottom: 98, height: 15, left: 120.5, right: 135.5, top: 83, width: 15, x: 120.5, y: 83},
     {bottom: 98, height: 15, left: 168.5, right: 183.5, top: 83, width: 15, x: 168.5, y: 83},
     {bottom: 116, height: 15, left: 136.5, right: 151.5, top: 101, width: 15, x: 136.5, y: 101},
     {bottom: 116, height: 15, left: 152.5, right: 167.5, top: 101, width: 15, x: 152.5, y: 101},
    ];
    cells = [
      new Cell(0, true, bounds[0]),
      new Cell(1, true, bounds[1]),
      new Cell(2, true, bounds[2]),
      new Cell(3, true, bounds[3]),
      new Cell(3, true, bounds[4]),
      new Cell(3, true, bounds[5]),
    ];
    let nextGeneration = generate(cells);
    t.deepEqual(nextGeneration, cells);
  });
};
