import test from 'ava';
import generate from '../../src/client/lifeHelpers';
import patterns from './patterns';
import neighbors from './neighbors';
import evaluators from './evaluators';

export default () => {
  test('should be a function', t => {
    const type = typeof generate === 'function';
    t.true(type);
  });

  test('should return an array by default', t => {
    let value = Array.isArray(generate());
    t.is(value, true);
  });

  patterns();
  neighbors();
  evaluators();
};
