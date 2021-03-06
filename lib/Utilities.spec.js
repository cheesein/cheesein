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

  it('should expect an object', () => {
    assert.throws(() => {
      Utilities.convertParams('invalid parameter');
    });
  });

  it('should fail at numerous invalid types', () => {
    let invalidTypes = [null, undefined, true, NaN, 2];
    for(let value of invalidTypes) {
      assert.throws(() => {
        Utilities.convertParams(value);
      });
    }
  });
});
