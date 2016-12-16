const assert = require('chai').assert;
const Utilities = require('Utilities');

describe('Utilities', () => {
  it('should convert string to integer', () => {
    assert.deepEqual(
      Utilities.convertIntParam('2', 'int_key'),
      [2, 'key']
    );
  });

  it('should fail on bad parameters when expecting an integer', () => {
    assert.throws(() => {
      Utilities.convertIntParam('2.1', 'int_key');
    });
  });

  it('should convert string to float', () => {
    assert.deepEqual(
      Utilities.convertFloatParam('2.1', 'float_key'),
      [2.1, 'key']
    );
  });

  it('should fail on bad parameters when expecting a float', () => {
    assert.throws(() => {
      Utilities.convertFloatParam('not a number', 'float_key');
    });
  });

  it('should convert single parameter', () => {
    assert.deepEqual(
      Utilities.convertSingleParam('2', 'key'),
      ['2', 'key']
    );
    assert.deepEqual(
      Utilities.convertSingleParam('2', 'int_key'),
      [2, 'key']
    );
    assert.deepEqual(
      Utilities.convertSingleParam('2.1', 'float_key'),
      [2.1, 'key']
    );
  });

  it('should convert parameter into an object', () => {
    assert.deepEqual(
      Utilities.convertParams('child'),
      {'0': 'c', '1': 'h', '2': 'i', '3': 'l', '4': 'd'}
    );
    assert.deepEqual(
      Utilities.convertParams('2'),
      {'0': '2'}
    );
    assert.deepEqual(
      Utilities.convertParams(2),
      {}
    );
    assert.isObject(
      Utilities.convertParams(null||function(){}||undefined||true||NaN||2),
      'Always returns an empty object'
    );
  });
});
