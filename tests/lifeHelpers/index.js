import test from 'ava';
import generate from '../../src/client/lifeHelpers';

test('generate should be a function', t => {
  const type = typeof generate === 'function';
  t.true(type);
});

test('generate should return an array by default', t => {
  let value = Array.isArray(generate());
  t.is(value, true);
});
