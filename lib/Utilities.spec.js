const assert = require('chai').assert;
const Utilities = require('Utilities');

describe('Utilities', () => {
  it('should convert string to integer', () => {
    assert.deepEqual(
      Utilities.convertSingleParam('2', 'int_key'),
      [2, 'key']
    );
  });

  it('should fail on bad parameters when expecting an integer', () => {
    assert.throws(() => {
      Utilities.convertSingleParam('2.1', 'int_key');
    });
  });

  it('should convert string to float', () => {
    assert.deepEqual(
      Utilities.convertSingleParam('2.1', 'float_key'),
      [2.1, 'key']
    );
  });

  it('should fail on bad parameters when expecting a float', () => {
    assert.throws(() => {
      Utilities.convertSingleParam('not a number', 'float_key');
    });
  });





});
