import test from 'ava';
import generate from '../../../src/client/lifeHelpers';
import Cell from '../../../src/client/classes/Cell';

export function twoPeriodBlinker () {
  const bounds = [
   {bottom: 44, height: 15, left: 72.5, right: 87.5, top: 29, width: 15, x: 72.5, y: 29},
   {bottom: 62, height: 15, left: 72.5, right: 87.5, top: 47, width: 15, x: 72.5, y: 47},
   {bottom: 62, height: 15, left: 72.5, right: 87.5, top: 47, width: 15, x: 72.5, y: 47},
   {bottom: 62, height: 15, left: 56.5, right: 71.5, top: 47, width: 15, x: 56.5, y: 47},
   {bottom: 62, height: 15, left: 88.5, right: 103.5, top: 47, width: 15, x: 88.5, y: 47},
  ];
  const top = new Cell(0, true, bounds[0]);
  const middle = new Cell(1, true, bounds[1]);
  const bottom = new Cell(2, true, bounds[2]);
  const left = new Cell(3, false, bounds[3]);
  const right = new Cell(4, false, bounds[4]);
  const cells = [top, middle, bottom, left, right];
  return {bounds, cells};
}

export function beacon () {
  const topLeftBlockBounds = [
    {bottom: 188, height: 15, left: 168.5, right: 183.5, top: 173, width: 15, x: 168.5, y: 173}, // will blink
    {bottom: 170, height: 15, left: 152.5, right: 167.5, top: 155, width: 15, x: 152.5, y: 155},
    {bottom: 188, height: 15, left: 152.5, right: 167.5, top: 173, width: 15, x: 152.5, y: 173},
    {bottom: 170, height: 15, left: 168.5, right: 183.5, top: 155, width: 15, x: 168.5, y: 155},
  ];
  const bottomRightBlockBounds = [
    {bottom: 206, height: 15, left: 168.5, right: 183.5, top: 191, width: 15, x: 168.5, y: 191}, // will blink
    {bottom: 206, height: 15, left: 184.5, right: 199.5, top: 191, width: 15, x: 184.5, y: 191},
    {bottom: 224, height: 15, left: 168.5, right: 183.5, top: 209, width: 15, x: 168.5, y: 209},
    {bottom: 224, height: 15, left: 184.5, right: 199.5, top: 209, width: 15, x: 184.5, y: 209},
  ];
  const allBounds = topLeftBlockBounds.concat(bottomRightBlockBounds);

  const cells = allBounds.map((bound, index) => new Cell(index, true, bound));
  return {bounds: allBounds, topLeftBlockBounds, bottomRightBlockBounds, cells};
}

export default () => {
  test('should spin a two-period blinker', t => {
    const blinker = twoPeriodBlinker();
    const {bounds, cells} = blinker;
    let nextGeneration = generate(cells);
    t.deepEqual(nextGeneration, [
      new Cell(0, false, bounds[0]), // top
      new Cell(1, true, bounds[1]), // middle
      new Cell(2, false, bounds[2]), // bottom
      new Cell(3, true, bounds[3]), // left
      new Cell(4, true, bounds[4]), // right
    ]);
  });

  test('should blink a beacon', t => {
    const testBeacon = beacon();
    const {cells, bounds, topLeftBlockBounds, bottomRightBlockBounds} = testBeacon;
    const expectation = bounds.map((bound, index) => {
      let alive = true;
      if (bound === topLeftBlockBounds[0] ||
          bound === bottomRightBlockBounds[0]) {
        alive = false;
      }

      return new Cell(index, alive, bound);
    });
    let nextGeneration = generate(cells);
    // blink off
    t.deepEqual(nextGeneration, expectation);
    // blink on, should go back to original
    t.deepEqual(generate(nextGeneration), cells);
  });
};
