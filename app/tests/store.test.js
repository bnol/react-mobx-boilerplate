/**
 * Test store addons
 */

import expect from 'expect';
import configureStore from '../stores'; // eslint-disable-line

describe('configureStore', () => {
  let stores;

  beforeAll(() => {
    stores = configureStore();
  });

  describe('stores', () => {
    it('stores should be an object', () => {
      expect(typeof stores).toEqual('object');
    });
  });
});
