import test from 'ava';
import generate from '../../src/client/lifeHelpers';
import Cell from '../../src/client/classes/Cell';
import stillLifes from './stillLifes';
import oscillators from './oscillators';

export default () => {
  test('should be a function', t => {
    const type = typeof generate === 'function';
    t.true(type);
  });

  test('should return an array by default', t => {
    let value = Array.isArray(generate());
    t.is(value, true);
  });

  stillLifes();
  oscillators();
};
