import test from 'ava'
import {toggleLiving, generate} from '../../../src/client/state/actions/gameActions';

export function toggleLivingSpecs () {
  test('toggleLiving should exist', t => {
    t.false(toggleLiving === undefined);
  });

  test('toggleLiving should be a function', t => {
    t.is(typeof toggleLiving, 'function');
  });

  test('toggleLiving should return an object', t => {
    t.is(typeof toggleLiving(), 'object');
  });

  test('toggleLiving should set the action type to TOGGLE_LIVING', t => {
    t.is(toggleLiving().type, 'TOGGLE_LIVING');
  });

  test('toggleLiving should set the identity on the action to 0', t => {
    t.is(toggleLiving(0).identity, 0);
  });
}

export function generateSpecs () {
  test('generate should exist', t => {
    t.false(generate === undefined);
  });

  test('generate should be a function', t => {
    t.is(typeof generate, 'function');
  });

  test('generate should return an object', t => {
    t.is(typeof generate(), 'object');
  });

  test('generate should set the action type to GENERATE', t => {
    t.is(generate().type, 'GENERATE');
  });
}


export default () => {
  toggleLivingSpecs();
  generateSpecs();
};
